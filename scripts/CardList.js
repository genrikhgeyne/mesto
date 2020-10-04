class CardList {
  constructor(container, createCard) {
    this.container = container;
    this.createCard = createCard;
  }
  addCard(name, link) {
    const cardElement = this.createCard(name, link);
    this.container.appendChild(cardElement.create());
    cardElement.setEventListeners();
  }

  // render() {
  //   this.initialCards.forEach((item)=> {
  //     this.addCard(item.name, item.link);
  //   })
  // }
}
