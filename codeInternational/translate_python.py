import argparse
from io import BytesIO
import tokenize
import keyword
import translation_utils


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
        translation_utils.translate_program(filename, args.language, PYTHON_FNS)
        print(" done.\n")

def translate_code(code, target_lang):
    return translation_utils.translate_code(code, target_lang, PYTHON_FNS)


def tokenize_python(code):
    """
    Tokenize python code (as a string) into a sequence of tokens. Each token
    is a dictionary with two items (text and type). Type is only meaningful
    if it is one of Comment, String or Identifier
    """
    codeReader = BytesIO(code.encode('utf-8')).readline
    raw_tokens = tokenize.tokenize(codeReader)
    tokens = []
    last = None
    for token in raw_tokens:
        type_num = token.type
        if type_num == 62: continue
        if last:
            # the python tokenizer doesn't always include whitespace
            # so when we detect whitespace is missing, we put it back in
            # uses the "last" token and checks for space between the end
            # and the start of the current token
            same_line = last.end[0] == token.start[0]
            same_pos = last.end[1] == token.start[1]
            is_start_of_line = token.start[1] == 0
            if not same_line and not is_start_of_line:
                whitespace = token.line[:token.start[1]]
                add_space(tokens, whitespace)
            elif same_line and not same_pos:
                whitespace = token.line[last.end[1]:token.start[1]]
                add_space(tokens, whitespace)
        tokens.append({
            'text':token.string,
            'type':get_token_type(token)
        })
        last = token
    return tokens

def add_space(tokens, whitespace):
    tokens.append({
        'text':whitespace,
        'type':'Space'
    })

def get_token_type(token):
    toknum = token.type
    if toknum == tokenize.COMMENT:
        return 'Comment'

    if keyword.iskeyword(token.string) or token.string in dir(__builtins__):
        return 'Keyword'

    if toknum == tokenize.NAME:
        return 'Identifier'

    return str(toknum)

PYTHON_FNS = {
    'tokenize':tokenize_python
}


if __name__ == "__main__":
    main()