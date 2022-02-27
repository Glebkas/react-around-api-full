import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({ avatar: avatarRef.current.value });
  }

  return (
    <PopupWithForm
      name="profile-img"
      title="Change profile image"
      buttonCaption="Save"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="form__input form__input_type_profile-img"
        placeholder="Image link"
        type="url"
        id="avatar-image-url"
        name="avatar"
        ref={avatarRef}
        required
      />
      <span
        id="avatar-image-url-error"
        className="form__error form__error_type_profile-img"
      ></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
