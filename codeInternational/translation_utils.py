import os
import pickle
import re
import json
import translator
from enum import Enum
from constants import *

CaseType = Enum("CaseType", "UPPER_SNAKE LOWER_SNAKE UPPER_CAMEL LOWER_CAMEL")


def split_cased_tokens(identifier):
    if identifier.islower():
        return (CaseType.LOWER_SNAKE, identifier.split("_"))
    elif identifier.isupper():
        return (CaseType.UPPER_SNAKE, identifier.split("_"))
    tokens = []
    token_start = 0
    for i, letter in enumerate(identifier[1:], start=1):
        if letter.isupper():
            tokens.append(identifier[token_start:i])
            token_start = i
    tokens.append(identifier[token_start:])
    case_type = (
        CaseType.LOWER_CAMEL if identifier[0].islower() else CaseType.UPPER_CAMEL
    )
    return (case_type, tokens)

def get_api_json_filename(target_language):
    filename = target_language + '.json'
    return os.path.join(API_ROOT, filename)

def get_json_filename(target_language):
    translation_dir = os.path.dirname(__file__)
    known_translations = os.path.join(translation_dir, "forced_translations")
    filename = target_language + '.json'
    return os.path.join(known_translations, filename)

def get_pickle_filename(target_language):
    # directory is empty if the function is called by this module or
    # an absolute path if called by another module (works correctly either way)
    translation_dir = os.path.dirname(__file__)
    pickle_dir = os.path.join(translation_dir, "known_translations")
    if not os.path.exists(pickle_dir):
        os.makedirs(pickle_dir)
    filename = "{}.pkl".format(target_language)
    return os.path.join(pickle_dir, filename)

def get_api_translations(target_language):
    json_path = get_api_json_filename(target_language)
    if os.path.exists(json_path):
        return json.load(open(json_path))
    else:
        return {}

def get_known_translations(target_language, is_pickle = False):
    if is_pickle:
        return get_known_translations_pkl(target_language)
    return get_known_translations_json(target_language)

    raise Exception('missing known translations. TODO: add default')

def get_known_translations_pkl(target_language):
    pickle_filename = get_pickle_filename(target_language)
    if os.path.exists(pickle_filename):
        with open(pickle_filename, "rb") as pickle_file:
            return pickle.load(pickle_file)

    return {}

def get_known_translations_json(target_language):
    translation_dir = os.path.dirname(__file__)
    known_dir = os.path.join(translation_dir, "known_translations")
    if not os.path.exists(known_dir):
        os.makedirs(known_dir)
    filename = "{}.json".format(target_language)
    json_filename = os.path.join(known_dir, filename)

    if os.path.exists(json_filename):
        with open(json_filename, "r") as json_file:
            return json.load(json_file)

    return {}


def add_known_translation(target_language, english_identifier, translated_identifier):
    current_translations = get_known_translations(target_language)
    # print(current_translations)
    current_translations[english_identifier] = translated_identifier

    translation_dir = os.path.dirname(__file__)
    known_dir = os.path.join(translation_dir, "known_translations")
    filename = "{}.json".format(target_language)
    json_filename = os.path.join(known_dir, filename)
    print(json_filename)
    with open(json_filename, "w+") as file:
        json.dump(current_translations, file)


def make_known_translations(target_language, text):
    known_translations = get_known_translations(target_language)
    if len(known_translations) == 0:
        return text
    # For each match, look up the corresponding value in the dictionary (approach from Python Cookbook)
    identifier_regex = re.compile(
        "({}){}".format("|".join(known_translations.keys()), r"(\W|$)")
    )
    return identifier_regex.sub(
        lambda match: "{}{}".format(
            known_translations[match.group(1)], match.group(2)
        ),
        text,
    )

def reformat_tokens(tokens):
    return ''.join([token['text'] for token in tokens])

def collect_identifiers(tokens):
    ids = set([])
    for token in tokens:
        text = token['text']
        if token['type'] == 'Identifier':
            ids.add(text)
    return ids

