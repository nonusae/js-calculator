const calculator = document.querySelector('.calculator')
const display = calculator.querySelector('.calculator__display');
const keys = calculator.querySelector('.calculator__keys');

const calculate = (n1,operator, n2) => {
  let result = '';

  if (operator === 'add') {
    result = parseFloat(n1) + parseFloat(n2);
  } else if (operator === 'subtract') {
    result = parseFloat(n1) - parseFloat(n2);
  } else if (operator === 'multiply') {
    result = parseFloat(n1) * parseFloat(n2);
  } else if (operator === 'divide') {
    result = parseFloat(n1) / parseFloat(n2);
  }

  return result;
}

keys.addEventListener('click', e => {
  if (e.target.matches('button')) {
    const key = e.target
    const action = key.dataset.action
    const keyContent = key.textContent
    const displayNumber = display.textContent
    const previousKeyType = calculator.dataset.previousKeyType;

    // Number Keys
    if (!action){
      calculator.dataset.previousKeyType = 'number';

      if (
        displayNumber === '0' ||
        previousKeyType === 'operator' ||
        previousKeyType === 'calculate'
      ) {
        display.textContent = keyContent;
      } else {
        display.textContent = displayNumber + keyContent;
      }

      Array.from(key.parentNode.children)
        .forEach(k => k.classList.remove('is-depressed'));
    }

    if (action !== 'clear') {
      const clearButton = calculator.querySelector('[data-action=clear]');
      clearButton.textContent = 'CE';
    }
    if (
      action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide'
    ) {
      if ( previousKeyType === 'operator') {
      Array.from(key.parentNode.children)
        .forEach(k => k.classList.remove('is-depressed'));
      }
      const firstValue = calculator.dataset.firstValue
      const operator = calculator.dataset.operator
      const secondValue = displayNumber

      if (firstValue &&
          operator &&
          previousKeyType !== 'operator' &&
          previousKeyType !== 'calculate') {
        const calcValue = calculate(firstValue, operator, secondValue);
        display.textContent = calcValue;

        // Update calated value as firstValue
        calculator.dataset.firstValue = calcValue;
      } else {
        // If there are no calcualtions, set displayNumber as the firstValue
        calculator.dataset.firstValue = displayNumber;
      }

      key.classList.add('is-depressed');
      calculator.dataset.previousKeyType = 'operator';
      calculator.dataset.operator = action
    }

    if (action === 'decimal'){
      if (previousKeyType === 'operator') {
        display.textContent = '0.';
      } else if (!displayNumber.includes('.')) {
        display.textContent = displayNumber + '.';
      }

      calculator.dataset.previousKeyType = 'decimal';
    }

    if (action === 'clear'){
      if (key.textContent === 'AC'){
        calculator.dataset.firstValue = ''
        calculator.dataset.modValue = ''
        calculator.dataset.operator = ''
        calculator.dataset.previousKeyType = ''
      } else {
        key.textContent = 'AC';
      }
      display.textContent = '0'
      calculator.dataset.previousKeyType = 'clear';
    }

    if (action === 'calculate'){
      let firstValue = calculator.dataset.firstValue
      let secondValue = displayNumber
      const operator = calculator.dataset.operator

      if (firstValue){
        if (previousKeyType === "calculate") {
          firstValue = displayNumber
          secondValue = calculator.dataset.modValue
        }

        display.textContent = calculate(firstValue, operator, secondValue);
      }

      calculator.dataset.modValue = secondValue
      calculator.dataset.previousKeyType = 'calculate';
    }

  }
})