'use strict';

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const headerButton = document.querySelector('.header-button');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

<<<<<<< HEAD
=======

>>>>>>> lesson13
// 7) Дела из localStorage подгружаться должны автоматически при загрузки странице
let todoData = JSON.parse(localStorage.getItem('newTodo'));
if (todoData === null) {
  todoData = [];
} else {
  todoData = JSON.parse(localStorage.getItem('newTodo'));
}

const render = function() {
  todoList.textContent = '';
  todoCompleted.textContent = '';

  // 6) Сохранять данные о делах в localStorage (советую в виде массива)
  localStorage.setItem('newTodo', JSON.stringify(todoData));

  todoData.forEach(function(item) {
    const li = document.createElement('li');
    li.classList.add('todo-item');

    li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
    '<div class="todo-buttons">' +
      '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>' +
    '</div>';

    if (item.complited) {
      todoCompleted.append(li);
    } else {
    todoList.append(li);
    }

    const btnTodoComplete = li.querySelector('.todo-complete');
    btnTodoComplete.addEventListener('click', function() {      
      item.complited = !item.complited;
      render();
    });

    // // 5) Удаление дел на кнопку КОРЗИНА
    const todoRemove = li.querySelector('.todo-remove');
    todoRemove.addEventListener('click', function() {
      todoData.splice(item, 1);

      render();
    });
    
  });

  //4) Поле ввода после добавления дела должно очищаться
  headerInput.value = '';
};



todoControl.addEventListener('submit', function(event) {
  event.preventDefault();

  // 3) Пустые дела добавляться не должны
  if (headerInput.value === '') { return; }

  const newTodo = {
    value: headerInput.value,
    complited: false,
  };

  todoData.push(newTodo);
    //6) Сохранять данные о делах в localStorage (советую в виде массива)
  localStorage.setItem('newTodo', JSON.stringify(todoData));

  render();
});
render();
