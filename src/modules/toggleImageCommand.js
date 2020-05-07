const toggleImageCommand = () => {
  const command = document.querySelectorAll('#command .row img');

  let url;
  command.forEach(el => {

    el.addEventListener('mouseenter', (evt) => {
      url = evt.target.src;
      let target = evt.target;
      target.src = target.getAttribute('data-img');
    });

    el.addEventListener('mouseout', (evt) => {
      let target = evt.target;
      target.src = url;
    });
  });
};

export default toggleImageCommand;