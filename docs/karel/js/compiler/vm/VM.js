/*
 * File: VM.js
 * -----------
 * This file implements a general virtual machine model.
 */

/*
 * Class: VM
 * ---------
 * The <code>VM</code> class defines a primitive virtual machine model
 * that can then be extended to include more features (as illustrated
 * by the <code>XVM</code> class, which implements arithmetic expressions).
 * Clients of a virtual machine typically define a set of functions,
 * each of which is associated with code arrays that run on a stack
 * machine.  This module is responsible both for compiling expression
 * trees produced by the expression parser and for executing the
 * instructions in the code arrays.
 */

/*
 * Constructor: VM
 * Usage: vm = new VM();
 * ---------------------
 * Creates a new virtual machine.
 */

function VM() {
   this.reset();
   this.globals = { };
   this.operators = { };
   this.functions = { };
}

/*
 * Method: run
 * Usage: result = vm.run(code);
 * -----------------------------
 * Executes the code array in the virtual machine.  When execution
 * falls off the end of the array or encounters a <code>return</code>
 * instruction, the <code>run</code> method returns the top value
 * on the operand stack.
 */

VM.prototype.run = function(code) {
   this.reset();
   this.call("<stmt>", code);
   while (this.cf != null) {
      this.step();
   }
   return this.operandStack.pop();
};

/*
 * Method: reset
 * Usage: vm.reset();
 * ------------------
 * Reinitializes the virtual machine by deleting any execution history.
 */

VM.prototype.reset = function() {
   this.operandStack = [ ];
   this.frameStack = [ ];
   this.cf = null;
};

/*
 * Method: compile
 * Usage: vm.compile(exp, code);
 * -----------------------------
 * Appends the code for the expression <code>exp</code> onto the
 * <code>code</code> array.
 */

VM.prototype.compile = function(exp, code) {
   if (exp instanceof Array) {
      var fn = exp[0]
      var op = this.operators[fn];
      console.log(fn)
      console.log(op)
      if (!op) throw new Error("Undefined operator \"" + fn + "\"");
      op.compile(this, exp, code);
   } else {
      switch (TokenScanner.getTokenType(exp)) {
       case TokenScanner.WORD:
         code.push(new LoadIns(exp));
         break;
       case TokenScanner.NUMBER:
         code.push(new PushIns(TokenScanner.getNumber(exp)));
         break;
       case TokenScanner.STRING:
         code.push(new PushIns(TokenScanner.getString(exp)));
         break;
      }
   }
};

VM.prototype.defineOperator = function(op) {
   this.operators[op.name] = op;
};

VM.prototype.push = function(value) {
   this.operandStack.push(value);
};

VM.prototype.pop = function() {
   if (this.operandStack.length == 0) {
      throw new Error("Internal error: Operand stack empty");
   }
   return this.operandStack.pop();
};

VM.prototype.top = function() {
   if (this.operandStack.length == 0) {
      throw new Error("Internal error: Operand stack empty");
   }
   return this.operandStack[this.operandStack.length - 1];
};

VM.prototype.call = function(name, code) {
   this.frameStack.push(this.cf);
   this.cf = new VMFrame(name, code);
   this.cf.scopeChain = new VMScope();
}

VM.prototype.ret = function() {
   this.cf = this.frameStack.pop();
}

VM.prototype.step = function() {
   if (this.cf == null) return;
   if (this.cf.pc < this.cf.code.length) {
      this.cf.code[this.cf.pc++].execute(this);
   } else {
      this.ret();
   }
};

VM.prototype.get = function(id) {
   var scope = this.cf.scopeChain;
   while (scope != null) {
      var value = scope.bindings[id];
      if (value !== undefined) return value;
      scope = scope.link;
   };
   return this.globals[id];
};

VM.prototype.set = function(id, value) {
   this.globals[id] = value;
};

VM.prototype.toString = function() {
   return typeof(this) + "(...)";
};

/*
 * Class: PushIns
 * Usage: new PushIns(value);
 * --------------------------
 * This instruction pushes the value on the operand stack.
 */

function PushIns(value) {
   this.value = value;
}

PushIns.prototype.toString = function() {
   return "push " + Parser.unparse(this.value);
};

PushIns.prototype.execute = function(vm) {
   vm.push(this.value);
};

/*
 * Class: PopIns
 * Usage: new PopIns();
 * --------------------
 * This instruction pops the top value from the operand stack.
 */

function PopIns() {
   /* Empty */
}

PopIns.prototype.toString = function() {
   return "pop";
};

PopIns.prototype.execute = function(vm) {
   vm.pop();
};

/*
 * Class: LoadIns
 * Usage: new LoadIns(variable);
 * -----------------------------
 * This instruction pushes the value of the specified variable on
 * the operand stack.
 */

function LoadIns(variable) {
   this.variable = variable;
}

LoadIns.prototype.toString = function() {
   return "load " + this.variable;
};

LoadIns.prototype.execute = function(vm) {
   vm.push(vm.get(this.variable));
};

/*
 * Class: StoreIns
 * Usage: new StoreIns(variable);
 * ------------------------------
 * This instruction stores the top value from the operand stack into
 * the specified variable in the current scope.  Note that this
 * operation keeps the value on the stack; that behavior matches
 * the treatment in most languages, even though it introduces an
 * asymmetry with respect to LoadOp.
 */

