import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import Card from "./Card";
import Footer from "./Footer";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <main className="main">
        <section className="profile">
          <div className="profile__info">
            <div className="profile__img-container">
              <img
                id="profileImg"
                className="profile__img"
                alt="travaler profile"
                src={currentUser.avatar}
              />
              <button
                type="button"
                className="profile__img-edit-button"
                onClick={props.onEditAvatarClick}
              ></button>
            </div>
            <div className="profile__details">
              <div className="profile__details-top">
                <h1 className="profile__name">{currentUser.name}</h1>
                <button
                  type="button"
                  className="profile__edit-button"
                  onClick={props.onEditProfileClick}
                ></button>
              </div>
              <p className="profile__title">{currentUser.about}</p>
            </div>
          </div>

          <button
            type="button"
            className="profile__add-button"
            onClick={props.onAddPlaceClick}
          ></button>
        </section>
        <section className="cards">
          <div className="cards__list">
            {props.cards.map((card) => (
              <Card
                key={card["_id"]}
                card={card}
                onCardLike={props.onCardLike}
                onCardClick={props.onCardClick}
                onRemoveClick={props.onRemoveClick}
                onCardDelete={props.onCardDelete}
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Main;
