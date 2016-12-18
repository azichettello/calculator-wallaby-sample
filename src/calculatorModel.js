var Calculator = function() {
  if(!window.cachedAnswers) window.cachedAnswers = {}
  this.clear()
};

// Stateful functions
Calculator.prototype.clear = function() {
  this.operator = null
  this.headFinalized = false
  this.strings = {
    head: 0,
    tail: 0
  }
};

Calculator.prototype.getHead = function() {
  if(this.strings.head) return parseInt(this.strings.head)
  else return 0
}

Calculator.prototype.getTail = function() {
  if(this.strings.tail) return parseInt(this.strings.tail)
  else return 0
}

Calculator.prototype.setHead = function(head) {
  this.strings.head = JSON.stringify(head)
}

Calculator.prototype.addToHead = function(char) {
  this.strings.head += char
}

Calculator.prototype.addToTail = function(char) {
  this.strings.tail += char
}

Calculator.prototype.setTail = function(tail) {
  this.strings.tail = JSON.stringify(tail)
}

Calculator.prototype.setOperator = function(op) {
  this.operator = op
}

var operatorStringMap = {
  '+': 'add',
  '-': 'subtract',
  'x': 'multiply',
  '÷': 'divide'
}


// Stateless functions

Calculator.prototype.getOperator = function() {
  return operatorStringMap[this.operator]
}

Calculator.prototype.evalFromState = function() {
  return this.evaluate(
    this.getOperator(),
    [
      this.getHead(),
      this.getTail()
    ])
}

Calculator.prototype.evaluate = function(operation, arguments) {

  var numOfExpectedArguments = this[operation].length,
    numOfArguments = arguments.length,
    difference = numOfExpectedArguments - numOfArguments,
    answer = null,
    lastAnswer = this.getHead()

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
    arguments = [lastAnswer].concat(arguments)
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
  this.setHead(answer)
  return answer
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
  return first + second
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
