import argparse
from io import BytesIO
import keyword
from javalang_fork import tokenizer
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
        translation_utils.translate_program(filename, args.language, {
            'tokenize':tokenize_java
        })
        print(" done.\n")

def tokenize_java(code):
    raw_tokens = tokenizer.tokenize(code)
    tokens = []
    for token in raw_tokens:
        token_type = token.__class__.__name__
        token_text = token.value
        tokens.append({
            'type':token_type,
            'text':token_text
        })
    return tokens


if __name__ == "__main__":
    main()