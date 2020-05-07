const calc = (price = 100) => {
  const calcBlock = document.querySelector('.calc-block');
  const calcType = document.querySelector('.calc-type');
  const calcSquare = document.querySelector('.calc-square');
  const calcCount = document.querySelector('.calc-count');
  const calcDay = document.querySelector('.calc-day');
  const totalValue = document.querySelector('#total');

  let intervlId;
  const renderTotal = (total) => {
    let startTotal = 0;

    clearInterval(intervlId);

    if (calcType.options[calcType.selectedIndex] === 0) {
      clearInterval(intervlId);
      startTotal = 0;
    }

    intervlId = setInterval(()=> {
      startTotal += total.toString().length;
      totalValue.textContent = Math.trunc(startTotal);
      if (startTotal >= total) {
        totalValue.textContent = Math.trunc(total);
        clearInterval(intervlId);
      }
    }, 10);
  };

  const countSum = () => {
    let total = 0;
    let countValue = 1;
    let dayValue = 1;
    const typeValue = calcType.options[calcType.selectedIndex].value;
    const squareValue = +calcSquare.value;

    if (calcCount.value > 1) {
      countValue += (calcCount.value - 1) / 10;
    }

    if (calcDay.value && calcDay.value < 5) {
      dayValue *= 2;
    } else if (calcDay.value && calcDay.value < 10) {
      dayValue *= 1.5;
    }

    if (typeValue && squareValue) {
      total = price * typeValue * squareValue * countValue * dayValue;

    }
    renderTotal(total);
  };



  calcBlock.addEventListener('change', (evt) => {
    const target = evt.target;

    if (target.matches('select') ||target.matches('input')) {
      countSum();
    }

  });
};


export default calc;