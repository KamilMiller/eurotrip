// Constants.

const LINK_ACTIVE_CLASS = 'catalog__nav-item-name--active';
const TAB_ACTIVE_CLASS = 'catalog__description-item--active';
const mainMenu = document.querySelector('.main-nav');
const mainMenuItem = mainMenu.querySelectorAll('.main-nav__item');
const mainMenuButton = document.querySelector('.page-header__nav-toggle');
const catalogMenuItem = document.querySelectorAll('.catalog__nav-item-name');
const catalogLink = document.querySelectorAll('.catalog__item-link');
const catalogBuyButton = document.querySelectorAll('.catalog__description-button');
const countryTab = document.querySelectorAll('.catalog__description-item');
const modalOrder = document.querySelector('.modal-order');
const modalOrderCloseButton = modalOrder.querySelector('.modal-order__close');
const modalSuccesSubmit = document.querySelector('.modal-success-submit');
const modalSuccesSubmitButton = modalSuccesSubmit.querySelector('.modal-success-submit__close');
const priceCardBuyButton = document.querySelectorAll('.price__button');
const form = document.querySelectorAll('.form');

// Utils.

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

// Menu.

mainMenu.classList.remove('main-nav--nojs');
mainMenuButton.classList.remove('page-header__nav-toggle--nojs');


const closeMenu = () => {
  mainMenu.classList.remove('main-nav--js');
  mainMenuButton.classList.remove('page-header__nav-toggle--close');
};

const onMenuEscKeyDown = (evt) => {
  if (isEscEvent(evt)) {
    closeMenu();
    document.removeEventListener('keydown', onMenuEscKeyDown);
  }
};

mainMenuButton.addEventListener('click', () => {
  mainMenu.classList.toggle('main-nav--js');
  mainMenuButton.classList.toggle('page-header__nav-toggle--close');
  if (mainMenu.classList.contains('main-nav--js')) {
    document.addEventListener('keydown', onMenuEscKeyDown);
  } else {
    document.removeEventListener('keydown', onMenuEscKeyDown);
  }
});


mainMenuItem.forEach((element) => {
  element.addEventListener('click', closeMenu);
});

// Tab's switching.

const activeClassRemove = (collection, activeClass) => {
  collection.forEach((element) => {
    if (element.classList.contains(activeClass)) {
      element.classList.remove(activeClass);
    }
  });
};

const catalogMenuSwitch = (index) => {
  activeClassRemove(catalogMenuItem, LINK_ACTIVE_CLASS);
  activeClassRemove(countryTab, TAB_ACTIVE_CLASS);
  catalogMenuItem[index].classList.add(LINK_ACTIVE_CLASS);
  countryTab[index].classList.add(TAB_ACTIVE_CLASS);
};

catalogMenuItem.forEach((element, index) => {
  element.addEventListener('click', () => {
    catalogMenuSwitch(index);
  });
});

catalogLink.forEach((element, index) => {
  element.addEventListener('click', () => {
    catalogMenuSwitch(index);
  });
});

// Modals.

const openModalOrder = () => {
  modalOrder.classList.add('modal-order--show');
};

const closeModalOrder = () => {
  modalOrder.classList.remove('modal-order--show');
};

const onModalOrderEscKeyDown = (evt) => {
  if (isEscEvent(evt)) {
    closeModalOrder();
    document.removeEventListener('keydown', onModalOrderEscKeyDown);
  }
};

const onModalSuccessEscKeyDown = (evt) => {
  if (isEscEvent(evt)) {
    modalSuccesSubmit.classList.remove('modal-success-submit--show');
    document.removeEventListener('keydown', onModalOrderEscKeyDown);
  }
};

const onModalOrderCloseButtonClick = () => {
  closeModalOrder();
  document.removeEventListener('keydown', onModalOrderEscKeyDown);
};

const onSpaceAroundModalOrderClick = (evt) => {
  const target = evt.target;
  if (!target.closest('.modal-order__window')) {
    closeModalOrder();
    document.removeEventListener('keydown', onModalOrderEscKeyDown);
  }
};

const onSpaceAroundModalSuccessClick = (evt) => {
  const target = evt.target;
  if (!target.closest('.modal-success-submit__window')) {
    modalSuccesSubmit.classList.remove('modal-success-submit--show');
    document.removeEventListener('keydown', onModalSuccessEscKeyDown);
  }
};

const onBuyButtonsClick = (evt) => {
  evt.preventDefault();
  openModalOrder();
  document.addEventListener('keydown', onModalOrderEscKeyDown);
  modalOrderCloseButton.addEventListener('click', onModalOrderCloseButtonClick);
  modalOrder.addEventListener('click', onSpaceAroundModalOrderClick);
};

catalogBuyButton.forEach((element) => {
  element.addEventListener('click', (evt) => {
    onBuyButtonsClick(evt);
  });
});

priceCardBuyButton.forEach((element) => {
  element.addEventListener('click', (evt) => {
    onBuyButtonsClick(evt);
  });
});

// Form upload.

form.forEach((element) => {
  element.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (modalOrder.classList.contains('modal-order--show')) {
      closeModalOrder();
    }
    modalSuccesSubmit.classList.add('modal-success-submit--show');
    document.addEventListener('keydown', onModalSuccessEscKeyDown);
    modalSuccesSubmitButton.addEventListener('click', () => {
      modalSuccesSubmit.classList.remove('modal-success-submit--show');
    });
    modalSuccesSubmit.addEventListener('click', onSpaceAroundModalSuccessClick);
  });
});
