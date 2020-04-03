// https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const Calculator = {
  status: 0, // 0: initial, 1: input, 2: operator, 3: done
  acc: 0,
  input: '',
  expr: [],
  lastOperand: 0,
  lastOperator: '',
  isPercentage: false,
  el: {
    input: [
      ...document.querySelectorAll('[data-number]'),
      document.querySelector('[data-symbol=dot]'),
      document.querySelector('[data-symbol=plusMinus]'),
    ],
    operator: [...document.querySelectorAll('[data-operator]')],
    calculate: document.querySelector('[data-btn=calculate]'),
    percent: document.querySelector('[data-symbol=percent]'),
    reset: document.querySelector('[data-btn=reset]'),
    screen: document.querySelector('[data-output=result]'),
    exprScreen: document.querySelector('[data-output=expression]'),
  },

  display(){
    const {screen,exprScreen} = this.el;
    screen.textContent = this.input ? numberWithCommas(this.input) : numberWithCommas(this.acc);
    exprScreen.textContent = this.expr.map(v => Math.sign(v) === -1 ? `(${v})` : v).join(' ');
  },

  calc(operator, v){
    let acc;
    switch(operator){
      case '+': acc = this.acc + v; break;
      case '-': acc = this.acc - v; break;
      case '×': acc = this.acc * v; break;
      case '÷': acc = this.acc / v; break;
    }
    return parseFloat(acc.toFixed(8));
  },

  inputHandler(e){
    if(Number.isNaN(this.acc) || this.status === 3) this.clearHandler();
    const v = e instanceof MouseEvent ? e.target.textContent : e.key;
    switch(v){
      case '.':
        if(this.input.includes('.')) return;
        this.input = this.input ? this.input + '.' : '0.';
      break;
      case '+/-':
        if(this.status === 0) return;
        this.input = this.input ? parseFloat(this.input) * -1 : this.acc * -1;
        this.input = this.input.toString();
      break;
      default: // 0~9
        if(this.input === '0') this.input = '';
        this.input += v;
    }
    this.display();
    this.status = 1;
  },
  
  operatorHandler(e){
    if(Number.isNaN(this.acc)) this.clearHandler();
    const v = this.input ? parseFloat(this.input) : this.acc;
    let operator;
    if(e instanceof MouseEvent) { 
      operator = e.target.textContent
    } else {
      switch(e.key) {
        case '*': operator = '×'; break;
        case '/': operator = '÷'; break;
        default: operator = e.key;
      }
    }
    switch(this.status) {
      case 0: return;
      case 1:
        if(this.isPercentage) {
          this.expr.push(operator);
          this.isPercentage = false;
        } else {
          this.expr.push(v, operator);
        }
        this.acc = this.lastOperator ? this.calc(this.lastOperator, v) : v;
      break;
      case 2:
      case 3:
        this.expr.pop();
        this.expr.push(operator);
    }
    this.lastOperator = operator;
    this.lastOperand = v;
    this.input = '';
    this.display();
    this.status = 2;
  },

  equalHandler(){
		let v = this.input ? parseFloat(this.input) : this.acc;
    switch(this.status) {
      case 0: return;
      case 1:
      case 2:
        if(this.isPercentage) {
          this.expr.push('=');
          this.isPercentage = false;
        } else {
          this.expr.push(v, '=');
        }
        this.acc = this.lastOperator ? this.calc(this.lastOperator, v) : v;
      break;
      case 3:
        if(!this.lastOperator) return;
        this.expr = [];
        this.expr.push(this.acc, this.lastOperator, this.lastOperand, '=');
        this.acc = this.calc(this.lastOperator, this.lastOperand);
        v = this.lastOperand;
    }
    this.lastOperand = v;
		this.input = '';
    this.display();
    this.status = 3;
  },

  percentHandler(){
    switch(this.status){
      case 0: return;
      case 1: if(!this.lastOperator) return this.clearHandler();
      case 2:
        this.input = this.input ? this.input/100 : this.acc/100;
      break;
      case 3: 
        if(!this.lastOperator) return this.clearHandler();
        this.input = this.acc/100;
        this.expr = [];
    }
    if(this.lastOperator === '+' || this.lastOperator === '-') this.input *= this.acc;
    if(this.isPercentage) this.expr.pop();
    this.expr.push(this.input);
    this.input = this.input.toString();
    this.display();
    this.isPercentage = true;
  },

  clearHandler(){
    this.status = 0;
    this.acc = 0;
    this.input = '';
    this.expr = [];
    this.lastOperand = null;
    this.lastOperator = '';
    this.isPercentage = false;
    this.display();
  },

  addEvents(){
    const {input,operator,percent,calculate,reset} = this.el;
    input.forEach(button => button.addEventListener('click', e => this.inputHandler(e)));
    operator.forEach(button => button.addEventListener('click', e => this.operatorHandler(e)));
    percent.addEventListener('click', () => this.percentHandler());
    calculate.addEventListener('click', () => this.equalHandler());
    reset.addEventListener('click', () => this.clearHandler());
    window.addEventListener('keydown', e => {
      switch(true){
        case ['0','1','2','3','4','5','6','7','8','9'].includes(e.key): this.inputHandler(e); break;
        case ['+','*','-','/'].includes(e.key): this.operatorHandler(e); break;
        case ['%'].includes(e.key): this.percentHandler(); break;
        case ['Enter','='].includes(e.key): this.equalHandler(); break;
        case ['Escape'].includes(e.key): this.clearHandler(); break;
      }
    })
  },

  init(){
    this.addEvents();
    this.clearHandler()
  }
};