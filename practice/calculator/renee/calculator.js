const calculator = {

  // DOM parsing
  elem: {
    number: document.querySelectorAll('[data-number]'),
		operator: document.querySelectorAll('[data-operator]'),
		calculate: document.querySelector('[data-btn=calculate]'),
		reset: document.querySelector('[data-btn=reset]'),
		expression: document.querySelector('[data-output=expression]'),
		result: document.querySelector('[data-output=result]')
  },
  
  data: {
    input: '',
    lastOperand: '', 
    operator: '',
    resultValue: ''
  },

  // 데이터 노출 
  resultData(value) {
		this.elem.result.textContent = value;
  },
  
  // 연산 수식 표시 노출
  resultExpression(operator) {
    const { input, resultValue } = this.data;

    switch(operator) {
      case 'plus': 
        operator = '+';
				break;
			case 'minus':
				operator = '-';
				break;
			case 'times':
				operator = '×';
				break;
			case 'division':
				operator = '÷';
				break;
			case 'result':
        operator = '=';
        break
    }

    if(!input) {
      this.elem.expression.textContent = resultValue + operator;
      return; 
    }
    
		this.elem.expression.textContent += Number(input) + operator;
		return;
  },

  // 숫자 버튼 핸들러
  numberButtonHandler(e) {
    const target = e.target;

    this.data.input += target.textContent;
    this.resultData(this.data.input);
  },

  // 연산 함수
  calculate(operator) {
    const { input, lastOperand, resultValue } = this.data;
    let beforeValue, currentValue;

    if(resultValue !== '') {
      beforeValue = resultValue;
      currentValue = input;
    } else {
      beforeValue = lastOperand;
      currentValue = input;
    }

    this.data.lastOperand = Number(this.data.input);

    switch(operator) {
      case '+': 
        this.data.resultValue = Number(beforeValue) + Number(currentValue);
        break;
			case '-':
        this.data.resultValue = Number(beforeValue) - Number(currentValue);
        break;
			case '×':
        this.data.resultValue = Number(beforeValue) * Number(currentValue);
				break;
			case '÷':
        this.data.resultValue = Number(beforeValue) / Number(currentValue);
				break;
    }
  },
  
  // 사칙연산처리 핸들러 (+ - % *)
  operatorButtonHandler(e) {
    const operator = e.target.textContent;
    const { input, lastOperand } = this.data;

    const lastOperator = this.data.operator;
    this.data.operator = operator;
    
    if(lastOperand !== '') {
      this.calculate(lastOperator);
    }

    this.data.lastOperand = Number(input);
    this.resultExpression(operator);
    this.resultData(this.data.lastOperand);
    this.data.input = '';
  },
  
  // 연산결과 핸들러 (=)
  calculateHandler() {
    const { operator } = this.data;
    this.resultExpression('result');
    this.calculate(operator);
    this.resultData(this.data.resultValue);
    this.data.input = '';
  },

  // reset 핸들러
  resetHandler() {
    this.data.input = '';
    this.data.lastOperand = '';
    this.data.operator = '';
    this.data.resultValue = '';

    this.elem.result.textContent = '0';
    this.elem.expression.textContent = '';
  },

  // 연산처리 계산
  addEventsElem() {
    const { number, operator, calculate, reset } = this.elem;
  
    // 숫자 버튼 클릭 시 
    number.forEach(numberButton => numberButton.addEventListener('click', e => this.numberButtonHandler(e)));

    // 연산 버튼 클릭 시 (+, -, *, %)
    operator.forEach(operatorButton => operatorButton.addEventListener('click', e => this.operatorButtonHandler(e)));

    // 연산 결과 버튼 클릭 시 (=)
    calculate.addEventListener('click', () => this.calculateHandler());

    // reset 버튼 클릭 시 (C)
    reset.addEventListener('click', () => this.resetHandler());
  },

  init() {
    this.addEventsElem();
  }
}

calculator.init();