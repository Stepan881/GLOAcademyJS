const calculateCost = () => {
  const calculate = document.querySelector('#calc');
  calculate.addEventListener('keydown', (evt) => {

    let target = evt.target;

    if (/[^\d]/g.test(target.value) ||
      target.type !== 'number'||
      evt.keyCode > 100||
      evt.keyCode === 69) {evt.preventDefault();}

  });
};

export default calculateCost;