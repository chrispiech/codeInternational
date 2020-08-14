import unittest

from translation_utils import CaseType, split_cased_tokens

class TestSplitCasedTokens(unittest.TestCase):

    def test_upper(self):
        self.assertEqual(split_cased_tokens("FOO"), (CaseType.UPPER_SNAKE, ["FOO"]))
        self.assertEqual(split_cased_tokens("FOO_BAR"), (CaseType.UPPER_SNAKE, ["FOO", "BAR"]))

    def test_lower(self):
        self.assertEqual(split_cased_tokens("bar"), (CaseType.LOWER_SNAKE, ["bar"]))
        self.assertEqual(split_cased_tokens("foo_bar"), (CaseType.LOWER_SNAKE, ["foo", "bar"]))

    def test_upper_camel_case(self):
        # One token
        result_tokens = ["Doe"]
        self.assertEqual(split_cased_tokens("Doe"), (CaseType.UPPER_CAMEL, result_tokens))

        # Multiple Tokens
        result_tokens.append("Deer")
        self.assertEqual(split_cased_tokens("DoeDeer"), (CaseType.UPPER_CAMEL, result_tokens))

        # Ending on a capital letter
        result_tokens.append("A")
        self.assertEqual(split_cased_tokens("DoeDeerA"), (CaseType.UPPER_CAMEL, result_tokens))

        # Two capital letters in a row
        result_tokens.append("Female")
        self.assertEqual(split_cased_tokens("DoeDeerAFemale"), (CaseType.UPPER_CAMEL, result_tokens))

    def test_lower_camel_case(self):
        result_tokens = ["foo", "Bar"]
        self.assertEqual(split_cased_tokens("fooBar"), (CaseType.LOWER_CAMEL, result_tokens))

if __name__ == '__main__':
    unittest.main()
