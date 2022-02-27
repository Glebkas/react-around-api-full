import React from "react";

function PopupWithForm(props) {
  return (
    <section
      className={`popup popup_type_${props.name}${
        props.isOpen ? " popup_opend" : ""
      }`}
    >
      <div className="popup__container">
        <button
          type="button"
          className={`popup__close-button popup__close-button_${props.name}`}
          onClick={props.onClose}
        ></button>
        <h2 className="popup__title">{props.title}</h2>
        <form
          className={`form form_type_${props.name}`}
          name={props.name}
          onSubmit={props.onSubmit}
        >
          {props.children}
          <span id="image-url-error" className="form__error"></span>
          <button type="submit" className="form__submit">
            {props.buttonCaption}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
