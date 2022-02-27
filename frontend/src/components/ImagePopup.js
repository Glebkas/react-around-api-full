import React from "react";

function ImagePopup(props) {
  return (
    <section
      className={`popup popup_type_${props.name}${
        props.isOpen ? " popup_opend" : ""
      }`}
    >
      <div className={`popup__container popup__container_type_${props.name}`}>
        <button
          type="button"
          onClick={props.onClose}
          className={`popup__close-button popup__close-button_type_${props.name}`}
        ></button>
        <img
          className="popup__image"
          src={props.card.link}
          alt={props.card.name}
        />
        <h2 className={`popup__title popup__title_type_${props.name}`}>
          {props.card.name}
        </h2>
      </div>
    </section>
  );
}

export default ImagePopup;
