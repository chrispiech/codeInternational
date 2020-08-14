/*
 * File: TokenScanner.js
 * ---------------------
 * This class implements a simple token scanner.
 */

/*
 * Class: TokenScanner
 * -------------------
 * This class is used to divide a string into individual logical units
 * called <i>tokens</i>.  By default, the <code>TokenScanner</code>
 * recognizes two kinds of tokens, as follows:
 *
 * 1. Strings of consecutive letters and digits representing words
 * 2. One-character strings representing punctuation or separators
 *
 * The use of the <code>TokenScanner</code> class is illustrated by
 * the following pattern, which reads the tokens in the string variable
 * <code>input</code>:
 *
 *<pre>
 *     var scanner = new TokenScanner();
 *     scanner.setInput(input);
 *     while (scanner.hasMoreTokens()) {
 *        var token = scanner.nextToken();
 *        . . . process the token . . .
 *     }
 *</pre>
 *
 * The <code>TokenScanner</code> class exports several additional methods
 * that give clients more control over its behavior.  Those methods are
 * described individually in the documentation.
 */

function TokenScanner(str) {
   this.ignoreWhitespaceFlag = false;
   this.ignoreCommentsFlag = false;
   this.scanNumbersFlag = false;
   this.scanStringsFlag = false;
   this.commentStructure = 'c';
   this.savedCharacters = [ ];
   this.savedTokens = [ ];
   this.operators = { };
   this.wordChars = "";
   this.setInput(str || "");
}

/*
 * Method: setInput
 * Usage: scanner.setInput(str);
 * -----------------------------
 * Sets the token stream for this scanner to the specified string.
 * Any previous token stream is discarded.
 */

TokenScanner.prototype.setInput = function(str) {
   this.buffer = str;
   this.length = str.length;
   this.cp = 0;
   this.lineNumber = 0;
   this.savedCharacters = [ ];
   this.savedTokens = [ ];
   this.lineNumberMap = this.makeLineNumberMap(str)
   this.lineIndentMap = this.makeLineIndentMap(str)
   console.log('line number')
   console.log(this.lineNumberMap)
   console.log('indent level')
   console.log(this.lineIndentMap)
};

TokenScanner.prototype.setCommentStructure = function(str) {
   if(str != 'c' && str != 'python') {
      console.error('unsupported comment structure ', str)
   }
   this.commentStructure = str;
}

/*
 * Method: hasMoreTokens
 * Usage: if (scanner.hasMoreTokens()) . . .
 * ------------------------------------------
 * Returns <code>true</code> if there are additional tokens for this
 * scanner to read.
 */

TokenScanner.prototype.hasMoreTokens = function() {
   var token = this.nextToken();
   this.saveToken(token);
   return token.text != "";
};

TokenScanner.prototype.nextTokenIndentLevel = function() {
   if(!this.hasMoreTokens()) {
      throw new Error("no more tokens")
   }
   var token = this.nextToken()
   this.saveToken(token)
   let lineNumber = token.lineNumber;
   return this.lineIndentMap[lineNumber];
}

/*
 * Method: nextToken
 * Usage: token = scanner.nextToken();
 * -----------------------------------
 * Returns the next token from this scanner.  If <code>nextToken</code>
 * is called when no tokens are available, it returns a token with empty string.
 */

TokenScanner.prototype.nextToken = function() {

   if (this.savedTokens.length != 0) {
      return this.savedTokens.pop();
   }
   while (true) {
      if (this.ignoreWhitespaceFlag) this.skipSpaces();
      var ch = this.getChar();
      if (ch == "") return this.makeToken("");

      // special case for c type comments
      if(this.commentStructure == 'c') {
         if (ch == '/' && this.ignoreCommentsFlag) {
            ch = this.getChar();
            if (ch == '/') {
               while (true) {
                  ch = this.getChar();
                  if (ch == '\n' || ch == '\r' || ch == "") break;
               }
               continue;
            } else if (ch == '*') {
               var prev = "";
               while (true) {
                  ch = this.getChar();
                  if (ch == "" || (prev == '*' && ch == '/')) break;
                  prev = ch;
               }
               continue;
            }
            this.saveChar(ch);
            ch = '/';
         }
      }

      // special case for python comments
      if(this.commentStructure == 'python') {
         if (ch == '#' && this.ignoreCommentsFlag) {
            console.log('found a python comment')
            while (true) {
               ch = this.getChar();
               console.log(ch)
               if (ch == '\n' || ch == '\r' || ch == "") break;
            }
            continue;
         }
         // NOTE: so far I haven't specifically supported 
         // multi-line comments. 
      }

      // strings
      if ((ch == '"' || ch == '\'') && this.scanStringsFlag) {
         this.saveChar(ch);
         return this.makeToken(this.scanString());
      }
      if (isdigit(ch) && this.scanNumbersFlag) {
         this.saveChar(ch);
         return this.makeToken(this.scanNumber());
      }
      if (this.isWordCharacter(ch)) {
         this.saveChar(ch);
         return this.makeToken(this.scanWord());
      }
      var op = ch;
      while (this.isOperatorPrefix(op)) {
         ch = this.getChar();
         if (ch == "") break;
         op += ch;
      }
      while (op.length > 1 && !this.isOperator(op)) {
         this.saveChar(op[op.length - 1]);
         op = op.substring(0, op.length - 1);
      }
      return this.makeToken(op);
   }
};

