/*
 * File: KarelVM.js
 * ----------------
 * This class implements the instructions for the Karel virtual machine.
 * This class extends XVM to inherit the !, &&, and || operators.
 * WARNING: I am experimenting with adding line numbers to the VM. 
 * I have not made sure that it works correctly in all cases.
 */

function KarelVM(karel) {
   XVM.call(this);
   this.karel = karel;
   this.initKarelOperators();
   this.userFnNames = [];
   this.currLineNum = null;
}
KarelVM.prototype = new XVM;
KarelVM.prototype.constructor = KarelVM;

KarelVM.prototype.initKarelOperators = function() {
   this.defineOperator(new KarelCall());
   this.defineOperator(new KarelWhile());
   this.defineOperator(new KarelRepeat());
   this.defineOperator(new KarelIf());
   this.defineOperator(new KarelBlock());
   this.defineOperator(new KarelStmt());
};

KarelVM.prototype.resetTempCounter = function() {
   this.nextTemp = 0;
};

KarelVM.prototype.setUserFnNames = function(userFnNames) {
   this.userFnNames = userFnNames;
}

KarelVM.prototype.getCurrLineNum = function() {
   return this.currLineNum;
}

KarelVM.prototype.startCheck = function(startFnName) {
   // start check sets up the vm to be calling the run method.
   // should be called to set up a new execution
   if (this.cf == null) {
      var code = this.functions[startFnName];
      if (!code) throw new Error("No "+startFnName+" function defined");
      this.call(startFnName, code);
   }
};

KarelVM.prototype.atStatementBoundary = function() {
   if(!this.cf) return true;
   // the first boundry doesn't count as a statement boundry
   if(this.getCurrLineNum() == null) return false;
   if(this.cf.code[this.cf.pc].name == "stmt") return true
   return false
};

function KarelCall(fn, lineNumber) {
   this.name = "call";
   this.fn = fn;
   this.lineNumber = lineNumber;
}

KarelCall.prototype.toString = function() {
   return this.name + " " + this.fn;
};

KarelCall.prototype.legalFn = function(fn, userFns) {
   if (Karel.instructions[fn]) return true;
   if (Karel.predicates[fn]) return true;
   if ($.inArray(fn, userFns) != -1) return true;
   return false;
}

KarelCall.prototype.compile = function(vm, exp, code) {
   var fn = exp[1];
   var lineNum = exp[2];
   if (!this.legalFn(fn, vm.userFnNames)){
      throw new Error("Undefined operator \"" + fn + "\"");
   }
   code.push(new KarelStmt())
   code.push(new KarelCall(fn, lineNum));
};

KarelCall.prototype.execute = function(vm) {
   // update the line number of the vm
   vm.currLineNum = this.lineNumber;
   
   // user defined methods take precidence
   if ($.inArray(this.fn, vm.userFnNames) != -1) {
      vm.call(this.fn, vm.functions[this.fn]);
   } else if (Karel.instructions[this.fn]) {
      vm.karel[this.fn]();
   } else if (Karel.predicates[this.fn]) {
      vm.push(vm.karel[this.fn]());
   } 
};

function KarelRepeat() {
   this.name = "repeat";
   this.lineNumber = null;
}

KarelRepeat.prototype.toString = function() {
   return this.name;
};

KarelRepeat.prototype.compile = function(vm, exp, code) {
   code.push(new KarelStmt())
   
   // lets make this easier to read
   var nRepeats = exp[1]
   var body = exp[2]
   var lineNumber = exp[3][1]

   var temp = "$" + vm.nextTemp++;
   var jump1 = new JumpIns("jumpf");
   var jump2 = new JumpIns("jump");
   code.push(new PushIns(nRepeats));
   code.push(new StoreIns(temp));
   jump2.setTarget(code.length);
   code.push(new PushIns(0));
   code.push(vm.operators[">"]);
   code.push(new SetLineNumber(lineNumber))
   code.push(jump1);
   vm.compile(body, code);

   // for that off-by-one stmt problem
   code.push(new KarelStmt())

   code.push(new LoadIns(temp));
   code.push(new PushIns(1));
   code.push(vm.operators["-"]);
   code.push(new StoreIns(temp));
   code.push(jump2);
   jump1.setTarget(code.length);
};

function SetLineNumber(lineNumber) {
   this.name = "setLineNumber"
   this.lineNumber = lineNumber
}

SetLineNumber.prototype.execute = function(vm) {
   vm.currLineNum = this.lineNumber;
}


function KarelWhile() {
   this.name = "while";
}

KarelWhile.prototype.toString = function() {
   return this.name;
};

KarelWhile.prototype.compile = function(vm, exp, code) {
   var jump1 = new JumpIns("jumpf");
   var jump2 = new JumpIns("jump");
   // jump2 target is +1 since you want to skip the first line
   // which should be a stmt
   jump2.setTarget(code.length + 1);
   vm.compile(exp[1], code);
   code.push(jump1);
   vm.compile(exp[2], code);

   // add an extra statement for off-by-one
   code.push(new KarelStmt())

   code.push(jump2);
   jump1.setTarget(code.length);
};

function KarelIf() {
   this.name = "if";
}

KarelIf.prototype.toString = function() {
   return this.name;
};

KarelIf.prototype.compile = function(vm, exp, code) {
   var jump1 = new JumpIns("jumpf");
   var jump2 = new JumpIns("jump");
   vm.compile(exp[1], code);
   code.push(jump1);
   vm.compile(exp[2], code);
   if (exp.length > 3) {
      code.push(jump2);
      jump1.setTarget(code.length);
      vm.compile(exp[3], code);


      jump2.setTarget(code.length);
   } else {
      jump1.setTarget(code.length);
   }
};

function KarelBlock() {
   this.name = "block";
}

KarelBlock.prototype.toString = function() {
   return this.name;
};

KarelBlock.prototype.compile = function(vm, exp, code) {
   for (var i = 1; i < exp.length; i++) {
      vm.compile(exp[i], code);
   }
};

// separates "step-able" statements 
function KarelStmt() {
   this.name = "stmt";
}

KarelStmt.prototype.toString = function() {
   return this.name;
};

KarelStmt.prototype.compile = function(vm, exp, code) {
   //code.push(this);
   var newExp = exp[1]
   newExp.push(exp[2][1])
   vm.compile(exp[1], code);
};

KarelStmt.prototype.execute = function(vm, exp, code) {
};
