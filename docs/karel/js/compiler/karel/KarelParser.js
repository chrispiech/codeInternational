/*
 * File: KarelParser.js
 * --------------------
 * This file implements a parser for the Karel language.
 */

function KarelParser() {
   Parser.call(this);
   this.scanner.addWordCharacters("_");
   this.operators = { };
   this.defineOperators();
}
KarelParser.prototype = new XParser;
KarelParser.prototype.constructor = KarelParser;

KarelParser.prototype.defineOperators = function() {
   this.definePrefixOperator("(", this.parenOperator, 0, "RIGHT");
   this.definePrefixOperator("!", this.prefixOperator, 100);
   this.defineInfixOperator("(", this.applyOperator, 110, "RIGHT");
   this.defineInfixOperator("&&", this.infixOperator, 30);
   this.defineInfixOperator("||", this.infixOperator, 20);
};

KarelParser.statementForms = { };

KarelParser.statementForms["if"] = function(parser) {
   parser.verifyToken("(");
   var exp = parser.readPredicate();
   parser.verifyToken(")");
   var s1 = parser.readStatement();
   var token = parser.nextToken();
   if (token.text == "else") {
      return [ "if", exp, s1, parser.readStatement() ];
   } else {
      parser.saveToken(token);
      return [ "if", exp, s1 ];
   }
};

KarelParser.statementForms["while"] = function(parser) {
   parser.verifyToken("(");
   var exp = parser.readPredicate();
   console.log(exp)
   parser.verifyToken(")");
   return [ "while", exp, parser.readStatement() ];
};

KarelParser.statementForms["repeat"] = function(parser) {
   parser.verifyToken("(");
   var numberToken = parser.nextToken();
   parser.verifyToken(")");
   var stmt = parser.readStatement();
   return [ "repeat", TokenScanner.getNumber(numberToken.text), stmt, ["lineNumber", lineNumber] ];
};

KarelParser.statementForms["for"] = function(parser) {
   parser.verifyToken("(");
   parser.verifyToken("int");
   var iteratorToken = parser.nextToken()
   var iteratorName = iteratorToken.text;
   var lineNumber = iteratorToken.lineNumber;
   parser.verifyToken("=");
   parser.verifyToken("0");
   parser.verifyToken(";");
   var condToken = parser.nextToken().text;
   if(condToken != iteratorName) {
      throw new Error("We expect for loops for karel to be in standard form.");
   }
   parser.verifyToken("<");
   var numberToken = parser.nextToken().text;
   if(numberToken == "=") {
      throw new Error("We expect for loops for karel to be in standard form.");
   }
   if (TokenScanner.getTokenType(numberToken) != TokenScanner.NUMBER) {
      throw new Error("The repeat statement requires an integer");
   }
   parser.verifyToken(";");
   var endToken = parser.nextToken().text;
   if(endToken != iteratorName) {
      throw new Error("We expect for loops for karel to be in standard form.");
   }
   parser.verifyToken("+");
   parser.verifyToken("+");

   parser.verifyToken(")");
   return [ "repeat", TokenScanner.getNumber(numberToken), parser.readStatement(), ["lineNumber", lineNumber] ];
};

KarelParser.prototype.readImport = function() {
   // there may be multiple
   while(true){
      var token = this.nextToken();
      if(token.text != 'import') {
         this.saveToken(token);
         break
      }
      while(token.text != ';') {
         token = this.nextToken();
      }
   }
   
}

KarelParser.prototype.readClass = function() {
   var token = this.nextToken().text;
   if(token == "class") {
      throw new Error("classes should be public or private");
   } else if(token != "public" && token != "private") {
      throw new Error("classes should be public or private, not " + token);
   }

   this.verifyToken("class");

   var name = this.nextToken().text;

   if (!this.scanner.isValidIdentifier(name)) {
      throw new Error("\"" + name + "\" is not a legal class name");
   }

   this.verifyToken("extends");

   var baseClass = this.nextToken().text;
   var allowedBaseClasses = {
      "Karel":true,
      "SuperKarel":true,
      "EsKarel":true
   }

   if(! baseClass in allowedBaseClasses) {
      throw new Error("Karel programs should extend Karel or EsKarel");
   }

   this.verifyToken("{");

   var functionMap = {}
   while (true) {
      var token = this.nextToken();
      if (token.text == "") break;
      this.saveToken(token);
      if (token.text == "}") break;

      var fn = this.readFunction();
      var fnName = fn[1];
      if(fnName in functionMap) {
         throw new Error("Method " + fnName + " already defined");
      }
      functionMap[fnName] = fn;
   }

   this.verifyToken("}");

   return ["class", name, baseClass, functionMap];

}

KarelParser.prototype.readFunction = function() {
   var token = this.nextToken().text;
   if(token == "void") {
      throw new Error("methods should be public or private");
   } else if(token != "public" && token != "private") {
      throw new Error("methods should be public or private, not " + token);
   }


   this.verifyToken("void");
   var name = this.nextToken().text;
   
   if (!this.scanner.isValidIdentifier(name)) {
      throw new Error("\"" + name + "\" is not a legal function name");
   }
   this.verifyToken("(");
   this.verifyToken(")");

   console.log('parsing fn ' + name)
   var openToken = this.nextToken("{");
   if(openToken.text != "{") {
      throw new Error("Methods should have an open bracket, {")
   } else {
      this.saveToken(openToken)
   }
   return ["function", name, this.readStatement()];
};

KarelParser.prototype.readStatement = function() {
   var token = this.nextToken();
   if (token.text == "{") {
      var block = [ "block" ];
      while (true) {
         token = this.nextToken();
         if (token.text == "}") break;
         this.saveToken(token);
         var stmt = this.readStatement();
         block.push(stmt);
      }
      return block;
   }
   var tokenText = token.text
   var lineNumber = token.lineNumber
   var prop = KarelParser.statementForms[tokenText];
   if (prop) return prop(this);
   this.verifyToken("(");
   this.verifyToken(")");
   this.verifyToken(";");
   return [ "stmt", [ "call", tokenText ], ["lineNumber", lineNumber] ];
};

KarelParser.prototype.readPredicate = function() {
   return this.readE(0);
};
