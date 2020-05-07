const sendForm = () => {
  const errorMessage = 'Что то пошло не так...';
  const loadMessage = 'Загрузка...';
  const successMessage = 'Спасибо! Мы с вами свяжемся!';

  const bodyHtml = document.querySelector('body');
  const forms = document.querySelectorAll('form');
  const statusMessage = document.createElement('div');
        statusMessage.classList.add('status-message');

  const loader = () => {
    return (`<style>
              .preloader__container {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                width: 100%;
                overflow: hidden;
                animation-delay: 1s;
                background-color: rgba(0,0,0,0.33);
                
                position: fixed;
                left: 0;
                top: 0;
                    z-index: 999999;
              }

              .item-1 {
                width: 20px;
                height: 20px;
                background: #f583a1;
                border-radius: 50%;

                margin: 7px;
                display: flex;
                justify-content: center;
                align-items: center;
              }
              @keyframes scale {
                0% {
                  transform: scale(1);
                }
                50%,
                  75% {
                  transform: scale(2.5);
                }
                78%, 100% {
                  opacity: 0;
                }
              }
              .item-1:before {
                content: '';
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background-color: #eed968;
                opacity: 0.7;
                animation: scale 2s infinite cubic-bezier(0, 0, 0.49, 1.02);
                animation-delay: 200ms;
                transition: 0.5s all ease;
                transform: scale(1);
              }

              .item-2 {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background-color: #eece68;
                margin: 7px;
                display: flex;
                justify-content: center;
                align-items: center;
              }
              @keyframes scale {
                0% {
                  transform: scale(1);
                }
                50%,
                  75% {
                  transform: scale(2.5);
                }
                78%, 100% {
                  opacity: 0;
                }
              }
              .item-2:before {
                content: '';
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background-color: #eece68;
                opacity: 0.7;
                animation: scale 2s infinite cubic-bezier(0, 0, 0.49, 1.02);
                animation-delay: 400ms;
                transition: 0.5s all ease;
                transform: scale(1);
              }

              .item-3 {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background-color: #eec368;
                margin: 7px;
                display: flex;
                justify-content: center;
                align-items: center;
              }
              @keyframes scale {
                0% {
                  transform: scale(1);
                }
                50%,
                  75% {
                  transform: scale(2.5);
                }
                78%, 100% {
                  opacity: 0;
                }
              }
              .item-3:before {
                content: '';
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background-color: #eec368;
                opacity: 0.7;
                animation: scale 2s infinite cubic-bezier(0, 0, 0.49, 1.02);
                animation-delay: 600ms;
                transition: 0.5s all ease;
                transform: scale(1);
              }

              .item-4 {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background-color: #eead68;
                margin: 7px;
                display: flex;
                justify-content: center;
                align-items: center;
              }
              @keyframes scale {
                0% {
                  transform: scale(1);
                }
                50%,
                  75% {
                  transform: scale(2.5);
                }
                78%, 100% {
                  opacity: 0;
                }
              }
              .item-4:before {
                content: '';
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background-color: #eead68;
                opacity: 0.7;
                animation: scale 2s infinite cubic-bezier(0, 0, 0.49, 1.02);
                animation-delay: 800ms;
                transition: 0.5s all ease;
                transform: scale(1);
              }

              .item-5 {
                width: 20px;
                height: 20px;
                background: #f583a1;
                border-radius: 50%;
                background-color: #ee8c68;
                margin: 7px;
                display: flex;
                justify-content: center;
                align-items: center;
              }
              @keyframes scale {
                0% {
                  transform: scale(1);
                }
                50%,
                  75% {
                  transform: scale(2.5);
                }
                78%, 100% {
                  opacity: 0;
                }
              }
              .item-5:before {
                content: '';
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background-color: #ee8c68;
                opacity: 0.7;
                animation: scale 2s infinite cubic-bezier(0, 0, 0.49, 1.02);
                animation-delay: 1000ms;
                transition: 0.5s all ease;
                transform: scale(1);
              }

              </style>
              <div class="preloader">
                <div class="preloader__container">
                  <div class="item-1"></div>
                  <div class="item-2"></div>
                  <div class="item-3"></div>
                  <div class="item-4"></div>
                  <div class="item-5"></div>
                </div>
              </div>`);
  };

  const removeStatusMessage = () => {
    const status = document.querySelector('.status-message');
    if (!status) return;
      setTimeout(() => {
      status.remove();
    }, 5000);
  };

  const errorInput = (inp, text) => {   
    let div = inp.parentNode; 
    div = div.querySelector('.input-error');
    if (div) { 
      return;   
    }
    let idTimer;
    const error = `
      <div class="input-error" style="color: red;">
      ${text}
      </div>
    `;
    inp.style.border = '2px solid red';
    inp.insertAdjacentHTML('beforebegin', error);
    const inputError = document.querySelector('.input-error');
    setTimeout(() => {
      inputError.remove();
      inp.removeAttribute('style');
    }, 5000);
  };

  const validateTel = (tel) => {
    let str = tel[0].value.replace('+', '').length;
    if (str < 8) {
      errorInput(tel[0], `Минимум 8 цифр`);
      return false;
    } else {
      return true;
    }

  };

  forms.forEach(form => {

    form.addEventListener('input', (evt) => {
      let target = evt.target;
      if (target.name === 'user_phone') {
        if (target.style) {
          target.style.border = 'none';
        }
        target.value = target.value.replace(/[^\+\d]/g, '');
        if (!/^\+?(\d){0,18}$/g.test(target.value)) {
          target.value = target.value.substring(0, target.value.length - 1);
        }

      }
      if (target.name === 'user_name' || target.name === 'user_message') {
        target.value = target.value.replace(/[^а-я ]/gi, '');
      }
    });

    const postData = (body) => {
      console.log('body: ', body);
      return fetch('./server.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
        mode: 'cors'
      }); 
    };

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const firmTel = [...event.target.elements].filter((item) => item.name === 'user_phone');
      if (!validateTel(firmTel)) {
        return;
      } 
      
      
      form.appendChild(statusMessage);
      statusMessage.style.cssText = `font-size: 2rem;
            color: #fff; `;
      const formData = new FormData(form);
      statusMessage.textContent = loadMessage;

      bodyHtml.insertAdjacentHTML(`beforeend`, loader());
      const loaderHtml = document.querySelector('.preloader');
    
      let body = {};
      for (let val of formData.entries()) {
        body[val[0]] = val[1];
      }

      const outputData = () => {
          statusMessage.style.cssText = `font-size: 2rem;
            color: green; `;
          removeStatusMessage();
          statusMessage.textContent = successMessage;
          form.reset();
          loaderHtml.remove();
      };

      const error = () => {
          statusMessage.style.cssText = `font-size: 2rem;
            color: red; `;
          removeStatusMessage();
          statusMessage.textContent = errorMessage;
          loaderHtml.remove();
      };
      

      postData(body)
        .then((response) => {
          if (response.status !== 200) {
              throw 'error !!! ';
          }          
          outputData();
        })
        .catch(error);

    });
  });


};

export default sendForm;