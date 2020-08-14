import argparse
import os
import re
from lxml import etree, html
import bs4
import sys
from translate_python import translate_code
import translation_utils
from translator import translate_with_forced

UNICODE_SPACE = u"\xa0"
SPACE_SENTINEL = '&nbsp;'
NBSP = u"\u00A0"

def is_code_node(node):
    if node.name == 'code': return True
    if node.name == 'pre': return True
    return False

def translate_node(node, target_language, is_code = False, depth=0):
    """
    Recursively translates the text within an HTML tag.
    """

    # base cases: some tags shouldn't be translated
    if node.name == 'script': return
    if node.name == 'style': return
    if node.name == 'link': return 
    if node.name == 'meta':return
    if isinstance(node, bs4.Comment):
        return


    # if you are a code node, all your descendents should be treated as code
    if is_code_node(node):
        is_code = True

    # If we hit a leaf node, translate the text
    if isinstance(node, bs4.element.NavigableString):
        # Make sure leading spaces are preserved during translation by marking where they were
        if node.string.isspace():
            return
        if node.string.startswith('Embedded'):
            return

        if is_code:
            try:
                # print('code:', node.string)
                oldCode = node.string
                translated_text = translate_code(oldCode, target_language)
                node.string.replace_with(translated_text)
            except:
                print("Unexpected error:", sys.exc_info()[0])
                # raise
        else:
            # print('not code:', node.string)
            oldCode = node.string
            translated_text = translate_with_forced(oldCode, target_language)
            translated_text = translated_text.replace(NBSP, " ")
            node.string.replace_with(translated_text)
        return
    # Otherwise, we assume this is a tag and translate the child tags' text
    # TODO make sure there will always be children
    for child in node.children:
        translate_node(child, target_language, is_code, depth+1)
    # except:
    #     print('failed to translate in ' + str(node))


def translate_html(text, target_language):
    """
    Translates text from an HTML document, including code snippets embedded
    in that file, from English to another language.

    :param text str: some or all of the text from an HTML file
    :param target_language str: ISO 639-1 code for the natural language to which text should be translated
    :returns: text translated into target_language
    """
    soup = bs4.BeautifulSoup(text, "html.parser")
    translate_node(soup, target_language, depth = 0)
    translated = str(soup)

    # unfortunetly it looks like beautiful soup str() removes some spaces we 
    # would like to keep
    return fix_minor_whitespace(translated)

def fix_minor_whitespace(html):
    html = html.replace('<b>', ' <b>')
    html = html.replace('</b>', '</b> ')
    html = html.replace('<code', ' <code')
    html = html.replace('</code>', '</code> ')
    html = html.replace('<a href', ' <a href')
    html = html.replace('</a>', '</a> ')
    titleHook = '"glyphicon glyphicon-home"></span>'
    html = html.replace(titleHook, titleHook + ' ')
    html = html.replace('"/>', '"/> ')
    return html

def translate_file(filename, target_language):
    """
    Translates the text in an HTML file, including code snippets embedded
    in that file, from English to another language.

    :param filename str: the local path to an HTML file
    :param target_language str: ISO 639-1 code for the natural language to which text should be translated
    """
    path_segments = filename.split("/")
    page_name = path_segments[-1]
    # Currently assumes path is to a file in a folder for English versions
    output_dir = "/".join(
        [segment if segment != "en" else target_language for segment in path_segments[:-1]]
    )
    if not os.path.isdir(output_dir):
        os.makedirs(output_dir)

    with open(filename, "r") as file:
        translated_file = translate_html(file, target_language)
        with open(os.path.join(output_dir, page_name), "w") as outfile:
            outfile.write(translated_file)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "language", help="Two-letter (ISO 639-1) code for the target language"
    )
    parser.add_argument(
        "files",
        help="File(s) to be translated (use globbing to translate whole directories)",
        nargs="+",
    )
    args = parser.parse_args()
    for filename in args.files:
        print("Translating {}...".format(filename))
        translate_file(filename, args.language)
        print(" done.\n")


if __name__ == "__main__":
    main()
