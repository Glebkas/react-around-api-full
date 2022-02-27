import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
  const [name, setName] = React.useState("");
  const [about, setAbout] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleAboutChange(e) {
    setAbout(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUserInfoUpdate({
      name,
      about: about,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm
      className="popup popup_type_edit-profile"
      name="edit-profile"
      title="Edit profile"
      buttonCaption="Save"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="form__input"
        placeholder="Name"
        type="text"
        id="profile-name"
        name="name"
        maxLength="40"
        minLength="2"
        onChange={handleNameChange}
        value={name || ""}
        required
      />
      <span id="profile-name-error" className="form__error"></span>
      <input
        className="form__input"
        placeholder="About me"
        type="text"
        id="profile-about-me"
        name="about"
        maxLength="200"
        minLength="2"
        onChange={handleAboutChange}
        value={about || ""}
        required
      />
      <span id="profile-about-me-error" className="form__error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
