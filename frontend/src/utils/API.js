class API {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _handleSendingRequest(res) {
    if (res.ok) {
      return Promise.resolve(res.json());
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  async getRealUserInfo() {
    const response = await fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    });
    return this._handleSendingRequest(response);
  }

  async getInitialCards() {
    const response = await fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    });
    return this._handleSendingRequest(response);
  }

  async editProfileUserInfo(data) {
    const response = await fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
    return this._handleSendingRequest(response);
  }

  async addNewCard(data) {
    const response = await fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    });
    return this._handleSendingRequest(response);
  }

  async addLike(cardId) {
    const response = await fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
    return this._handleSendingRequest(response);
  }

  async removeCard(cardId) {
    const response = await fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
    return this._handleSendingRequest(response);
  }

  async removeLike(cardId) {
    const response = await fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
    return this._handleSendingRequest(response);
  }

  async updateProfileUserAvatar(data) {
    const response = await fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    });
    return this._handleSendingRequest(response);
  }
}

const api = new API({
  url: "localhost:3001",
  headers: {
    authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGE3NjZiMGYzNTA1YTg5NmI4YzU5ZDMiLCJpYXQiOjE2ODg2OTI1ODMsImV4cCI6MTY4OTI5NzM4M30.yzgJkhMpcI3mfO77ZibQj3WmrcCkJXRpyy2CqpclIGY",
    "Content-Type": "application/json",
  }
});

export default api;
