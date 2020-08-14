/*
 * File: XVM.js
 * ------------
 * This class extends the virtual machine model to include all
 * of the operators defined in the XParser class.
 */

function XVM() {
   VM.call(this);
   this.initOperators();
}
XVM.prototype = new VM;
XVM.prototype.constructor = XVM;

XVM.prototype.initOperators = function() {
   this.defineOperator(new PrefixOp("+", function (x) { return x; }));
   this.defineOperator(new PrefixOp("-", function (x) { return -x; }));
   this.defineOperator(new PrefixOp("!", function (x) { return !x; }));
   this.defineOperator(new InfixOp("+", function (x, y) { return x + y; }));
   this.defineOperator(new InfixOp("-", function (x, y) { return x - y; }));
   this.defineOperator(new InfixOp("*", function (x, y) { return x * y; }));
   this.defineOperator(new InfixOp("/", function (x, y) { return x / y; }));
   this.defineOperator(new InfixOp("%", function (x, y) { return x % y; }));
   this.defineOperator(new InfixOp("==", function (x, y) { return x == y; }));
   this.defineOperator(new InfixOp("!=", function (x, y) { return x != y; }));
   this.defineOperator(new InfixOp("<", function (x, y) { return x < y; }));
   this.defineOperator(new InfixOp("<=", function (x, y) { return x <= y; }));
   this.defineOperator(new InfixOp(">", function (x, y) { return x > y; }));
   this.defineOperator(new InfixOp(">=", function (x, y) { return x >= y; }));
   this.defineOperator(new AssignOp("="));
   this.defineOperator(new AssignOp("+=", function (x, y) { return x + y; }));
   this.defineOperator(new AssignOp("-=", function (x, y) { return x - y; }));
   this.defineOperator(new AssignOp("*=", function (x, y) { return x * y; }));
   this.defineOperator(new AssignOp("/=", function (x, y) { return x / y; }));
   this.defineOperator(new AssignOp("%=", function (x, y) { return x % y; }));
   this.defineOperator(new PrefixIncDecOp("++"));
   this.defineOperator(new PrefixIncDecOp("--"));
   this.defineOperator(new PostfixIncDecOp("++"));
   this.defineOperator(new PostfixIncDecOp("--"));
   this.defineOperator(new ShortCircuitOp("&&"));
   this.defineOperator(new ShortCircuitOp("||"));
   this.defineOperator(new QuestionMarkColonOp());
   this.defineOperator(new CallIns());
};

function PrefixIncDecOp(name) {
   this.name = "pre" + name;
   if (name == "++") {
      this.fn = function(x) { return x + 1; };
   } else {
      this.fn = function(x) { return x - 1; };
   }
}

PrefixIncDecOp.prototype.toString = function() {
   return this.name;
};

PrefixIncDecOp.prototype.compile = function(vm, exp, code) {
   vm.compile(exp[1], code);
   code.push(this);
   code.push(new StoreIns(exp[1]));
};

PrefixIncDecOp.prototype.execute = function(vm) {
   vm.push(this.fn(vm.pop()));
};

function PostfixIncDecOp(name, fn) {
   this.name = "post" + name;
   this.fn = fn;
}

PostfixIncDecOp.prototype.toString = function() {
   return this.name;
};

PostfixIncDecOp.prototype.compile = function(vm, exp, code) {
   vm.compile(exp[1], code);
   code.push(new DupIns());
   code.push(this);
   code.push(new StoreIns(exp[1]));
   code.push(new PopIns());
};

PostfixIncDecOp.prototype.execute = function(vm) {
   vm.push(this.fn(vm.pop()));
};

function ShortCircuitOp(name) {
   this.name = name;
}

ShortCircuitOp.prototype.toString = function() {
   return this.name;
};

ShortCircuitOp.prototype.compile = function(vm, exp, code) {
   var jumpOp = new JumpIns((this.name == "&&") ? "jumpf" : "jumpt");
   vm.compile(exp[1], code);
   code.push(new DupIns());
   code.push(jumpOp);
   code.push(new PopIns());
   vm.compile(exp[2], code);
   jumpOp.setTarget(code.length);
};

function QuestionMarkColonOp() {
   this.name = "?:";
}

QuestionMarkColonOp.prototype.toString = function() {
   return name;
};

QuestionMarkColonOp.prototype.compile = function(vm, exp, code) {
   var jump1 = new JumpIns("jumpf");
   var jump2 = new JumpIns("jump");
   vm.compile(exp[1], code);
   code.push(jump1);
   vm.compile(exp[2], code);
   code.push(jump2);
   jump1.setTarget(code.length);
   vm.compile(exp[3], code);
   jump2.setTarget(code.length);
};
