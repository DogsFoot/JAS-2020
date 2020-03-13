const calculator = {
	domElement: {
		number: document.querySelectorAll('[data-number]'),
		operator: document.querySelectorAll('[data-operator]'),
		dot: document.querySelector('[data-symbol=dot]'),
		calculate: document.querySelector('[data-btn=calculate]'),
		reset: document.querySelector('[data-btn=reset]'),
		expression: document.querySelector('[data-output=expression]'),
		result: document.querySelector('[data-output=result]')
	},

	init() {
		const {domElement: {number, operator, dot, calculate, reset}} = this;

		number.forEach(numberButton => {
			numberButton.addEventListener('click', (e) => {
				this.numberButtonHandler(e);
				this.outputResult(this.data.input);
			});
		});

		operator.forEach(operatorButton => {
			operatorButton.addEventListener('click', () => {
				this.operatorButtonHandler(operatorButton.dataset.operator);
			});
		});
		
		calculate.addEventListener('click', () => {
			this.outputExpression('equal');
			this.calculateButtonHandler(this.data.operator);
			this.outputResult(this.data.result);
			console.table(this.data);
		});

		dot.addEventListener('click', () => {
			this.addDecimalPoint();
			this.outputResult(this.data.input);
		});

		reset.addEventListener('click', () => {
			this.reset();
		});
	},

	data: {
		operand: '',
		operator: '',
		input: '',
		accumulation: '',
		result: ''
	},

	//숫자버튼 클릭 시 함수
	numberButtonHandler(e) {
		const {data: {input, result}} = calculator;
		const target = e.target;

		if (result || result === 0) {
			calculator.reset();
		}
		
		if (input[0] === '0') {
			if (input[1] !== '.') {
				calculator.data.input = '';	
			}
		}
		calculator.data.input += target.textContent;
		console.table(calculator.data);
	},

	//연산버튼 클릭 시 함수
	operatorButtonHandler(inputOperator) {
		const {operand, input, accumulation, result} = this.data;
		const latestOperator = this.data.operator;
		
		this.data.operator = inputOperator;

		if (!input) {
			if (result) {
				this.data.operand = this.data.result;
			}

			if (!(operand || operand === 0)) {
				this.outputExpression(inputOperator);
				this.data.operand = Number(this.data.input);
				return;
			}

			this.outputExpression(inputOperator);
			this.data.result = '';
			return;
		}

		if ((operand || operand === 0) || accumulation || accumulation === 0) {
			this.outputExpression(inputOperator);
			this.data.accumulation = this.calculateButtonHandler(latestOperator);
			this.outputResult(this.data.accumulation);
			this.data.operand = this.data.accumulation;
			this.data.result = '';
			console.table(calculator.data);
			return;
		}

		this.data.operand = Number(input);
		this.outputExpression(inputOperator);
		this.outputResult(this.data.operand);
		this.data.input = '';
		console.table(calculator.data);
	},

	// 계산버튼 클릭 시 함수
	calculateButtonHandler(operator) {
		const {operand, input, accumulation, result} = this.data;
		let leftValue, rightValue;
		
		if (!operator) {
			if (!result) {
				this.data.operand = Number(this.data.input);
				this.data.result = Number(this.data.input);
				this.data.input = '';
			}

			return this.data.result;
		}

		if (result || result === 0) {
			console.log('마지막연산 재수행');
			leftValue = this.data.result;
			rightValue = operand;
		} else {
			if (!input) {
				if(accumulation || accumulation === 0) {
					leftValue = accumulation;
					rightValue = operand;
				} else if (operand || operand === 0) {
					leftValue = operand;
					rightValue = operand;
				}
			} else {
				if(accumulation || accumulation === 0) {
					leftValue = accumulation;
					rightValue = input;
				} else {
					leftValue = operand;
					rightValue = input;
				}

				this.data.operand = Number(this.data.input);
			}
		}
	
		switch (operator) {
			case 'plus':
				this.data.result = Number(leftValue) + Number(rightValue);
				break;
			case 'minus':
				this.data.result = Number(leftValue) - Number(rightValue);
				break;
			case 'times':
				this.data.result = Number(leftValue) * Number(rightValue);
				break;
			case 'division':
				this.data.result = Number(leftValue) / Number(rightValue);
				break;
		}

		this.data.accumulation = '';
		this.data.input = '';

		return this.data.result;
	},

	// 소수점 버튼 클릭 시 함수
	addDecimalPoint () {
		const {input, result} = this.data;

		if (result || result === 0) {
			this.reset();
		}

		if (input.indexOf('.') !== -1) {
			return;
		}
		
		if (!input) {
			this.data.input = '0.';
			return;
		}

		this.data.input += '.';
		console.table(this.data);
	},

	// 데이터 출력함수
	outputResult (data, round) {
		if (round) {
			this.domElement.result.textContent = Number(data).toFixed(round);
			return;
		}
		this.domElement.result.textContent = data;
	},

	// 수식 표현 함수
	outputExpression(expressionSymbol) {
		const latestExpression = this.domElement.expression.textContent;
		const {operand, input, operator, accumulation, result} = this.data;
		let operatorSymbol;

		switch (expressionSymbol) {
			case 'plus':
				expressionSymbol = '+';
				break;
			case 'minus':
				expressionSymbol = '-';
				break;
			case 'times':
				expressionSymbol = '×';
				break;
			case 'division':
				expressionSymbol = '÷';
				break;
			case 'equal':
				expressionSymbol = '=';

				if (!operator) {
					if (!input) {
						this.domElement.expression.textContent = Number(operand) + expressionSymbol;
						
					} else {
						this.domElement.expression.textContent = Number(input) + expressionSymbol;
					}
					return;
				}
				
				if (result || result === 0) {
					if (!operator) {
						return;
					}
					switch (operator) {
						case 'plus':
						operatorSymbol = '+';
						break;
					case 'minus':
						operatorSymbol = '-';
						break;
					case 'times':
						operatorSymbol = '×';
						break;
					case 'division':
						operatorSymbol = '÷';
						break;
					}
					this.domElement.expression.textContent = result + operatorSymbol + operand + expressionSymbol;
					return; 
				}

				if (!input) {
					if (accumulation || accumulation === 0) {
						this.domElement.expression.textContent += accumulation + expressionSymbol;
						return;
					}
					this.domElement.expression.textContent += operand + expressionSymbol;
					return;
				}

				this.domElement.expression.textContent += Number(input) + expressionSymbol;
				return;
		}

		if (!input) {
			if (!(operand || operand === 0)) {
				this.domElement.expression.textContent = Number(operand) + expressionSymbol;
				return;
			}
			if (latestExpression.substring(latestExpression.length - 1) !== expressionSymbol) {
				this.domElement.expression.textContent = latestExpression.slice(0,latestExpression.length - 1);
				this.domElement.expression.textContent += expressionSymbol;
			}

			if (result || result === 0) {
				this.domElement.expression.textContent = result + expressionSymbol;
			}
			return;
		}

		this.domElement.expression.textContent += Number(input) + expressionSymbol;
	},

	//초기화
	reset () {
		this.data.operand = '';
		this.data.operator = '';
		this.data.input = '';
		this.data.accumulation = '';
		this.data.result = '';
		this.domElement.expression.textContent = '';
		this.outputResult('0');
		console.log('reset Completed!');
	}
}

calculator.init();