TokenScanner.prototype.makeToken = function(text) {
   return {
      text:text,
      lineNumber:this.lineNumberMap[this.cp]
   }
}

/*
 * Method: saveToken
 * Usage: scanner.saveToken(token);
 * --------------------------------
 * Adds the specified token to this scanner's input stream so that
 * when <code>nextToken</code> is called, the scanner will return the
 * saved token without reading any additional characters from the
 * token stream.
 */

TokenScanner.prototype.saveToken = function(token) {
   this.savedTokens.push(token);
};

/*
 * Method: verifyToken
 * Usage: scanner.verifyToken(expected);
 * -------------------------------------
 * Reads the next token and makes sure it matches the string
 * <code>expected</code>.  If it does not, <code>verifyToken</code>
 * throws an error.
 */

TokenScanner.prototype.verifyToken = function(expected) {
   var token = this.nextToken();
   if (token.text != expected) {
      var found = token.text
      var msg = "Found \"" + token.text + "\" when expecting \"" + expected + "\".";
      msg += "\nLine: " + token.lineNumber
      throw new Error(msg);
   }
};

// note that no more tokens counts as a newline
TokenScanner.prototype.verifyNewline = function() {
   while(true) {
      var ch = this.getChar();
      if(ch == "") {
         return;
      }
      if (!isspace(ch)) {
         if (this.iscomment(ch)) {
            return;
         } else {
            let lineNumber = this.lineNumberMap[this.cp]
            var msg = "Was expecting a new line and found \""+ch+"\"";
            msg += '\nLine ' + lineNumber;
            throw new Error(msg);
         }
      }
      if(ch == '\n') {
         return;
      }
   };
}

TokenScanner.prototype.iscomment = function(ch) {
   if(this.commentStructure != 'python') {
      throw new Error("verify newline is not implemented outside python")
   }
   return ch == '#'
}

/*
 * Method: setIgnoreWhitespaceFlag
 * Usage: scanner.setIgnoreWhitespaceFlag(flag);
 * ---------------------------------------------
 * Controls whether this scanner ignores whitespace characters or treats
 * them as valid tokens.  By default, the <code>nextToken</code> method
 * treats whitespace characters (typically spaces and tabs) just like
 * any other punctuation mark and returns them as single-character tokens.
 * Calling
 *
 *<pre>
 *    scanner.setIgnoreWhitespaceFlag(true);
 *</pre>
 *
 * changes this behavior so that the scanner ignore whitespace characters.
 * Clients can restore the original behavior by calling
 *
 *<pre>
 *    scanner.setIgnoreWhitespaceFlag(false);
 *</pre>
 */

TokenScanner.prototype.setIgnoreWhitespaceFlag = function(flag) {
   this.ignoreWhitespaceFlag = flag;
};

/*
 * Method: setIgnoreCommentsFlag
 * Usage: scanner.setIgnoreCommentsFlag(flag);
 * -------------------------------------------
 * Controls whether this scanner ignores comments that use either the
 * slash-star or slash-slash format from the C-based family of languages.
 * Calling
 *
 *<pre>
 *    scanner.setIgnoreCommentsFlag(true);
 *</pre>
 *
 * sets the parser to ignore comments.  Clients can restore the
 * original behavior by calling
 *
 *<pre>
 *    scanner.setIgnoreCommentsFlag(false);
 *</pre>
 */

TokenScanner.prototype.setIgnoreCommentsFlag = function(flag) {
   this.ignoreCommentsFlag = flag;
};