def translate_comment(id_map, comment, target_language):
    

    # First replace all identifiers with their common translation
    comment = make_known_translations(target_language, comment)

    # Preserve /*, /**, or // if present
    comment_starter_match = re.search(r"^((?:/\*+|//) *)(\n?)", comment)
    comment_starter = "" if comment_starter_match is None else comment_starter_match.group(1)
    text_start = len(comment_starter) # The starter should be the first characters of the comment
    newline_after_starter = comment_starter_match is not None and len(comment_starter_match.group(2)) > 0
    
    # Preserve */ if present. Also capture preceding whitespace because Google Translate will
    # discard the text segment's trailing whitespace
    comment_ender_match = re.search(r"(\s*\*/)$", comment)
    comment_ender = "" if comment_ender_match is None else comment_ender_match.group(1)
    text_end = len(comment) - len(comment_ender)

    text = comment[text_start:text_end].rstrip() # rstrip is optional; translate discards anyway

    if text.find("\n") == -1: # One-liners stay one-liners, even if the line ends up being longer than we'd like
        translated_text = translator.translate_with_forced(text, target_language)
        return "{}{}{}".format(comment_starter, translated_text, comment_ender)

    # Otherwise, convert a multi-line comment to a one-liner and then re-split it
    sample_text_line = re.search(r"\n(\s+)(\*?)", text)
    comment_indentation = sample_text_line.group(1)
    leading_asterisk_if_present = sample_text_line.group(2)
    text = re.sub(r"\n\s+\*?", "", text) # Converts the whole comment to one line

    # Remove dashes before translating because sometimes the dashes cause translation to fail
    pre_and_post_dash_text = re.split(r" -----+", text)

    pre_and_post_dash_text = [translator.translate_with_forced(token, target_language) for token in pre_and_post_dash_text]
    text_lines = []
    if newline_after_starter:
        text_lines.append("")
        # Make sure first line gets the newline and possibly asterisk line separator during the
        # join call below if and only if it is not on the same line as the comment starter
    

    # If the filename is being separated from the comment body, put the filename on the first line
    # of the final comment body, insert an appropriately sized line of dashes as the next line,
    # and split the rest of the body across lines as needed
    if len(pre_and_post_dash_text) > 1:
        file_intro = pre_and_post_dash_text[0]
        text_lines.append(' ' + file_intro.strip())
        new_dashes = " {}".format("-" * (len(file_intro) - 1)) # One char was a leading space
        text_lines.append(new_dashes)
        translated_text = pre_and_post_dash_text[1]
    else:
        translated_text = pre_and_post_dash_text[0]


    ''' 
    WARNING: for some languages like chinese there are no
    spaces between words and the characters are twice as large
    '''
    maxLineLength = get_comment_max_line_length(target_language)
    token_start = 0
    while token_start < len(translated_text):
        token_end = token_start + maxLineLength
        if token_end >= len(translated_text):
            token_end = len(translated_text)
        elif not translated_text[token_end].isspace():
            phrase = translated_text[token_start:token_end]
            phrase_end = phrase.rfind(" ")
            if phrase_end == -1:
                token_end = len(translated_text)
            else:
                token_end + token_start + phrase_end

        next_line = translated_text[token_start:token_end]
        text_lines.append(' ' + next_line.strip())
        # input('wait: ')
        token_start = token_end # Note that this means tokens will start with spaces if there was a leading asterisk
    
    # Note that the first token is the comment starter, so every text line will have the newline separator inserted
    comment_body = "\n{}{}".format(comment_indentation, leading_asterisk_if_present).join(text_lines)
    formatted = "{}{}{}".format(comment_starter, comment_body, comment_ender)

    # Now, replace any untranslated IDs in the comment text
    for identifier in id_map:
        translated = id_map[identifier]
        formatted = formatted.replace(identifier, translated)
    return formatted

def get_comment_max_line_length(target_language):
    """
    Some scripts (like chinese) use characters which take up two spaces, so they
    have a different length per comment line
    """
    if target_language in MAX_LINE_LENGTH_MAP:
        return MAX_LINE_LENGTH_MAP[target_language]
    return MAX_LINE_DEFAULT

