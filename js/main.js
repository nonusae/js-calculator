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

    if (!action){
      calculator.dataset.previousKeyType = 'number';

      if (displayNumber === '0' || previousKeyType === 'operator') {
        display.textContent = keyContent;
      } else {
        display.textContent = displayNumber + keyContent;
      }

      Array.from(key.parentNode.children)
        .forEach(k => k.classList.remove('is-depressed'));
    }

    if (
      action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide'
    ) {
      key.classList.add('is-depressed')
      calculator.dataset.previousKeyType = 'operator';
      calculator.dataset.firstValue = displayNumber;
      calculator.dataset.operator = action

    }

    if (action === 'decimal'){
      display.textContent = displayNumber + '.'
      calculator.dataset.previousKeyType = 'decimal';
    }

    if (action === 'clear'){
      console.log('clear key!')
      calculator.dataset.previousKeyType = 'clear';
    }

    if (action === 'calculate'){
      calculator.dataset.previousKeyType = 'equal';
      const firstValue = calculator.dataset.firstValue
      const operator = calculator.dataset.operator
      const secondValue = displayNumber

      display.textContent = calculate(firstValue, operator, secondValue)
    }

  }
})