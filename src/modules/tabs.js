const tabs = () => {
  const tabHeader = document.querySelector('.service-header');
  const tab = tabHeader.querySelectorAll('.service-header-tab');
  const tabContent = document.querySelectorAll('.service-tab');

  const ToggleTabContent = (index) => {
    for (let i = 0; i < tabContent.length; i++) {
      if (index === i) {
        tab[i].classList.add('active');
        tabContent[i].classList.remove('d-none');
      } else {
        tab[i].classList.remove('active');
        tabContent[i].classList.add('d-none');
      }
    }
  };

  tabHeader.addEventListener('click', (event) => {
    let target = event.target;
    target = target.closest('.service-header-tab');
      if (target.classList.contains('service-header-tab')) {
        tab.forEach((item, i) => {
          if (item === target) {
            ToggleTabContent(i);
          }
        });
      }
  });

};

export default tabs;