function StoreIns(variable) {
   this.variable = variable;
}

StoreIns.prototype.toString = function() {
   return "store " + this.variable;
};

StoreIns.prototype.execute = function(vm) {
   vm.set(this.variable, vm.top());
};

/*
 * Class: DupIns
 * Usage: new DupIns();
 * --------------------
 * This instruction duplicates the top value on the stack.
 */

function DupIns() {
   /* Empty */
}

DupIns.prototype.toString = function() {
   return "dup";
};

DupIns.prototype.execute = function(vm) {
   vm.push(vm.top());
};

/*
 * Class: JumpIns
 * Usage: new JumpIns(name);
 * -------------------------
 * This instruction creates a jump operator (jump, jumpt, jumpf) that
 * performs a jump in the code sequence.  The jump form is unconditional;
 * the jumpt and jumpf forms pop the top value from the operand
 * stack and jump to the target only if the value is true or false,
 * respectively.  The target address is ordinarily set later using
 * the setTarget method.
 */

function JumpIns(name, target) {
   this.name = name;
   this.target = target;
}

JumpIns.prototype.toString = function() {
   return this.name + " " + this.target;
};

JumpIns.prototype.execute = function(vm) {
   var cond = true;
   if (this.name == "jumpt" || this.name == "jumpf") {
      cond = !!vm.pop() == (this.name == "jumpt");
   }
   if (cond) vm.cf.pc = this.target;
};

JumpIns.prototype.setTarget = function(target) {
   this.target = target;
}

/*
 * Class: CallIns
 * Usage: new CallIns(fn);
 * -----------------------
 * This operator adds a new call frame to the execution stack for
 * the specified function.
 */

function CallIns(fn) {
   this.name = "call";
   this.fn = fn;
}

CallIns.prototype.toString = function() {
   return "call " + fn;
};

CallIns.prototype.compile = function(vm, exp, code) {
   var fn = exp[1];
   var nArgs = exp.length - 2;
   for (var i = 0; i < nArgs; i++) {
      vm.compile(exp[2 + i], code);
   }
   code.push(new PushIns(nArgs));
   code.push(new CallIns(fn));
};

/*
 * Class: ReturnIns
 * Usage: new ReturnIns();
 * -----------------------
 * This operator adds a new return instruction to the function.
 */

function ReturnIns() {
   this.name = "return";
}

ReturnIns.prototype.toString = function() {
   return this.name;
};

ReturnIns.prototype.compile = function(vm, exp, code) {
   if (exp.length > 1) vm.compile(exp[1], code);
   code.push(this);
};

ReturnIns.prototype.execute = function(vm) {
   vm.ret();
};

/*
 * Class: InfixOp
 * --------------
 * This class implements the standard binary operators that evaluate their
 * arguments.
 */

function InfixOp(name, fn) {
   this.name = name;
   this.fn = fn;
}

InfixOp.prototype.toString = function() {
   return this.name;
};

InfixOp.prototype.compile = function(vm, exp, code) {
   vm.compile(exp[1], code);
   vm.compile(exp[2], code);
   code.push(this);
};

InfixOp.prototype.execute = function(vm) {
   var rhs = vm.pop();
   var lhs = vm.pop();
   vm.push(this.fn(lhs, rhs));
};

/*
 * Class: PrefixOp
 * ---------------
 * This class implements a unary prefix operator that evaluates its argument.
 */

function PrefixOp(name, fn) {
   this.name = "pre" + name;
   this.fn = fn;
}

PrefixOp.prototype.toString = function() {
   return this.name;
};

PrefixOp.prototype.compile = function(vm, exp, code) {
   vm.compile(exp[1], code);
   code.push(this);
};

PrefixOp.prototype.execute = function(vm) {
   vm.push(this.fn(vm.pop()));
};

/*
 * Class: PostfixOp
 * ----------------
 * This class implements a unary postfix operator that evaluates its argument.
 */

function PostfixOp(name, fn) {
   this.name = "post" + name;
   this.fn = fn;
}

PostfixOp.prototype.toString = function() {
   return this.name;
};

PostfixOp.prototype.compile = function(vm, exp, code) {
   vm.compile(exp[1], code);
   code.push(this);
};

PostfixOp.prototype.execute = function(vm) {
   vm.push(this.fn(vm.pop()));
};

/*
 * Class: AssignOp
 * ---------------
 * This class implements the various shorthand assigment operators
 * that need to maintain the assignment target.
 */

function AssignOp(name, fn) {
   this.name = name;
   this.fn = fn;
}

AssignOp.prototype.toString = function() {
   return this.name;
};

AssignOp.prototype.compile = function(vm, exp, code) {
   if (this.fn) vm.compile(exp[1], code);
   vm.compile(exp[2], code);
   if (this.fn) code.push(this);
   code.push(new StoreIns(exp[1]));
};

AssignOp.prototype.execute = function(vm) {
   var rhs = vm.pop();
   var lhs = vm.pop();
   vm.push(this.fn(lhs, rhs));
};

function VMFrame(name, code) {
   this.name = name;
   this.code = code;
   this.pc = 0;
   this.scopeChain = null;
}

function VMScope() {
   this.bindings = { };
   this.link = null;
}
