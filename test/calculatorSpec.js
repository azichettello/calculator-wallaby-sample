describe('calculator model', function() {

  beforeEach(function() {
    this.calculator = new Calculator();
  });

  it('should add numbers', function() {
    expect(this.calculator.add(2, 2)).toBe(4);
    expect(this.calculator.LastValue).toBe(4);
  });

  it('should save the result of add', function() {
    expect(this.calculator.add(2, 2)).toBe(4);
    expect(this.calculator.LastValue).toBe(4);
  });

  it('should throw error when dividing by zero', function() {
    var calculator = this.calculator;

    expect(function() {
      calculator.divide(1, 0);
    }).toThrow();
  });

  it('should divide number', function() {
    expect(this.calculator.divide(6, 2)).toBe(3);
  });

  it('should subtract positive numbers', function() {
    expect(this.calculator.subtract(4, 2)).toBe(2);
  });

  it('should multiply numbers', function() {
    expect(this.calculator.multiply(0, 3)).toBe(0);
    expect(this.calculator.multiply(3, 0)).toBe(0);
  });

  it('should raise to power of numbers', function() {
    expect(this.calculator.exponent(2, 3)).toBe(8);
    expect(this.calculator.exponent(0, 3)).toBe(0);
    expect(this.calculator.exponent(4, 0)).toBe(1);
    expect(this.calculator.exponent(3, -1)).toBe(1/3);

  });

  it('should yield square root', function() {
    expect(this.calculator.sqrt(16)).toBe(4);
  });

  it('should yield sine in radians', function() {
    expect(this.calculator.sin(Math.PI)).toBeGreaterThan(-.001);
    expect(this.calculator.sin(Math.PI)).toBeLessThan(.001);
  });

});

describe('calculator view', function() {

  beforeEach(function() {
    $('body').append("<div id=\"calculator\"/>");
    $('#calculator').html(calculatorTemplate);
    initCalculator();
  });

  afterEach(function() {
    $('#calculator').remove();
  });

  it('should add numbers', function() {

    console.log(window.document.body.clientHeight);

    $('#7').click();
    $('#plus').click();
    $('#9').click();
    $('#eval').click();

    expect($('.screen').text()).toBe('16');
  });

  it('should divide numbers', function() {
    $('#6').click();
    $('#divide').click();
    $('#3').click();
    $('#eval').click();

    expect($('.screen').text()).toBe('2');
  });

  it('should multiply numbers', function() {
    $('#7').click();
    $('#multiply').click();
    $('#8').click();
    $('#eval').click();

    expect($('.screen').text()).toBe('56');
  });

  it('should subtract numbers', function() {
    $('#7').click();
    $('#minus').click();
    $('#8').click();
    $('#eval').click();

    expect($('.screen').text()).toBe('-1');
  });
});