/*
 * Method: setScanNumbersFlag
 * Usage: scanner.setScanNumbersFlag(flag);
 * ----------------------------------------
 * Controls how the scanner treats tokens that begin with a digit.  By
 * default, the <code>nextToken</code> method treats numbers and letters
 * identically and therefore does not provide any special processing for
 * numbers.  Calling
 *
 *<pre>
 *    scanner.setScanNumbersFlag(true);
 *</pre>
 *
 * changes this behavior so that <code>nextToken</code> returns the
 * longest substring that can be interpreted as a real number.  Clients
 * can restore the default behavior by calling
 *
 *<pre>
 *    scanner.setScanNumbersFlag(false);
 *</pre>
 */

TokenScanner.prototype.setScanNumbersFlag = function(flag) {
   this.scanNumbersFlag = flag;
};

/*
 * Method: setScanStringsFlag
 * Usage: scanner.setScanStringsFlag(flag);
 * ----------------------------------------
 * Controls how the scanner treats tokens enclosed in quotation marks.  By
 * default, quotation marks (either single or double) are treated just like
 * any other punctuation character.  Calling
 *
 *<pre>
 *    scanner.setScanStringsFlag(true);
 *</pre>
 *
 * changes this assumption so that <code>nextToken</code> returns a single
 * token consisting of all characters through the matching quotation mark.
 * The quotation marks are returned as part of the scanned token so that
 * clients can differentiate strings from other token types.  Clients
 * can restore the default behavior by calling
 *
 *<pre>
 *    scanner.setScanStringsFlag(false);
 *</pre>
 */

TokenScanner.prototype.setScanStringsFlag = function(flag) {
   this.scanStringsFlag = flag;
};

/*
 * Method: addWordCharacters
 * Usage: scanner.addWordCharacters(str);
 * --------------------------------------
 * Adds the characters in <code>str</code> to the set of characters
 * that are acceptable in an identifier.  For example, calling
 * <code>addWordCharacters("_")</code> adds the underscore
 * to the set of characters that are legal in an identifier.
 */

TokenScanner.prototype.addWordCharacters = function(str) {
   this.wordChars += str;
};

/*
 * Method: defineOperator
 * Usage: scanner.defineOperator(op);
 * ----------------------------------
 * Defines a new multicharacter operator.  Whenever you call
 * <code>nextToken</code> when the input stream contains operator
 * characters, the scanner returns the longest possible operator
 * string that can be read at that point.
 */

TokenScanner.prototype.defineOperator = function(op) {
   this.operators[op] = true;
};

/*
 * Method: getPosition
 * Usage: pos = scanner.getPosition();
 * -----------------------------------
 * Returns the current position of the scanner in the input stream.
 * If <code>saveToken</code> has been called, this position corresponds
 * to the beginning of the saved token.  If <code>saveToken</code> is
 * called more than once, the position is unavailable.
 */

TokenScanner.prototype.getPosition = function() {
   switch (this.savedTokens.length) {
    case 0: return this.cp;
    case 1: return this.cp - this.savedTokens[0].length;
   }
   throw new Error("Internal error: getPosition after two saves");
};

/*
 * Method: isValidIdentifier
 * Usage: if (scanner.isValidIdentifier(token)) . . .
 * --------------------------------------------------
 * Returns <code>true</code> if the token is a valid identifier.
 */

TokenScanner.prototype.isValidIdentifier = function(tokenText) {
   if (tokenText.length == 0) return false;
   var ch = tokenText.charAt(0);
   if (!this.isWordCharacter(ch) || isdigit(ch)) return false;
   for (var i = 1; i < tokenText.length; i++) {
      if (!this.isWordCharacter(tokenText.charAt(i))) return false;
   }
   return true;
};

/*
 * Method: isWordCharacter
 * Usage: if (scanner.isWordCharacter(ch)) . . .
 * ---------------------------------------------
 * Returns <code>true</code> if the character is valid in a word.
 */

TokenScanner.prototype.isWordCharacter = function(ch) {
   // This helps catch cases like í or ñ or 身
   if(this.isNonLatinWordCh(ch)) {
      return true
   }
   return isalnum(ch) || this.wordChars.indexOf(ch) != -1;
};

TokenScanner.prototype.isNonLatinWordCh = function(ch) {
   // catches chinese, hebrew, spanish etc...
   return /[^\u0000-\u007F]/.test(ch)
};

/*
 * Method: getTokenType
 * Usage: type = scanner.getTokenType(token);
 * ------------------------------------------
 * Returns the type of this token, which is one of the following
 * enumerated type constants:
 *
 *<pre>
 *    TokenScanner.EOF
 *    TokenScanner.SEPARATOR
 *    TokenScanner.WORD
 *    TokenScanner.NUMBER
 *    TokenScanner.STRING
 *    TokenScanner.OPERATOR
 *</pre> 
 */

