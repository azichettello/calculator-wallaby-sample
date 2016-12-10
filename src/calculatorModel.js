var Calculator = function() {
  this.LastValue = 5;
};

Calculator.prototype.add = function(a, b) {
  return this.LastValue = a + b;
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
