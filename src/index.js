import Api from "../scripts/Api.js";
import Card from "../scripts/Card.js";
import CardList from "../scripts/CardList.js";
import Popup from "../scripts/Popup.js";
import UserInfo from "../scripts/UserInfo.js";
import FormValidator from "../scripts/FormValidator.js";

import "./style.css";

const serverUrl =process.env.NODE_ENV === 'development'? 'http://nomoreparties.co/cohort12' : 'https://nomoreparties.co/cohort12';

const popupAddContainer = document.querySelector('.popup-add');
const popupEditContainer = document.querySelector('.popup-edit');
const popupPhotoContainer = document.querySelector('.popup-photo');

const popupAdd = new Popup(popupAddContainer);
const popupEdit = new Popup(popupEditContainer);
const popupPhoto = new Popup(popupPhotoContainer);


const addButton = document.querySelector('.user-info__add-button');
const editButton = document.querySelector('.user-info__edit-button');

const closeButtonAdd = document.querySelector('.popup-add__close');
const closeButtonEdit = document.querySelector('.popup-edit__close');
const closeButtonPhoto = document.querySelector('.popup-photo__close');

const submitButtonAdd = document.querySelector('.popup__button_add');
const submitButtonEdit = document.querySelector('.popup__button_save');

const formAdd = new FormValidator(document.forms.new);
const formEdit = new FormValidator(document.forms.edit);

const nameForm = formEdit.form.elements.name;
const aboutForm = formEdit.form.elements.about;

const avatar = document.querySelector('.user-info__photo');

const placeList = document.querySelector('.places-list');

const createCard = (...args) => new Card(...args);

const cardList = new CardList (placeList, createCard);

const nameValue = document.querySelector('.user-info__name');
const aboutValue = document.querySelector('.user-info__job');

const userInfo = new UserInfo(nameValue, aboutValue);

const api = new Api();

function openPhoto(event) {
  if (event.target.classList.contains('place-card__image')) {
    const photo = document.querySelector('.popup__photo');
    photo.src= event.target.style.backgroundImage.split('"')[1];
    popupPhoto.open();
  }
}

api.methodApi(serverUrl+'/users/me', 'GET', {authorization: 'f3ff5620-355a-45ba-81b6-2c05840deeb1'})
  .then((result) => {
    nameValue.textContent = result.name;
    aboutValue.textContent = result.about;
    avatar.style.backgroundImage='url('+result.avatar+')';
  })
  .catch((err) => {
    console.log(err);
  });

api.methodApi(serverUrl+'/cards', 'GET', {authorization: 'f3ff5620-355a-45ba-81b6-2c05840deeb1'})
  .then((result) => {
    result.forEach((item)=> {
      cardList.addCard(item.name, item.link);
    })
  })
  .catch((err) => {
    console.log(err);
  });

addButton.addEventListener('click', () => {
  popupAdd.open();
  formAdd.disableSubmitButton(submitButtonAdd);
});

editButton.addEventListener('click', () => {
  popupEdit.open()
  formEdit.enableSubmitButton(submitButtonEdit);
  userInfo.updateUserInfo(nameValue, aboutValue);
  userInfo.fillingFields(formEdit);
});

placeList.addEventListener('click', openPhoto);

closeButtonAdd.addEventListener('click', () => {
  popupAdd.close();
  formAdd.resetForm();
});

closeButtonEdit.addEventListener('click', () => {
  popupEdit.close();
  formEdit.resetForm();
});

closeButtonPhoto.addEventListener('click', () => popupPhoto.close());

formAdd.form.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = formAdd.form.elements.name.value;
  const link = formAdd.form.elements.link.value;

  cardList.addCard(name, link);
  popupAdd.close();
});

formEdit.form.addEventListener('submit', (event => {
  event.preventDefault();

  api.methodApi(serverUrl+' /users/me', 'PATCH', {authorization: 'f3ff5620-355a-45ba-81b6-2c05840deeb1', 'Content-Type': 'application/json'}, JSON.stringify({name: nameForm.value, about: aboutForm.value}))
    .then((result) => {
      userInfo.setUserInfo(nameValue, aboutValue, result.name, result.about);
      popupEdit.close();
    })
    .catch((err) => {
      console.log(err);
    });

}));

formEdit.form.addEventListener('input', (event) => {
  formEdit.setEventListeners(event.target, submitButtonEdit);
});

formAdd.form.addEventListener('input', (event) => {
  formAdd.setEventListeners(event.target, submitButtonAdd);
});

