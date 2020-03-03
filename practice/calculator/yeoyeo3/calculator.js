class Calculator {
  constructor(calculatorEelment) {
		this.btn = {
      resetBtn : calculatorEelment.querySelector('[data-btn="reset"]'),
      divisionBtn : calculatorEelment.querySelector('[data-operator="division"]'),
      multiplyBtn : calculatorEelment.querySelector('[data-operator="times"]'),
      minusBtn : calculatorEelment.querySelector('[data-operator="minus"]'),
      plusBtn : calculatorEelment.querySelector('[data-operator="plus"]'),
      equalBtn : calculatorEelment.querySelector('[data-btn="calculate"]'),
      //numberBtn : calculatorEelment.querySelectorAll('[data-number]')
    }
		this.ui = {
      resultElement : calculatorEelment.querySelector('.result'),
      expressionElement : calculatorEelment.querySelector('.mathematical-expression'),
    }
    this.data = {
    }
    this.init();
    this.reset();
  }
  init(){
    const {resetBtn, divisionBtn, multiplyBtn, minusBtn, plusBtn, equalBtn} = this.btn;
    resetBtn.addEventListener('click', (e) => {
      this.reset();
    });
    divisionBtn.addEventListener('click', (e) => {
      this.division();
    });
    multiplyBtn.addEventListener('click', (e) => {
      this.multiply();
    });
    minusBtn.addEventListener('click', (e) => {
      this.minus();
    });
    plusBtn.addEventListener('click', (e) => {
      this.plus();
    });
    equalBtn.addEventListener('click', (e) => {
      this.equal();
    });
    calculatorEelment.addEventListener('click', (e) => {
      this.number(e);
    });

  }
  number(e){
    if(this.data.numberInput) {
      const thisElement = e.target;
      if(thisElement.getAttribute('data-number')) {
        let number = thisElement.getAttribute('data-number');
        this.data.nowNumber = this.data.nowNumber + String(number);
        this.renderNumber();
      }
    }
  }
  operate(){
    if(this.data.nowNumber && !this.data.beforeNumber){
      this.renderExpression();
      this.data.beforeNumber = this.data.nowNumber;
      this.data.nowNumber = '';
      this.data.beforeOperator = this.data.beforeNumber + this.data.expression;
    }
    if(this.data.nowNumber && this.data.beforeNumber){
      this.renderExpression();
      this.data.beforeOperator = this.data.beforeOperator + this.data.nowNumber + this.data.expression;
      this.data.nowNumber = eval(this.data.beforeOperator + 0);
      this.renderNumber();
      this.data.nowNumber = '';
    }
  }
  calc(operator){
    console.log(operator);
  }
  reset(){
    this.data = {
      numberInput : true,
      expression : '',
      beforeOperator : '',
      beforeNumber : '',
      nowNumber : '',
      result : 0,
    }
    this.renderExpression();
    this.renderNumber('reset');
  }
  division(){
    this.data.expression = '/';
    this.operate();
  }
  multiply(){
    this.data.expression = '*';
    this.operate();
  }
  minus(){
    this.data.expression = '-';
    this.operate();
  }
  plus(){
    this.data.expression = '+';
    this.operate();
  }
  equal(){
  }
  renderExpression(){
    this.ui.expressionElement.textContent = this.data.beforeOperator+ this.data.nowNumber + this.data.expression ;
  }
  renderNumber(reset){
    if(reset){
      this.ui.resultElement.textContent = 0;
      return
    }
    this.ui.resultElement.textContent = this.data.nowNumber;
  }
}