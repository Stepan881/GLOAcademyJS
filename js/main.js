'use strict';

window.addEventListener("DOMContentLoaded", () => {
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

});
