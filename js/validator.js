"use strict";

class Validator {
  constructor({selector, pattern = {}, method}) {
    this.form = document.querySelector(selector);
    this.pattern = pattern;
    this.method = method;
    this.elementsForm = [...this.form.elements].filter((el) => {
      return el.tagName.toLowerCase() !== 'button' && el.type !== 'button';
    });
    this.error = new Set();
  }

  init() {
    this.applyStyle();
    this.setPattern();
    this.elementsForm.forEach(el => el.addEventListener('change', this.chekIt.bind(this)));
    this.form.addEventListener('submit', e => {

      this.elementsForm.forEach(el => this.chekIt({target: el}));

      if (this.error.size) {
        e.preventDefault();
      }
    });
  }

  isValid(elem) {

    
    const validarotMetod = {
      notEmpty(elem) {
        if (elem.value.trim() === '') {
          return false;
        }
        return true;
      },
      pattern(elem, pattern) {
        return pattern.test(elem.value);
      },
    };

    console.log('elem: ', this.method[elem.id]);

    if (this.method) {
      const method = this.method[elem.id];
      if (method) {
        return method.every( item => validarotMetod[item[0]](elem, this.pattern[item[1]]));
      } else {
        console.log('передайте id полей');
      }
    }

    return true;
  }

  chekIt(event) {
    const target = event.target;
    if (this.isValid(target)) {
      this.showSuccess(target);
      this.error.delete(target);
    } else {
      this.showError(target);
      this.error.add(target);
    }
  }

  showError(elem) {
    elem.classList.remove('success');
    elem.classList.add('error');

    if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
      return;
    }

    const errorDiv = document.createElement('div');
    errorDiv.textContent = 'Ошибка в этом поле!';
    errorDiv.classList.add('validator-error');
    elem.insertAdjacentElement('afterend', errorDiv);
  }

  showSuccess(elem) {
    elem.classList.remove('error');
    elem.classList.add('success');

    if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
      elem.nextElementSibling.remove();
    }
  }

  applyStyle() {
    const style = document.createElement('style');
    style.textContent = `
      body form input.success {
        border: 2px solid green !important;
      }
      body form input.error {
        border: 2px solid red !important;
      }
      .validator-error {
        font-size: 14px;
        color: red;    
        z-index: 1;
        position: relative;

      }
    `;
    document.head.appendChild(style);
  }

  setPattern() {
    console.log(this);
    
    if (!this.pattern.name) {     
      this.pattern.name = /^[а-яА-Я]+$/i;
    }
    if (!this.pattern.message) {     
      this.pattern.message = /^[а-яА-Я ]+$/i;
    }
    if (!this.pattern.phone) {     
      this.pattern.phone = /^\+?[78]([-()]*\d){10}$/;
    }
    if (!this.pattern.email) {
      this.pattern.email = /^\w+@\w+\.\w{2,}$/;
    }   
  }
}
