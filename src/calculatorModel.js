var Calculator = function() {
  this.answer = 0
};

// Stateful functions
Calculator.prototype.clear = function() {
  return this.answer = 0
};

Calculator.prototype.evaluate = function(operation, arguments) {
  var numOfExpectedArguments = this[operation].length
  var numOfArguments = arguments.length
  var difference = numOfExpectedArguments - numOfArguments

  var answer

  // Error handling
  if(difference < 0)
    return "Expected " + -difference + " less argument(s)"

  else if(difference > 1)
    return "Expected " + difference + " more argument(s)"

  // Calculation is bound to be valid
  else if(difference === 0) {
    if (numOfExpectedArguments > 3) throw new Error("Check this")
    answer = this[operation](arguments[0], arguments[1], arguments[2])
  }

  else if(difference === 1) {
    if (numOfExpectedArguments > 2) throw new Error("Check this")
    answer = this[operation](this.answer, arguments[0], arguments[1], arguments[2])
  }

  // Future functionality?
  // using answer

  // Change state and return
  return this.answer = answer
};

// Stateless functions
Calculator.prototype.add = function(first, second) {
  return first + second
};

Calculator.prototype.multiply = function(a, b) {
  if (a === 0 || b === 0) {
    return 0;
  }
  return a * b
};

Calculator.prototype.subtract = function(a, b) {
  return a - b;
};

Calculator.prototype.divide = function(a, b) {
  if (b === 0) throw new Error('Attempt to divide by zero');
  return a / b;
}

Calculator.prototype.exponent = function(a, b) {
 return Math.pow(a,b);
};

Calculator.prototype.sqrt = function(a) {
 return Math.pow(a,1/2);
};

Calculator.prototype.sin = function(a) {
 return Math.sin(a);
};

Calculator.prototype.cubedRoot = function(a) {
 return this.exponent(1/3)
};
