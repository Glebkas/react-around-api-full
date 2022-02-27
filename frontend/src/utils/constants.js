
//profile selectors
export const selectors = {
 profileName : document.querySelector(".profile__name"),
 profileEditBtn : document.querySelector(".profile__edit-button"),
 profileAddBtn : document.querySelector(".profile__add-button"),
 profileTitle : document.querySelector(".profile__title"),
 profileImgEditBtn : document.querySelector(".profile__img-edit-button"),
 editProfileImgForm : document.querySelector(".form_type_edit-img"),
//edit form selectors
 editForm : document.querySelector(".form_type_edit-profile"),
 nameInput : document.querySelector("#profile-name"),
 titleInput : document.querySelector("#profile-about-me"),

//delete popup selectors
 containerDeletePopupSelector : document.querySelector(".popup_type_delete"),
 deleteForm : document.querySelector(".form_type_delete"),
 deleteButton : document.querySelector(".form__submit_type_delete"),
 popup : document.querySelector(".popup"),
 openedPopup : document.querySelector('.popup_opend'),

//add form selectors
 addForm : document.querySelector(".form_type_add-place"),
 containerImagePopupSelector : ".popup_type_display-image",
 cardTemplateSelector : "#card-template",
 profileImg : document.querySelector(".profile__img"),
}

 export const settings = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  submitButton: "form__submit",
  inactiveButtonClass: "form__submit_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
};