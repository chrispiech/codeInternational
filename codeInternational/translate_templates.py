import argparse
import os
import re

from translate_html import translate_html


def translate_template(filename, target_language):
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
        page_text = file.read()

        # Temporarily remove embedded code lines and code blocks in Bottle templates
        embedded_code_regex = re.compile(r"^\s*(?:%.*$|<%(?:.|\n)*?%>\s*$)", re.MULTILINE)
        embedded_code_blocks = []
        def embedded_code_replace(match):
            """
            Replaces an embedded code block with a placeholder while the
            surrounding template is being translated.
            The code block is stored in the captured embedded_code_blocks list
            at an index indicated in the placeholder.

            :param match _sre.SRE_Match: regex match for an embedded code block
            :returns: no-translate tag with the text: "Embedded code $n", where
                      $n is the code block's index in the caller's list
            """
            replacement = '<span translate="no">Embedded code {}</span>'.format(len(embedded_code_blocks))
            embedded_code_blocks.append(match.group(0))
            return replacement
        page_text = embedded_code_regex.sub(embedded_code_replace, page_text)
        
        # Translate page with temporarily removed embedded code
        translated_file = translate_html(page_text, target_language)
        
        # Re-introduce embedded code for later compilation of templates
        placeholder_regex = re.compile(r'<span translate="no">Embedded code (\d+)</span>')
        translated_file = placeholder_regex.sub(lambda match: "\n{}\n".format(embedded_code_blocks[int(match.group(1))]), translated_file)

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
        translate_template(filename, args.language)
        print(" done.\n")


if __name__ == "__main__":
    main()