import React from "react";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardRemoveButtonClassName = `card__remove-button ${
    isOwn ? "" : "card__remove-button_hide"
  }`;
  const cardLikeButtonClass = `card__like-button ${
    isLiked ? "card__like-button_on" : ""
  }`;

  const cardImage = props.card.link;
  const cardName = props.card.name;
  const likes = props.card.likes.length;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleRemoveClick() {
    props.onRemoveClick(props.card);
  }

  return (
    <li className="cards__list-item">
      <div className="card">
        <button
          onClick={handleRemoveClick}
          className={cardRemoveButtonClassName}
          type="button"
        ></button>
        <img
          className="card__image"
          onClick={handleClick}
          alt={cardName}
          src={cardImage}
        />
        <div className="card__description">
          <h2 className="card__title">{cardName}</h2>
          <div className="card__like-container">
            <button
              type="button"
              className={cardLikeButtonClass}
              onClick={handleLikeClick}
            ></button>
            <p className="card__like-counter">{likes}</p>
          </div>
        </div>
      </div>
    </li>
  );
}

export default Card;
