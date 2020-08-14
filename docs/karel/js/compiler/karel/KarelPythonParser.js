/*
 * File: KarelPythonParser.js
 * --------------------
 * This file implements a parser for the KarelPy language.
 */

function KarelPythonParser() {
   Parser.call(this);
   this.scanner.addWordCharacters("_");
   this.scanner.setCommentStructure('python')
   this.operators = { };
   this.defineOperators();
}
KarelPythonParser.prototype = new XParser;
KarelPythonParser.prototype.constructor = KarelPythonParser;

KarelPythonParser.prototype.defineOperators = function() {
   console.log('is this ever executed?????')
   this.definePrefixOperator("(", this.parenOperator, 0, "RIGHT");
   this.definePrefixOperator("!", this.prefixOperator, 100);
   this.defineInfixOperator("(", this.applyOperator, 110, "RIGHT");
   this.defineInfixOperator("and", this.infixOperator, 30);
   this.defineInfixOperator("or", this.infixOperator, 20);
};

KarelPythonParser.statementForms = { };

KarelPythonParser.statementForms["if"] = function(parser) {
   let headerIndentLevel = parser.nextTokenIndentLevel()
   var exp = parser.readPredicate();
   parser.verifyToken(":")
   parser.verifyNewline()
   var s1 = parser.readBlock(headerIndentLevel);
   var token = parser.nextToken();
   if (token.text == "else") {
      parser.verifyToken(":")
      parser.verifyNewline()
      return [ "if", exp, s1, parser.readBlock(headerIndentLevel)];
   } else {
      parser.saveToken(token);
      return [ "if", exp, s1 ];
   }
};

KarelPythonParser.statementForms["while"] = function(parser) {
   let headerIndentLevel = parser.nextTokenIndentLevel()
   var exp = parser.readPredicate();
   parser.verifyToken(":");
   parser.verifyNewline()
   return [ "while", exp, parser.readBlock(headerIndentLevel)];
};

KarelPythonParser.statementForms["repeat"] = function(parser) {
   let headerIndentLevel = parser.nextTokenIndentLevel()
   parser.verifyToken("(");
   var numberToken = parser.nextToken();
   var lineNumber = numberToken.lineNumber;
   parser.verifyToken(")");
   parser.verifyToken(":");
   parser.verifyNewline()
   var stmt = parser.readBlock(headerIndentLevel);
   return [ "repeat", TokenScanner.getNumber(numberToken.text), stmt, ["lineNumber", lineNumber] ];
};

KarelPythonParser.statementForms["for"] = function(parser) {
   let headerIndentLevel = parser.nextTokenIndentLevel()

   var iteratorToken = parser.nextToken();
   var iteratorName = iteratorToken.text;
   var lineNumber = iteratorToken.lineNumber;

   parser.verifyToken("in");
   parser.verifyToken("range");
   parser.verifyToken("(");
   var numberToken = parser.nextToken().text;
   var N = TokenScanner.getNumber(numberToken)
   parser.verifyToken(")")
   parser.verifyToken(":")
   parser.verifyNewline()
   var body = parser.readBlock(headerIndentLevel)
   return [ "repeat", N, body, ["lineNumber", lineNumber] ];
};

KarelPythonParser.prototype.readImport = function() {
   // there may be multiple
   while(true){
      var token = this.nextToken();
      let txt = token.text
      var isImport = txt == 'import' || txt == 'from'
      if(!isImport) {
         this.saveToken(token);
         break
      }
      if(txt == 'from') {
         this.verifyToken('karel')
         this.verifyToken('.')
         this.verifyToken('stanfordkarel')
         this.verifyToken('import')
         this.verifyToken('*')
         this.verifyNewline()
      } else {
         this.verifyToken('karel')
         this.verifyNewline()
      }
   }
   
}

KarelPythonParser.prototype.readClass = function() {
   // even though python doesnt have classes, this is still
   // the entry point of the parse...
   this.readImport()

   baseClass = 'SuperKarel'
   name = 'MyKarel'

   var functionMap = {}
   while (true) {
      var token = this.nextToken();
      if (token.text == "") break;
      this.saveToken(token);

      if (token.text == "run") {
         // we are executing the run method!!
         this.verifyToken('run')
         this.verifyToken('(')
         this.verifyToken(')')
         this.verifyNewline()
         break // you are done!
      } else if (token.text == "def") {
         // we are defining a new method
         var fn = this.readFunction();
         var fnName = fn[1];
         if(fnName in functionMap) {
            throw new Error("Method " + fnName + " already defined");
         }
         functionMap[fnName] = fn;
      } else {
         var msg = "Found " + token.text + " when execting method def or run()."
         msg += "\nLine " + token.lineNumber;
         throw new Error(msg)
      }
   }
   return ["class", name, baseClass, functionMap];

}

KarelPythonParser.prototype.readFunction = function() {
   let headerIndentLevel = this.nextTokenIndentLevel()
   
   this.verifyToken("def");
   var name = this.nextToken().text;
   
   if (!this.scanner.isValidIdentifier(name)) {
      throw new Error("\"" + name + "\" is not a legal function name");
   }
   this.verifyToken("(");
   this.verifyToken(")");
   this.verifyToken(":");
   this.verifyNewline();

   console.log('parsing fn ' + name)
   return ["function", name, this.readBlock(headerIndentLevel)];
};

KarelPythonParser.prototype.readBlock = function(headerIndentLevel){
   if(headerIndentLevel == undefined){
      console.error("header indent: "+ headerIndentLevel)
      console.error("must specify a header indent level")
   }
   let bodyIndentLevel = this.nextTokenIndentLevel()
   if(bodyIndentLevel <= headerIndentLevel) {
      throw new Error("Function body must be indentented")
   }
   var block = [ "block"];
   while(true) {
      // you may have reached the end of the program
      if(!this.hasMoreTokens()){
         break;
      }

      // decide on whether the block continues based on indent
      let nextIndentLevel = this.nextTokenIndentLevel()
      if(nextIndentLevel > bodyIndentLevel) {
         throw new Error("Indentation error");
      }
      if(nextIndentLevel < bodyIndentLevel){
         break;
      }
      var stmt = this.readStatement()
      block.push(stmt);
   }
   return block
}

KarelPythonParser.prototype.readStatement = function(bodyIndentLevel) {
   var token = this.nextToken();
   var tokenText = token.text
   var lineNumber = token.lineNumber
   var prop = KarelPythonParser.statementForms[tokenText];
   if (prop) return prop(this);
   this.verifyToken("(");
   this.verifyToken(")");
   this.verifyNewline()
   return [ "stmt", [ "call", tokenText ], ["lineNumber", lineNumber] ];
};

KarelPythonParser.prototype.readPredicate = function() {
   console.log('read predicate')
   let predicate = this.readE(0);
   console.log(predicate)
   // I switch to && and || so that the interpreter doesn't have to
   // tell the difference between java and python
   if(predicate[0] == 'and') {
      predicate[0] = '&&'
   }
   if(predicate[0] == 'or') {
      predicate[0] = '||'
   }
   console.log('predicate:')
   console.log(predicate)
   return predicate
};
