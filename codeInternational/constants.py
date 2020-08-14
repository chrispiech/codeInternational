import os

SILENT = False

SPACE_SENTINEL = '&nbsp;'

CURR_PATH = os.path.dirname(os.path.realpath(__file__))
CACHE_ROOT = CURR_PATH + '/cache'
FORCED_ROOT = 'forcedTranslations'
API_ROOT = 'api/python'

SALT = 1234567

# default is 50
MAX_LINE_DEFAULT = 50
MAX_LINE_LENGTH_MAP = {
    'zh':25,
    'ja':25,
}

# token types
IDENTIFIER = 'Identifier'
COMMENT = 'Comment'
STRING = 'String'