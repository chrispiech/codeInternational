/*
 * File: Parser.js
 * ---------------
 * This class implements the basic functionality of a recursive-descent
 * parser.  Many clients will be more interested in the XParser subclass,
 * which implements a standard expression parser.
 */

/*
 * Implementation notes
 * --------------------
 * This parser is based on a simple recursive-descent parser abstraction
 * that I developed with Greg Nelson at Harvard in the 1970s.  Over the
 * years, it has proven to be surprisingly adaptable to a wide range
 * of applications.
 */

function Parser() {
   this.scanner = new TokenScanner();
   this.scanner.setIgnoreWhitespaceFlag(true);
   this.scanner.setIgnoreCommentsFlag(true);
   this.scanner.setScanNumbersFlag(true);
   this.scanner.setScanStringsFlag(true);
   this.prefixProperties = { };
   this.infixProperties = { };
}

/*
 * Method: parse
 * Usage: exp = parser.parse();
 * ----------------------------
 * Parses a single expression from the scanner and ensures that
 * the token stream is exhausted as part of the scan.  This entry
 * point is useful for clients that are reading complete
 * expressions on separate lines but not for those with more
 * complex parsing demands.  Such clients will need to call readE
 * and readT directly.
 */

Parser.prototype.parse = function() {
   var exp = this.readE(0);
   var token = this.nextToken();
   if (token != "") throw new Error("Unexpected token \"" + token + "\"");
   return exp;
};

/*
 * Method: readE
 * Usage: exp = parser.readE(prec);
 * --------------------------------
 * Parses the next expression from the token stream.  The prec
 * argument specifies the prevailing precedence, and readE will
 * return if it encounters an operator whose precedence is lower
 * than prec, using the associativity of the new operator to break
 * ties.  The value of prec defaults to 0.
 */

Parser.prototype.readE = function(prec) {
   if (!prec) prec = 0;
   var exp = this.readT();
   var token = this.nextToken();
   while (this.takesPrecedence(token, prec)) {
      var prop = this.infixProperties[token.text];
      exp = prop.action(this, token, exp);
      token = this.nextToken();
   }
   this.saveToken(token);
   return exp;
};

/*
 * Method: readT
 * Usage: exp = parser.readT();
 * ----------------------------
 * Reads a single term from the token stream.
 */

Parser.prototype.readT = function() {
   var token = this.nextToken();
   switch (TokenScanner.getTokenType(token.text)) {
    case TokenScanner.EOF:
      throw new Error("Unexpected end of line");
    case TokenScanner.WORD: case TokenScanner.OPERATOR:
      var prop = this.prefixProperties[token.text];
      if (prop) return prop.action(this, token);
      break;
   }
   return token;
};

/*
 * Method: definePrefixOperator
 * Usage: parser.definePrefixOperator(op, fn, prec);
 * -------------------------------------------------
 * Defines a prefix operator.  The op argument indicates the name,
 * fn is a function that implements the operator semantics, and
 * prec indicates the prefix precedence.
 */

Parser.prototype.definePrefixOperator = function(op, fn, prec) {
   if (!prec) prec = 0;
   this.prefixProperties[op] = { prec: prec, assoc: "LEFT", action: fn };
   if (!this.scanner.isValidIdentifier(op.charAt(0))) {
      this.scanner.defineOperator(op);
   }
};

/*
 * Method: defineInfixOperator
 * Usage: parser.defineInfixOperator(op, fn, prec, assoc);
 * -------------------------------------------------------
 * Defines an infix operator.  The op argument indicates the name,
 * fn is a function that implements the operator semantics, and
 * the remaining operators indicate the infix precedence and
 * associativity.
 */

Parser.prototype.defineInfixOperator = function(op, fn, prec, assoc) {
   if (!prec) prec = 0;
   if (!assoc) assoc = "LEFT";
   this.infixProperties[op] = { prec: prec, assoc: assoc, action: fn };
   if (!this.scanner.isValidIdentifier(op.charAt(0))) {
      this.scanner.defineOperator(op);
   }
};

/*
 * Method: setInput
 * Usage: parser.setInput(str);
 * ----------------------------
 * Sets the input to the token scanner.
 */

Parser.prototype.setInput = function(str) {
   this.scanner.setInput(str);
};

Parser.prototype.nextToken = function() {
   return this.scanner.nextToken();
};

Parser.prototype.peekNext = function() {
   let nextToken = this.nextToken()
   this.saveToken(nextToken)
   return nextToken;
}

Parser.prototype.nextTokenIndentLevel = function() {
   return this.scanner.nextTokenIndentLevel();
}

Parser.prototype.saveToken = function(token) {
   this.scanner.saveToken(token);
};

Parser.prototype.verifyToken = function(expected) {
   return this.scanner.verifyToken(expected);
};

Parser.prototype.verifyNewline = function(expected) {
   return this.scanner.verifyNewline(expected);
};

Parser.prototype.hasMoreTokens = function() {
   return this.scanner.hasMoreTokens();
};

/*
 * Method: takesPrecedence
 * Usage: if (parser.takesPrecedence(token, prec)) . . .
 * -----------------------------------------------------
 * Checks to see if the specified token takes precedence relative
 * to the prevailing precedence specified by prec.  If the token
 * is not an operator, this method will always return false.  If
 * it is an operator, this method uses the precedence and associativity
 * of the operator token to see whether it takes or yields precedence
 * in this context.
 */

Parser.prototype.takesPrecedence = function(token, prec) {
   switch (this.scanner.getTokenType(token.text)) {
    case TokenScanner.WORD: case TokenScanner.OPERATOR:
      var prop = this.infixProperties[token.text];
      if (!prop) return false;
      var newPrec = prop.prec;
      if (newPrec == prec) return (prop.assoc == "RIGHT");
      return newPrec > prec;
   }
   return false;
}

/*
 * Method: unparse
 * Usage: str = Parser.unparse(exp);
 * ---------------------------------
 * Converts an expression into a printable form.
 */

Parser.unparse = function(exp) {
   if (exp instanceof Array) {
      var str = "(";
      for (var i = 0; i < exp.length; i++) {
         if (i > 0) str += " ";
         str += Parser.unparse(exp[i]);
      }
      return str + ")";
   }
   return exp;
};

/*
 * Method: toString
 * Usage: (usually implicit)
 * -------------------------
 * Creates a string version of this parser.
 */

Parser.prototype.toString = function() {
   return typeof(this) + "(...)";
};
