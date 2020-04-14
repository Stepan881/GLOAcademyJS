'use strict';

const body = document.querySelector('body');
function DomElement(selector, height, width, bg, fontSize) {
  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
}

DomElement.prototype.render = function() {
  let newElement;
  if (this.selector[0] === '.') {
    newElement = document.createElement('div');
    newElement.classList.add('block');
  } else if (this.selector[0] === '#') {
    newElement = document.createElement('p');
    newElement.classList.add('best');
  }

  newElement.style.cssText = `
    height:  ${this.height}px;
    width:  ${this.width}px;
    background:  ${this.bg};
    font-size:  ${this.fontSize}px;
  `;
  newElement.textContent = 'hi';
  body.append(newElement);
  console.log('newElement: ', newElement);
};

let newDomElements = new DomElement('.id', 100, 50, 'green', 30);
newDomElements.render();

let newDomElements2 = new DomElement('#id', 50, 50, 'yellow', 10);
newDomElements2.render();