
class Popup {
  constructor(popupContainer) {
    this.popupContainer = popupContainer;

  }
  open() {
    this.popupContainer.classList.add('popup_is-opened');
  }


  close() {
    this.popupContainer.classList.remove('popup_is-opened');
  }
}