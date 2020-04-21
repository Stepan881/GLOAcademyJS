'use strict';

window.addEventListener("DOMContentLoaded", () => {
    // Плавная прокрутка
    const scrolling = (el) => {
      if (el.href === undefined) return;
      let link = el.href.split('#')[1];
      document.querySelector('#'+link).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    };

  // таймер
  function countTimer() {
    let timerHours = document.querySelector('#timer-hours');
    let timerMinutes = document.querySelector('#timer-minutes');
    let timerSeconds = document.querySelector('#timer-seconds');
    
    function getTimeRemaning(){
      let now = new Date();    
      let tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate()+1);
      let timeRemaining = (tomorrow - now) / 1000;

      let seconds = Math.floor(timeRemaining % 60);
      let minutes = Math.floor((timeRemaining / 60) % 60);
      let hours = Math.floor(timeRemaining / 60 / 60);
      return {timeRemaining, hours, minutes, seconds};
    }

    getTimeRemaning();
    function formatTime(data) {
      if (data < 10) {
        data = '0' + data;
      }
      return data;
    }

    setInterval( () => {    
      let timer = getTimeRemaning();
      timerHours.textContent = formatTime(timer.hours);
      timerMinutes.textContent = formatTime(timer.minutes);
      timerSeconds.textContent = formatTime(timer.seconds);
    }, 1000);

  }
  countTimer();


  // меню
  const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu');
    const menu = document.querySelector('menu');
    const closeBtn = document.querySelector('.close-btn');
    const menuItem = menu.querySelectorAll('ul>li');
    
    let count = -100;
    const animate = () => {
        if (document.documentElement.clientWidth < 768) {
            menu.style.transform = `translate(0)`;
            return;
        }
        let requestId = requestAnimationFrame(animate);
        count += 2;
        menu.style.transform = `translate(${count}%)`;
        if (count === 0) {
            cancelAnimationFrame(requestId);
        }
    };

    const handlerMenu = (evt) => {
        evt.preventDefault();
        if (evt.target.tagName === 'A' && evt.target.className !== 'close-btn') {
          scrolling(evt.target);
        }
        
        if (!menu.style.transform || menu.style.transform === `translate(-100%)`) {
          count = -100;
          animate();
        } else {
          if (evt.target.tagName === 'A') {
            menu.style.transform = `translate(-100%)`;
          }
        }  
    };

    btnMenu.addEventListener('click', handlerMenu);
    closeBtn.addEventListener('click', handlerMenu);

    menuItem.forEach(el => {
        el.addEventListener('click', handlerMenu);
    });

  };
  toggleMenu();
 

 // popup
  const togglePopup = () => {
    const popup = document.querySelector('.popup');
    const popupBtn = document.querySelectorAll('.popup-btn');
    const popupClose = document.querySelector('.popup-close');

    popupBtn.forEach(el => {
        el.addEventListener('click', () => {
            popup.style.display = 'block';
        });
    });

    popupClose.addEventListener('click', () => {
        popup.style.display = 'none';
    });
  };
  togglePopup();

  // Плавная прокрутка
  const scrolHead = () => {
    const btnScrolling = document.querySelector('a[href="#service-block"]');
    btnScrolling.addEventListener('click', (evt) => {
        evt.preventDefault();
        scrolling(btnScrolling);
    });
  };
  scrolHead();
});
