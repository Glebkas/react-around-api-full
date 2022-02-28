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

  getHeader() {
    const token = localStorage.getItem('token');
    return {
        ...this._headers,
        Authorization: `Bearer ${token}`,
    }
}

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes/`, {
      method: `${isLiked ? "PUT" : "DELETE"}`,
      headers: this.getHeader(),
    }).then((res) => this._checkResponse(res));
  }

  getInitialProfile() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.getHeader(),
    }).then((res) => this._checkResponse(res));
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.getHeader(),
    }).then((res) => this._checkResponse(res));
  }

  changeProfileImg(avatar) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.getHeader(),
      body: JSON.stringify({ avatar: avatar }),
    }).then((res) => this._checkResponse(res));
  }

  postCard({ name, link }) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.getHeader(),
      body: JSON.stringify({ name, link }),
    }).then((res) => this._checkResponse(res));
  }

  patchProfileInfo({ name, about }) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.getHeader(),
      body: JSON.stringify({ name: name, about: about }),
    }).then((res) => this._checkResponse(res));
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.getHeader(),
    }).then((res) => this._checkResponse(res));
  }
}

const api = new Api({
  baseUrl: "https://api.glebkas.students.nomoreparties.sbs",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  },
});

export default api;
