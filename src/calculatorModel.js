var Calculator = function() {
  this.lastAnswer = 0
  if(!window.cachedAnswers) window.cachedAnswers = {}
};

// Stateful functions
Calculator.prototype.clear = function() {
  return this.lastAnswer = 0
};

Calculator.prototype.evaluate = function(operation, arguments) {

  var numOfExpectedArguments = this[operation].length,
    numOfArguments = arguments.length,
    difference = numOfExpectedArguments - numOfArguments,
    answer = null;
  
  // Error handling
  if(difference < 0)
    return "Expected " + -difference + " less argument(s)"

  else if(difference > 1)
    return "Expected " + difference + " more argument(s)"

  // Calculation is bound to be valid
  else if(difference === 0) {
    // arguments = arguments
  }

  else if(difference === 1) {
    arguments = [this.lastAnswer].concat(arguments)
  }

  var wasLastCached = true
  answer = getCached(operation, arguments, this[operation].reversible)
  if(!answer) {
    wasLastCached = false
    answer = this[operation].apply(this, arguments)
    putCached(operation, arguments, answer, this[operation].reversible)
  }

  // Change state and return
  this.wasLastCached = wasLastCached
  return this.lastAnswer = answer
};

function makeKey(operation, arguments){
  return operation + "," + arguments.join(',')
}

function getCached(operation, arguments, isReversible){
  var key = makeKey(operation, arguments)
  var keys = []
  keys.push(key)

  if(isReversible){
    keys.push(makeKey(operation, Object.create(arguments).reverse()))
  }

  var cachedVal
  keys.forEach(function(key){
    cachedVal = cachedAnswers[key]
  })

  if(cachedVal) return cachedVal
}

function putCached(operation, arguments, val, isReversible){
  var key = makeKey(operation, arguments)
  var keys = []
  keys.push(key)

  if(isReversible){
    keys.push(makeKey(operation, Object.create(arguments).reverse()))
  }
  keys.forEach(function(key){
    cachedAnswers[key] = val
  })
}

// Stateless functions
Calculator.prototype.add = function(first, second) {
  return first + second // eval("3+4")
};
Calculator.prototype.add.reversible = true

Calculator.prototype.multiply = function(a, b) {
  if (a === 0 || b === 0) {
    return 0;
  }
  return a * b
};
Calculator.prototype.multiply.reversible = true


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
