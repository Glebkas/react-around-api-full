class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("Error");
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes/`, {
      method: `${isLiked ? "PUT" : "DELETE"}`,
      headers: this.headers,
    }).then((res) => this._checkResponse(res));
  }

  getInitialProfile() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    }).then((res) => this._checkResponse(res));
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
    }).then((res) => this._checkResponse(res));
  }

  changeProfileImg(avatar) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({ avatar: avatar }),
    }).then((res) => this._checkResponse(res));
  }

  postCard({ name, link }) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ name, link }),
    }).then((res) => this._checkResponse(res));
  }

  patchProfileInfo({ name, about }) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({ name: name, about: about }),
    }).then((res) => this._checkResponse(res));
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    }).then((res) => this._checkResponse(res));
  }
}

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-11",
  headers: {
    authorization: "34a96d6c-47dd-42d3-b220-f7d1e2e3c502",
    "Content-Type": "application/json",
  },
});

export default api;