def translate_identifier(identifier, target_language):
    api_translations = get_api_translations(target_language)
    if identifier in api_translations:
        return api_translations[identifier]
    # if identifier in known_translations:
    #     return known_translations[identifier]

    # dont translate 1 char ids like "i"
    if len(identifier) <= 1: return identifier

    case_type, tokens = split_cased_tokens(identifier)
    is_multitoken = len(tokens) > 1

    phrase = " ".join(tokens).lower()

    translated_identifier_tokens = translator.translate_with_forced(phrase, target_language)
    split_translation = translated_identifier_tokens.split(" ")

    # sometimes you want to force it... we will help you do that eventually :-)
    # split_sanitized = sanitize_translation_tokens(split_translation)
    split_sanitized = split_translation

    if case_type == CaseType.UPPER_SNAKE:
        translated_identifier = "_".join(map(str.upper, split_sanitized))
    elif case_type == CaseType.LOWER_SNAKE:
        translated_identifier = "_".join(map(str.lower, split_sanitized))
    elif case_type == CaseType.UPPER_CAMEL:
        translated_identifier = "".join(map(str.title, split_sanitized))
    elif case_type == CaseType.LOWER_CAMEL:
        upper_camel = "".join(map(str.title, split_sanitized))
        translated_identifier = upper_camel[0].lower() + upper_camel[1:]
    else:
        print("Error determining identifier {}'s case type".format(identifier))
        # TODO make this error case more robust

    # Only store translations for tokens that vanilla text translation will not be able to handle
    if identifier != translated_identifier and is_multitoken:
        add_known_translation(target_language, identifier, translated_identifier)

    return translated_identifier

def translate_token(id_map, token, target_lang, codelang_fns):
    # id_map stores pre-translation of identifiers
    old_text = token['text']
    new_text = old_text # default to copying the old text

    if token['type'] == 'String':
        new_text = translator.translate_with_forced(old_text, target_lang)
    elif token['type'] == 'Comment':
        new_text = translate_comment(id_map, old_text, target_lang)
    elif token['type'] == 'Identifier':
        new_text = id_map[old_text]
    token['text'] = new_text
    return token



def translate_program(filename, target_language, codelang_fns):
    """Translates the code in a file from English to another language.
    Excludes identifiers that need to be in English for the code's syntactic correctness.

    Keyword arguments:
    filename -- the local path to a Java source file
    target_language -- the natural language to which text should be translated
    translate_code_fn -- a function which can translate a string in the relevant programing language
    """
    path_segments = filename.split("/")
    page_name = path_segments[-1]
    # Currently assumes path is to a file in a folder for English versions
    output_dir = "/".join(
        [
            segment if segment != "en" else target_language
            for segment in path_segments[:-1]
        ]
    )
    if not os.path.isdir(output_dir):
        os.makedirs(output_dir)

    with open(filename, "r") as file:
        translated_file = translate_code(file.read(), target_language, codelang_fns)
        with open(os.path.join(output_dir, page_name), "w") as outfile:
            outfile.write(translated_file)


def translate_code(code, target_lang, codelang_fns):
    '''
    Translate code needs to do two passes. In the first pass we are going to translate
    all identifiers. Then in the second pass we can translate the remaining strings and
    comments.
    '''
    if not SILENT: print(code)
    tokenize_fn = codelang_fns['tokenize']
    tokens = tokenize_fn(code)

    # first pass, translate identifiers
    identifiers = collect_identifiers(tokens)
    id_map = {}
    for id_name in identifiers:
        new_name = translate_identifier(id_name, target_lang)
        id_map[id_name] = new_name

    # second pass, translate the rest of the code
    translated_tokens = []
    tokens = tokenize_fn(code)
    for token in tokens:
        translated = translate_token(id_map, token, target_lang, codelang_fns)
        translated_tokens.append(translated)
    # input('pause')

    # reformat all the tokens
    to_return = reformat_tokens(translated_tokens)
    if not SILENT: 
        print('\n====\n')
        print(to_return)
    return to_return