class Card {
  constructor(name, link) {
    this.name = name;
    this.link = link;
  }
  like(event) {
    if (event.target.classList.contains('place-card__like-icon')) {
      event.target.classList.toggle('place-card__like-icon_liked');
    }
  }
  remove(event) {
    if (event.target.classList.contains('place-card__delete-icon')) {
      event.target.closest('.place-card').remove();
    }
  }
  create() {
    const placeCard = document.createElement('div');
    placeCard.classList.add('place-card');

    const placeCardImage = document.createElement('div');
    placeCardImage.classList.add('place-card__image');
    placeCardImage.style.backgroundImage='url('+this.link+')';

    const placeCardDelete = document.createElement('button');
    placeCardDelete.classList.add('place-card__delete-icon');
    placeCardImage.appendChild(placeCardDelete);

    const placeCardDescription = document.createElement('div');
    placeCardDescription.classList.add('place-card__description');

    const placeCardName = document.createElement('h3');
    placeCardName.classList.add('place-card__name');
    placeCardName.textContent = this.name;
    placeCardDescription.appendChild(placeCardName);

    const placeCardLike = document.createElement('button');
    placeCardLike.classList.add('place-card__like-icon');
    placeCardDescription.appendChild(placeCardLike);

    placeCard.appendChild(placeCardImage);
    placeCard.appendChild(placeCardDescription);

    this.cardElement = placeCard;

    return placeCard;
  }
  setEventListeners() {
    this
      .cardElement
      .querySelector('.place-card__like-icon')
      .addEventListener('click', this.like);

    this
      .cardElement
      .querySelector('.place-card__delete-icon')
      .addEventListener('click', this.remove);
  }
}