TokenScanner.prototype.getTokenType = function(tokenText) {
   assert(typeof tokenText == "string")
   var result = TokenScanner.getTokenType(tokenText);
   if (result == TokenScanner.OPERATOR) {
      let ch = tokenText.charAt(0)
      if (this.wordChars.indexOf(ch) >= 0) {
         result = TokenScanner.WORD;
      }
   }
   return result;
};

/*
 * Method: toString
 * Usage: str = scanner.toString();
 * --------------------------------
 * Returns a printable representation of this scanner.
 */

TokenScanner.prototype.toString = function() {
   var str = typeof(this);
   if (this.buffer.length < TokenScanner.MAX_TO_STRING_LENGTH) {
      str += "(\"" + this.buffer + "\")";
   } else {
      str += "(" + this.buffer.length + " chars)";
   }
   return str;
};

TokenScanner.MAX_TO_STRING_LENGTH = 20;

/* Class methods */

TokenScanner.EOF = -1;
TokenScanner.SEPARATOR = 0;
TokenScanner.WORD = 1;
TokenScanner.NUMBER = 2;
TokenScanner.STRING = 3;
TokenScanner.OPERATOR = 4;

/*
 * Function: getTokenType
 * Usage: type = TokenScanner.getTokenType(token);
 * -----------------------------------------------
 * Returns the typical type of this token without taking into
 * account the specific settings of a particular scanner.
 */

TokenScanner.getTokenType = function(tokenText) {
   assert(typeof tokenText == "string")
   if (tokenText == "") return TokenScanner.EOF;
   var ch = tokenText.charAt(0);
   if (isspace(ch)) return TokenScanner.SEPARATOR;
   if (ch == '"' || ch == "'") return TokenScanner.STRING;
   if (isdigit(ch)) return TokenScanner.NUMBER;
   if (isalpha(ch)) return TokenScanner.WORD;
   return TokenScanner.OPERATOR;
};

/*
 * Function: getString
 * Usage: str = TokenScanner.getString(token);
 * -------------------------------------------
 * Returns the actual string value corresponding to a string token.
 */

TokenScanner.getString = function(tokenText) {
   return eval(tokenText);
}

/*
 * Function: getNumber
 * Usage: n = TokenScanner.getNumber(token);
 * -----------------------------------------
 * Returns the numeric value corresponding to a number token.
 */

TokenScanner.getNumber = function(tokenText) {
   assert(typeof tokenText == "string")
   return eval(tokenText);
}

/* Private methods */

TokenScanner.prototype.getChar = function() {
   if (this.savedCharacters.length == 0) {
      return (this.cp >= this.length) ? "" : this.buffer.charAt(this.cp++);
   } else {
      this.cp++;
      return this.savedCharacters.pop();
   }
};

TokenScanner.prototype.saveChar = function(ch) {
   this.cp--;
   this.savedCharacters.push(ch);
};

TokenScanner.prototype.skipSpaces = function() {
   while (true) {
      var ch = this.getChar();
      if (ch == "") return;
      if (!isspace(ch)) {
         this.saveChar(ch);
         return;
      }
   }
};

TokenScanner.prototype.scanWord = function() {
   var token = "";
   while (true) {
      var ch = this.getChar();
      if (ch == "") break;
      if (!this.isWordCharacter(ch)) {
         this.saveChar(ch);
         break;
      }
      token += ch;
   }
   return token;
};

TokenScanner.INITIAL_STATE = 0;
TokenScanner.BEFORE_DECIMAL_POINT = 1;
TokenScanner.AFTER_DECIMAL_POINT = 2;
TokenScanner.STARTING_EXPONENT = 3;
TokenScanner.FOUND_EXPONENT_SIGN = 4;
TokenScanner.SCANNING_EXPONENT = 5;
TokenScanner.LEADING_ZERO = 6;
TokenScanner.SCANNING_HEX = 7;
TokenScanner.FINAL_STATE = 8;

