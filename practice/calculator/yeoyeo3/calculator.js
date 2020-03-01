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
    this.data = {
      numberInput : true,
      expression : '',
      beforeOperator : '',
      beforeNumber : '',
      nowNumber : '',
      result : 0,
    }
    this.init();
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
      }
    }
  }
  operate(){
    if(this.data.nowNumber){
      if(this.data.beforeNumber){
        console.log(this.data.beforeNumber + this.data.expression + this.data.nowNumber);
      }
      this.data.beforeNumber = this.data.nowNumber;
      this.data.nowNumber = '';
    }
  }
  reset(){
    let { numberInput, expression, beforeOperator, beforeNumber, nowNumber, result } = this.data;
    numberInput = true;
    expression = '';
    beforeOperator = '';
    beforeNumber = 0;
    nowNumber = '';
    result = 0;
  }
  division(){
    this.operate();
    this.data.expression = '/';
  }
  multiply(){
    this.operate();
    this.data.expression = '*';

  }
  minus(){
    this.operate();
    this.data.expression = '-';
    
  }
  plus(){
    this.operate();
    this.data.expression = '+';
    
  }
  equal(){
  }
  render(){

  }
}