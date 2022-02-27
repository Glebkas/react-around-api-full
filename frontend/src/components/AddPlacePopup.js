import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlaceSubmit({
      name,
      link,
    });
  }

  return (
    <PopupWithForm
      name="add-place"
      title="New place"
      buttonCaption="Create"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="form__input"
        placeholder="Title"
        type="text"
        id="image-title"
        name="name"
        required
        minLength="1"
        maxLength="30"
        onChange={handleNameChange}
        value={name || ""}
      />
      <span id="image-title-error" className="form__error"></span>
      <input
        className="form__input"
        placeholder="Image link"
        type="url"
        id="image-url"
        name="link"
        onChange={handleLinkChange}
        value={link || ""}
        required
      />
      <span id="image-url-error" className="form__error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
