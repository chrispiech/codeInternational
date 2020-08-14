/*
 * File: XParser.js
 * ----------------
 * This file implements a parser for standard JavaScript/Java/C/C++
 * arithmetic expressions.
 */

function XParser() {
   Parser.call(this);
   this.scanner.addWordCharacters("_");
   this.defineOperators();
}
XParser.prototype = new Parser;
XParser.prototype.constructor = XParser;

XParser.prototype.defineOperators = function() {
   this.definePrefixOperator("(", this.parenOperator, 0, "RIGHT");
   this.definePrefixOperator("+", this.prefixOperator, 100);
   this.definePrefixOperator("-", this.prefixOperator, 100);
   this.definePrefixOperator("!", this.prefixOperator, 100);
   this.definePrefixOperator("++", this.prefixOperator, 100, "RIGHT");
   this.definePrefixOperator("--", this.prefixOperator, 100, "RIGHT");
   this.defineInfixOperator("(", this.applyOperator, 110, "RIGHT");
   this.defineInfixOperator("+", this.infixOperator, 80);
   this.defineInfixOperator("-", this.infixOperator, 80);
   this.defineInfixOperator("++", this.suffixOperator, 100, "RIGHT");
   this.defineInfixOperator("--", this.suffixOperator, 100, "RIGHT");
   this.defineInfixOperator("*", this.infixOperator, 90);
   this.defineInfixOperator("/", this.infixOperator, 90);
   this.defineInfixOperator("%", this.infixOperator, 90);
   this.defineInfixOperator("<", this.infixOperator, 60);
   this.defineInfixOperator("<=", this.infixOperator, 60);
   this.defineInfixOperator(">", this.infixOperator, 60);
   this.defineInfixOperator(">=", this.infixOperator, 60);
   this.defineInfixOperator("==", this.infixOperator, 50);
   this.defineInfixOperator("!=", this.infixOperator, 50);
   this.defineInfixOperator("&&", this.infixOperator, 30);
   this.defineInfixOperator("||", this.infixOperator, 20);
   this.defineInfixOperator("?", this.questionMarkColon, 15, "RIGHT");
   this.defineInfixOperator("=", this.infixOperator, 10, "RIGHT");
   this.defineInfixOperator("+=", this.infixOperator, 10, "RIGHT");
   this.defineInfixOperator("-=", this.infixOperator, 10, "RIGHT");
   this.defineInfixOperator("*=", this.infixOperator, 10, "RIGHT");
   this.defineInfixOperator("/=", this.infixOperator, 10, "RIGHT");
   this.defineInfixOperator("%=", this.infixOperator, 10, "RIGHT");
};

XParser.prototype.prefixOperator = function(parser, op) {
   console.log('test')
   console.log(parser)
   console.log(op)
   assert(false)
   return ["pre" + op, parser.readE(parser.prefixProperties[op].prec)];
}

XParser.prototype.infixOperator = function(parser, op, lhs) {
   let opName = op.text;
   let properties = parser.infixProperties[opName]
   return [opName, lhs, parser.readE(properties.prec)];
};

XParser.prototype.suffixOperator = function(parser, op, lhs) {
   console.log('test')
   console.log(parser)
   console.log(op)
   assert(false)
   return ["post" + op, lhs];
};

XParser.prototype.parenOperator = function(parser, op) {
   console.log('test')
   console.log(parser)
   console.log(op)
   assert(false)
   var exp = parser.readE(0);
   parser.verifyToken(")");
   return exp;
}

XParser.prototype.applyOperator = function(parser, op, lhs) {
   var exp = ["call", lhs.text, lhs.lineNumber];
   var token = parser.nextToken();
   var tokenText = token.text;
   if (tokenText == ")") return exp;
   parser.saveToken(token);
   while (true) {
      exp.push(parser.readE(0));
      token = parser.nextToken();
      tokenText = token.text;
      if (tokenText == ")") break;
      if (tokenText != ',') {
         var msg = "Found \"" + tokenText + "\" when expecting \",\" or \")\"";
         throw new Error(msg);
      }
   }
   console.log('apply')
   console.log(exp)
   return exp;
}

XParser.prototype.questionMarkColon = function(parser, op, lhs) {
   var e1 = parser.readE(0);
   parser.verifyToken(":");
   var e2 = parser.readE(parser.infixProperties[op].prec);
   return ["?:", lhs, e1, e2];
};
