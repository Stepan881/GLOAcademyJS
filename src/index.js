'use strict';

import 'url-polyfill';
import "regenerator-runtime/runtime";
import 'element-remove';
import "@babel/polyfill";
import 'nodelist-foreach-polyfill';
import 'formdata-polyfill';
import 'element-closest';
import 'es6-promise';
// import 'fetch-polyfill';
import 'element-closest/browser';
import 'whatwg-fetch';
import "scroll-behavior-polyfill";

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import scrolHead from './modules/scrolHead';
import tabs from './modules/tabs';
import slider from './modules/slider';
import toggleImageCommand from './modules/toggleImageCommand';
import calculateCost from './modules/calculateCost';
import calc from './modules/calc';
import sendForm from './modules/sendForm';


  // таймер
  countTimer();
  // меню
  toggleMenu();
  // popup
  togglePopup();
  // Плавная прокрутка
  scrolHead();
  // табы
  tabs();
  // слайдер  portfolio-item-active
  slider();
  // переключение фотографий "Наша команда"
  toggleImageCommand();
  // Запрет ввода букв в "Рассчитать стоимость"
  calculateCost();
  // калькулятор
  calc(100);
  // Отправка формы
  sendForm();