TokenScanner.prototype.scanNumber = function() {
   var token = "";
   var state = TokenScanner.INITIAL_STATE;
   while (state != TokenScanner.FINAL_STATE) {
      var ch = this.getChar();
      var xch = 'e';
      switch (state) {
       case TokenScanner.INITIAL_STATE:
         if (ch == '0') {
            state = TokenScanner.LEADING_ZERO;
         } else {
            state = TokenScanner.BEFORE_DECIMAL_POINT;
         }
         break;
       case TokenScanner.BEFORE_DECIMAL_POINT:
         if (ch == '.') {
            state = TokenScanner.AFTER_DECIMAL_POINT;
         } else if (ch == 'E' || ch == 'e') {
            state = TokenScanner.STARTING_EXPONENT;
            xch = ch;
         } else if (!isdigit(ch)) {
            this.saveChar(ch);
            state = TokenScanner.FINAL_STATE;
         }
         break;
       case TokenScanner.AFTER_DECIMAL_POINT:
         if (ch == 'E' || ch == 'e') {
            state = TokenScanner.STARTING_EXPONENT;
            xch = ch;
         } else if (!isdigit(ch)) {
            this.saveChar(ch);
            state = TokenScanner.FINAL_STATE;
         }
         break;
       case TokenScanner.STARTING_EXPONENT:
         if (ch == '+' || ch == '-') {
            state = TokenScanner.FOUND_EXPONENT_SIGN;
         } else if (isdigit(ch)) {
            state = TokenScanner.SCANNING_EXPONENT;
         } else {
            this.saveChar(ch);
            state = TokenScanner.FINAL_STATE;
         }
         break;
       case TokenScanner.FOUND_EXPONENT_SIGN:
         if (isdigit(ch)) {
            state = TokenScanner.SCANNING_EXPONENT;
         } else {
            this.saveChar(ch);
            this.saveChar(xch);
            state = TokenScanner.FINAL_STATE;
         }
         break;
       case TokenScanner.SCANNING_EXPONENT:
         if (!isdigit(ch)) {
            this.saveChar(ch);
            state = TokenScanner.FINAL_STATE;
         }
         break;
       case TokenScanner.LEADING_ZERO:
         if (ch == 'x' || ch == 'X') {
            state = TokenScanner.SCANNING_HEX;
         } else if (ch == '.') {
            state = TokenScanner.AFTER_DECIMAL_POINT;
         } else if (ch == 'E' || ch == 'e') {
            state = TokenScanner.STARTING_EXPONENT;
            xch = ch;
         } else if (!isdigit(ch)) {
            this.saveChar(ch);
            state = TokenScanner.FINAL_STATE;
         }
         break;
       case TokenScanner.SCANNING_HEX:
         if (!isxdigit(ch)) {
            this.saveChar(ch);
            state = TokenScanner.FINAL_STATE;
         }
         break;
       default:
         state = TokenScanner.FINAL_STATE;
         break;
      }
      if (state != TokenScanner.FINAL_STATE) {
         token += ch;
      }
   }
   return token;
};

TokenScanner.prototype.scanString = function() {
   var token = "";
   var delim = this.getChar();
   token += delim;
   while (true) {
      var ch = this.getChar();
      if (ch == "") throw new Error("Unterminated string");
      if (ch == delim) break;
      if (ch == '\\') {
               token += this.scanEscapeCharacter();
      } else {
         token += ch;
      }
   }
   return token + delim;
};

TokenScanner.prototype.scanEscapeCharacter = function() {
   var str = "\\";
   var ch = this.getChar();
   str += ch;
   if (isdigit(ch) || ch == 'x' || ch == 'u') {
      var hex = !isdigit(ch);
      while (true) {
         ch = this.getChar();
         if ((hex) ? !isxdigit(ch) : !isdigit(ch)) break;
         str += ch;
      }
      this.saveChar(ch);
   }
   return str;
};

TokenScanner.prototype.isOperator = function(op) {
   return this.operators[op] === true;
}

TokenScanner.prototype.isOperatorPrefix = function(op) {
   for (var str in this.operators) {
      if (str.startsWith(op)) return true;
   }
   return false;
}

// relates character index to line number in source code
TokenScanner.prototype.makeLineNumberMap = function(str) {
   var lineNumMap = {}
   var currLineNumber = 0
   for(var cp = 0; cp < str.length; cp++) {
      var ch = str.charAt(cp)
      lineNumMap[cp] = currLineNumber;
      if(ch == '\n') {
         currLineNumber += 1;
      }
   }
   return lineNumMap
}

// relates line number to indentation level
TokenScanner.prototype.makeLineIndentMap = function(str) {
   var lineNumMap = {}
   var lines = str.split('\n')
   for (var i = 0; i < lines.length; i++) {
      let currLine = lines[i];
      let indentLevel = this.getIndentLevel(currLine)
      lineNumMap[i] = indentLevel;
   }
   return lineNumMap
}

// calculates the indent amount for a line
TokenScanner.prototype.getIndentLevel = function(str) {
   var indentLevel = 0
   for(var cp = 0; cp < str.length; cp++) {
      var ch = str.charAt(cp)
      var isWhitespace = /\s/.test(ch)
      if(!isWhitespace) {
         return indentLevel;
      }
      indentLevel++;
   }
   // if a string is all whitespace
   return str.length
}
