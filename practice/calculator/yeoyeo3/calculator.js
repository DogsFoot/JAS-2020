class Calculator {
  constructor(calculatorEelment) {
		this.btn = {
      resetBtn : calculatorEelment.querySelector('[data-btn="reset"]'),
      operateBtns : calculatorEelment.querySelectorAll('[data-operator]'),
      equalBtn : calculatorEelment.querySelector('[data-btn="calculate"]'),
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
    this.btn.resetBtn.addEventListener('click', (e) => {
      this.reset();
    });
    this.btn.operateBtns.forEach( operateBtn => {
      operateBtn.addEventListener('click', (e) => {
        this.calc(e.target.getAttribute('data-operator'))
      })
    });
    this.btn.equalBtn.addEventListener('click', () => {
      this.calc('equal');
    });
    calculatorEelment.addEventListener('click', (e) => {
      if(this.data.numberInput) {
        const thisElement = e.target;
        if(thisElement.getAttribute('data-number')) {
          let number = thisElement.getAttribute('data-number');
          this.data.nowNumber = this.data.nowNumber + String(number);
          this.renderNumber();
        }
      }
    });
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

  calc(foo){
    switch (foo) {
      case 'division' :
        this.data.expression = '/';
        break;
      case 'times' :
        this.data.expression = '*';
        break;
      case 'minus' :
        this.data.expression = '-';
        break;
      case 'plus' :
        this.data.expression = '+';
        break;
      case 'equal' :
        break;
    }
    if(this.data.nowNumber && !this.data.beforeNumber){
      this.renderExpression();
      this.data.beforeNumber = this.data.nowNumber;
      this.data.nowNumber = '';
      this.data.beforeOperator = this.data.beforeNumber + this.data.expression ;
    }
    if(this.data.nowNumber && this.data.beforeNumber){
      this.renderExpression();
      this.data.beforeOperator = this.data.beforeOperator + this.data.nowNumber;
      //this.data.nowNumber = eval(this.data.beforeOperator + 0);
      this.data.nowNumber = String(eval(this.data.beforeOperator));
      this.data.beforeOperator = this.data.beforeOperator + this.data.expression;
      this.renderNumber();
      this.data.nowNumber = '';
    };
    console.table(this.data);
  }

  renderExpression(){
    this.ui.expressionElement.textContent = this.data.beforeOperator + this.data.nowNumber + this.data.expression ;
  }

  renderNumber(reset){
    if(reset){
      this.ui.resultElement.textContent = 0;
      return
    }
    this.ui.resultElement.textContent = this.data.nowNumber;
  }
}