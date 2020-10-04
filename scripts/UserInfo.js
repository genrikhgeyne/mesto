class UserInfo {
  constructor(nameValue, aboutValue) {
    this.name = nameValue.textContent;
    this.about = aboutValue.textContent;
  }
  updateUserInfo(nameValue, aboutValue) {
    this.name = nameValue.textContent;
    this.about = aboutValue.textContent;
  }
  setUserInfo(nameValue, aboutValue, name, about) {
    nameValue.textContent = name;
    aboutValue.textContent = about;
  }
  fillingFields(formElement) {
    formElement.form.elements.name.value = this.name;
    formElement.form.elements.about.value = this.about;
  }
}


