'use strict';

const body = document.querySelector('body');
function DomElement(selector, height, width, bg, fontSize, pos='static') {
  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
  this.position = pos;
}

function move(evt)  {
  const div = document.querySelector('.block');
  let left = parseInt(div.style.left);
  let top = parseInt(div.style.top);
  if (!isNaN(div.style.left)) {
    left = 0;
  } 
  if (!isNaN(div.style.top)) {
    top = 0;
  } 
  if (evt.keyCode === 37) {
    left += -10;
    div.style.left = left + 'px';  
  } else if (evt.keyCode === 38) {
    top += -10;
    div.style.top = top + 'px';
  } else if (evt.keyCode === 39) {
    left += +10;
    div.style.left = left + 'px';
  } else if (evt.keyCode === 40) {
    top += 10;
    div.style.top = top + 'px';
  }
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
    position: ${this.position};
  `;
  newElement.textContent = 'hi';
  body.append(newElement);
  document.addEventListener('keydown', move);
};

document.addEventListener('DOMContentLoaded', () => {
  let newDomSquare = new DomElement('.id', 100, 100, 'red', 30, 'absolute');
  newDomSquare.render();
});

