import scrolling from './scrolling';


const scrolHead = () => {
  const btnScrolling = document.querySelector('a[href="#service-block"]');
  btnScrolling.addEventListener('click', (evt) => {
      evt.preventDefault();
      scrolling(btnScrolling);
  });
};

export default scrolHead;