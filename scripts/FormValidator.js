class FormValidator {
  constructor(form) {
    this.form = form;
  }
  setError(input) {
    input.nextElementSibling.innerText = input.validationMessage;
  }
  checkInputValidity(input) {

    const validity = input.validity;


    if (validity.valueMissing) {
      input.setCustomValidity(`Это обязательное поле`);
      this.setError(input);
      return false;
    }

    if (validity.tooShort || validity.tooLong) {
      input.setCustomValidity(`Должно быть от ${input.getAttribute('minlength')} до ${input.getAttribute('maxlength')} символов`);
      this.setError(input);
      return false;
    }

    if (validity.patternMismatch && input.getAttribute('type') === 'url') {
      input.setCustomValidity(`Здесь должна быть ссылка`);
      this.setError(input);
      return false;
    }

    input.setCustomValidity('');
    this.setError(input);
  }
  setSubmitButtonState(button) {
    if (this.form.checkValidity()) {
      // console.log('nameValue');
      this.enableSubmitButton(button);
    } else {
      this.disableSubmitButton(button);
    }
  }
  setEventListeners(input, button) {
    this.checkInputValidity(input);
    this.setSubmitButtonState(button);
  }
  enableSubmitButton(button) {
    button.removeAttribute('disabled');
  }
  disableSubmitButton(button) {
    button.setAttribute('disabled', true);
  }

  resetForm() {

    const errors = Array.from(document.querySelectorAll('.error'));

    errors.forEach((item) => item.textContent = '');
    // console.log(formElement.error);
    this.form.reset();
  }
}
