
import scrolling from './scrolling';


const toggleMenu = () => {
  const btnMenu = document.querySelector('.menu');
  const menu = document.querySelector('menu');

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

      let target = evt.target;

      if (target.closest('.menu') === null && target.closest('menu') === null) {
        menu.style.transform = `translate(-100%)`;
        return;
      }

      if (target.tagName === 'A' && target.className !== 'close-btn') {
        evt.preventDefault();
        scrolling(target);
      }

      if (!menu.style.transform || menu.style.transform === `translate(-100%)`){
        count = -100;
        animate();
      } else {
        if (target.tagName === 'A' || target.closest('.menu')) {
          menu.style.transform = `translate(-100%)`;
        }
      }
  };

  document.body.addEventListener('click', (event) => {
    handlerMenu(event);
  });
};

export default toggleMenu;