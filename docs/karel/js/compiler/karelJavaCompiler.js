
/**
 * Class: KarelCompiledEngine
 * --------------------------
 * This class is in charge of compiling a piece of Karel
 * code into some abstraction such that it can execute 
 * the program one step at a time. Implements the same
 * interface as the karelEvalEngine.
 */
function KarelJavaCompiler(karel) {

   var that = {};
   that.vm = new KarelVM(karel);

   that.compile = function(text) {

      that.vm.resetTempCounter();
      var parser = new KarelParser();
      parser.setInput(text);
      parser.readImport();
      var karelClass = parser.readClass();
      var token = parser.nextToken();
      if(token.text != "") {
         throw new Error("Found " + token + " after your Karel class. Only one class allowed in the online Karel");
      }
      var baseClass = karelClass[2];
      var functionMap = karelClass[3];

      var functions = [];
      var functionNames = [];
      for(var fnName in functionMap) {
         var fn = functionMap[fnName];
         functionNames.push(fnName);
         functions.push(fn);
      }

      // populate that.vm.functions which is a map between
      // function names and a simple code stack

      that.vm.setUserFnNames(functionNames);
      for(var i = 0; i < functions.length; i++) {
         var fn = functions[i];
         console.log(fn[1])
         console.log(fn[2])
         var code = [];
         that.vm.compile(fn[2], code);
         code.push(new ReturnIns());
         that.vm.functions[fn[1]] = code;
         console.log('code')
         console.log(code)
      }
      that.vm.reset();
      that.vm.startCheck("run");
   }

   that.executeStep = function() {
      var vm = that.vm;
      if (!vm.cf) return {isDone:true}
      var running = true;
      while (running) {
         if (vm.atStatementBoundary()) running = false;
         vm.step();
      }
      var currLineNum = vm.getCurrLineNum()
      return {
         isDone:false,
         lineNumber:currLineNum
      }
   }

   return that;

}
