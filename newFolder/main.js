window.addEventListener("DOMContentLoaded", () => {

  const startBtn = document.querySelector('.start');
  const resetBtn = document.querySelector('.reset');
  const img = document.querySelector('img');

let flyInterval;
let count = 0;
let animateStart = false;

let start = function() {
  flyInterval = requestAnimationFrame(start);
    count++;
      if (count < 150) {
        img.style.left = count * 2 + 'px';
      } else {
        count = 0;
      }
};



resetBtn.addEventListener('click', () => {
  count = 0;
  animateStart = false;
  img.style.left = 0;
  cancelAnimationFrame(flyInterval);
});

  startBtn.addEventListener('click', function () {
    if (!animateStart) {
      animateStart = true;
      flyInterval = requestAnimationFrame(start);
    } else {
      animateStart = false;
      cancelAnimationFrame(flyInterval);
    }
    
  });
  

});
