import React from "react";

function InfoTooltip(props) {
  return (
    <section
      className={`popup popup_type_${""}${props.isOpen ? " popup_opend" : ""}`}
    >
      <div className={`popup__container popup__container_type_${"props.name"}`}>
        <button
          type="button"
          onClick={props.onClose}
          className={`popup__close-button popup__close-button_type_${"props.name"}`}
        ></button>
        <div
          className={`popup__status-image popup__status-image_type_${props.status}`}
        />
        <h2 className="popup__title popup__title_type_register-message">
          {props.registerMessage}
        </h2>
      </div>
    </section>
  );
}
export default InfoTooltip;
