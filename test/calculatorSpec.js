describe('calculator model', function() {

  beforeEach(function() {
    this.calculator = new Calculator();
  });

  // it('should utilize a global wrapper around operations', function() {
  //   expect(this.calculator.evaluate('multiply', [3, 4]))
  //     .toBe(this.calculator.multiply(3, 3));
  //   expect(this.calculator.evaluate('add', [3, 4]))
  //     .toBe(this.calculator.multiply(3, 3));
  //   expect(this.calculator.evaluate('add', [3]))
  //     .toBe(this.calculator.multiply(3, 3));
  // });

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

    expect(this.calculator.answer).toBe(2)
  });

  describe('utilizes one less argument than needed', function(){
    it('starting from answer = 0', function() {
      console.log(this.calculator.answer)
      expect(this.calculator.evaluate(
        'multiply',
        [5]
      )).toBe(0)
    });

    it('after state change', function() {
      this.calculator.answer = 5
      expect(this.calculator.evaluate(
        'multiply',
        [5]
      )).toBe(25)
    });
  })

  // it('should add numbers', function() {
  //   expect(this.calculator.add(2, 2)).toBe(4);
  //   expect(this.calculator.answer).toBe(4);
  // });
  //
  // it('should save the result of add', function() {
  //   expect(this.calculator.add(2, 2)).toBe(4);
  //   expect(this.calculator.answer).toBe(4);
  // });
  //
  // it('should throw error when dividing by zero', function() {
  //   var calculator = this.calculator;
  //
  //   expect(function() {
  //     calculator.divide(1, 0);
  //   }).toThrow();
  // });
  //
  // it('should divide number', function() {
  //   expect(this.calculator.divide(6, 2)).toBe(3);
  // });
  //
  // it('should save after dividing number', function() {
  //   expect(this.calculator.divide(6, 2)).toBe(3);
  //   expect(this.calculator.answer).toBe(3);
  // });
  //
  // it('should subtract positive numbers', function() {
  //   expect(this.calculator.subtract(4, 2)).toBe(2);
  // });

  // it('should multiply numbers', function() {
  //   expect(this.calculator.multiply(0, 3)).toBe(0);
  //   expect(this.calculator.multiply(3, 0)).toBe(0);
  // });
  //
  // it('raises to power of numbers', function() {
  //   expect(this.calculator.exponent(2, 3)).toBe(8);
  //   expect(this.calculator.exponent(0, 3)).toBe(0);
  //   expect(this.calculator.exponent(4, 0)).toBe(1);
  //   expect(this.calculator.exponent(3, -1)).toBe(1/3);
  //
  // });

  // it('yields square root', function() {
  //   expect(this.calculator.sqrt(16)).toBe(4);
  // });


  // it('yields sine in radians', function() {
  //   expect(this.calculator.sin(Math.PI)).toBeGreaterThan(-.001);
  //   expect(this.calculator.sin(Math.PI)).toBeLessThan(.001);
  // });

});
//
// describe('calculator view', function() {
//
//   beforeEach(function() {
//     $('body').append("<div id=\"calculator\"/>");
//     $('#calculator').html(calculatorTemplate);
//     initCalculator();
//   });
//
//   afterEach(function() {
//     $('#calculator').remove();
//   });
//
//   it('should add numbers', function() {
//
//     console.log(window.document.body.clientHeight);
//
//     $('#7').click();
//     $('#plus').click();
//     $('#9').click();
//     $('#eval').click();
//
//     expect($('.screen').text()).toBe('16');
//   });
//
//   it('should divide numbers', function() {
//     $('#6').click();
//     $('#divide').click();
//     $('#3').click();
//     $('#eval').click();
//
//     expect($('.screen').text()).toBe('2');
//   });
//
//   it('should multiply numbers', function() {
//     $('#7').click();
//     $('#multiply').click();
//     $('#8').click();
//     $('#eval').click();
//
//     expect($('.screen').text()).toBe('56');
//   });
//
//   it('should subtract numbers', function() {
//     $('#7').click();
//     $('#minus').click();
//     $('#8').click();
//     $('#eval').click();
//
//     expect($('.screen').text()).toBe('-1');
//   });
// });
