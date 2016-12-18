describe('calculator model', function() {

  beforeEach(function() {
    this.calculator = new Calculator();
    window.cachedAnswers = {}
  });

  it('utilizes a global wrapper around operations', function() {
    expect(this.calculator.evaluate('multiply', [3, 4]))
      .toBe(this.calculator.multiply(3, 4));

    expect(this.calculator.evaluate('sqrt', [9]))
      .toBe(this.calculator.sqrt(9));

    this.calculator.setHead(4)
    expect(this.calculator.evaluate('exponent', [2]))
      .toBe(this.calculator.exponent(4, 2));

  });

  it('throws error if given too many arguments', function() {
    expect(this.calculator.evaluate(
      'sqrt',
      [16, 1024]
    )).toBe("Expected 1 less argument(s)")
  });

  it('throws error if given too few arguments', function() {
    expect(this.calculator.evaluate(
      'multiply',
      []
    )).toBe("Expected 2 more argument(s)")
  });

  it('utilizes exact number of arguments', function() {
    expect(this.calculator.evaluate(
      'multiply',
      [2, 5]
    )).toBe(10)
  });

  it('keeps track of last answer', function() {
    expect(this.calculator.evaluate(
      'add',
      [2]
    )).toBe(2)

    expect(this.calculator.getHead()).toBe(2)
  });

  describe('utilizes one less argument than needed', function(){
    it('starting from answer = 0', function() {
      expect(this.calculator.evaluate(
        'multiply',
        [5]
      )).toBe(0)
    });

    it('after state change', function() {
      this.calculator.setHead(5)
      expect(this.calculator.evaluate(
        'multiply',
        [5]
      )).toBe(25)
    });
  })

  it('memoizes', function() {
    var calc = this.calculator
    calc.evaluate('add', [6, 2])
    calc.evaluate('add', [6, 2])
    expect(calc.wasLastCached).toBe(true)
    calc.evaluate('add', [6, 3])
    expect(calc.wasLastCached).toBe(false)
    calc.evaluate('add', [2, 6])
    expect(calc.wasLastCached).toBe(true)
    console.log(window.cachedAnswers)

  });

  it('stores reversible caching', function() {
    var calc = this.calculator
    calc.evaluate('add', [6, 2])
    expect(window.cachedAnswers['add,6,2']).toBe(8)
    expect(window.cachedAnswers['add,2,6']).toBe(8)

    calc.evaluate('sin', [0])
    expect(window.cachedAnswers['sin,0']).toBe(0)
    console.log(window.cachedAnswers)
  });

  it('stores irrational numbers', function() {
    var calc = this.calculator
    calc.evaluate('add', [1/7, 2])
    expect(window.cachedAnswers['add,' + 1/7 + ',2']).toBe(2 + 1/7)
    calc.evaluate('divide', [1, 7])
    expect(window.cachedAnswers['divide,1,7']).toBe(1/7)
  });

  it('handles two calculators', function() {

    var calc = this.calculator

    function doCalc1Add(){
      return calc.evaluate('add', [2, 4])
    }

    doCalc1Add()

    var calc2 = new Calculator()

    doCalc1Add()

    expect(calc.wasLastCached).toBe(true)
    expect(cachedAnswers['add,2,4']).toBeTruthy()
  });

});

describe('calculator view', function() {

  beforeEach(function() {
    $('body').append("<div id=\"calculator\"/>");
    $('#calculator').html(calculatorTemplate);
    this.calculator = initCalculator();
  });

  afterEach(function() {
    $('#calculator').remove();
  });

  it('should add numbers', function() {

    $('#7').click();
    $('#plus').click();
    expect($('.screen').text()).toBe('7');
    $('#9').click();
    expect($('.screen').text()).toBe('9');
    $('#eval').click();
    expect($('.screen').text()).toBe('16');
  });

  it('should add numbers with more than 1 digit', function() {
    $('#7').click();
    $('#7').click();
    $('#plus').click();
    $('#9').click();
    $('#eval').click();
    expect($('.screen').text()).toBe('86');
  });

  it('should add numbers with more than 1 digit', function() {
    $('#7').click();
    $('#7').click();
    $('#plus').click();
    $('#9').click();
    $('#eval').click();
    expect($('.screen').text()).toBe('86');
  });

  it('should clear and continue to work', function() {
    $('#7').click();
    $('#plus').click();
    $('#9').click();
    $('#eval').click();
    expect($('.screen').text()).toBe('16');
    this.calculator.clear()
    $('#7').click();
    $('#plus').click();
    $('#7').click();
    $('#eval').click();
    expect($('.screen').text()).toBe('14');
  });

  it('should be chainable', function() {
    $('#7').click();
    $('#plus').click();
    $('#9').click();
    $('#eval').click();
    expect($('.screen').text()).toBe('16');

    $('#plus').click();
    $('#7').click();
    $('#eval').click();

    expect($('.screen').text()).toBe('23');
  });

  // it('should assume zero when operator pressed requires 1 argument', function() {
  //   // never?
  //   $('#4').click();
  //   $('#plus').click();
  //   $('#sqrt').click();
  //   $('#eval').click();
  //   expect($('.screen').text()).toBe('2');
  // });

  // it('should divide numbers', function() {
  //   $('#6').click();
  //   $('#divide').click();
  //   $('#3').click();
  //   $('#eval').click();
  //
  //   expect($('.screen').text()).toBe('2');
  // });
  //
  // it('should multiply numbers', function() {
  //   $('#7').click();
  //   $('#multiply').click();
  //   $('#8').click();
  //   $('#eval').click();
  //
  //   expect($('.screen').text()).toBe('56');
  // });
  //
  // it('should subtract numbers', function() {
  //   $('#7').click();
  //   $('#minus').click();
  //   $('#8').click();
  //   $('#eval').click();
  //
  //   expect($('.screen').text()).toBe('-1');
  // });
});
