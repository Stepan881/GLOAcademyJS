const scrolling = (el) => {
  if (el.href === undefined) return;
  let link = el.href.split('#')[1];
  document.querySelector('#'+link).scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
};

export default scrolling;