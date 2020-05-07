const slider = () => {
  const slide = document.querySelectorAll('.portfolio-item');
  const btn = document.querySelectorAll('.portfolio-btn');
  const dots = document.querySelector('.portfolio-dots');
  const slider = document.querySelector('.portfolio-content');

  for (let i = 0; i < slide.length; i++) {
    dots.insertAdjacentHTML('beforeend',
    `<li class="dot ${i === 0 ? 'dot-active' : ''}"></li>`);
  }
  const dot = document.querySelectorAll('.dot');

  let currentSlide = 0;
  let interval;
  const prewSlide = (elem, index, strClass) => {
    elem[index].classList.remove(strClass);
  };

  const nextSlide = (elem, index, strClass) => {
    elem[index].classList.add(strClass);
  };

  const autoPlaySlide = () => {

    prewSlide(slide, currentSlide, 'portfolio-item-active');
    prewSlide(dot, currentSlide, 'dot-active');

    currentSlide++;
    if (currentSlide >= slide.length) {
      currentSlide = 0;
    }
    nextSlide(slide, currentSlide, 'portfolio-item-active');
    nextSlide(dot, currentSlide, 'dot-active');
  };

  const startSlide = (time = 2000) => {
    interval = setInterval(autoPlaySlide, time);
  };

  const stopSlide = () => {
    clearInterval(interval);
  };

  slider.addEventListener('click', (evt) => {
    evt.preventDefault();
    let target = evt.target;

    if (!target.matches('.portfolio-btn, .dot')) {
      return;
    }
    prewSlide(slide, currentSlide, 'portfolio-item-active');
    prewSlide(dot, currentSlide, 'dot-active');

      if (target.matches('#arrow-right')) {
        currentSlide++;
      } else if (target.matches('#arrow-left')) {
        currentSlide--;
      } else if (target.matches('.dot')) {
        dot.forEach((elem, index) => {
          if (elem === target) {
            currentSlide = index;
          }
        });
      }
        if (currentSlide >= slide.length) {
          currentSlide = 0;
        }

        if (currentSlide < 0) {
          currentSlide = slide.length - 1;
        }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
  });

  slider.addEventListener('mouseover', (evt) => {
    if (evt.target.matches('.portfolio-btn') || evt.target.matches('.dot')) {
      stopSlide();
    }
  });

  slider.addEventListener('mouseout', (evt) => {
    if (evt.target.matches('.portfolio-btn') || evt.target.matches('.dot')) {
      startSlide();
    }
  });

  startSlide(2000);
};

export default slider;