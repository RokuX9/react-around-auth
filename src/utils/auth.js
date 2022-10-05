import { authObject } from "./constants";

class Auth {
	constructor(options) {
		this.baseUrl = options.baseUrl;
		this.headers = options.headers;
	}

	_checkResponseStatus(res) {
		if (res.ok) {
			return res.json();
		} else {
			return Promise.reject(`Error stauts : ${res.status}`);
		}
	}

	register(data) {
		return fetch(`${this.baseUrl}/signup`, {
			method: "POST",
			headers: this.headers,
			body: JSON.stringify(data),
		}).then(this._checkResponseStatus);
	}

	login(data) {
		return fetch(`${this.baseUrl}/signin`, {
			method: "POST",
			headers: this.headers,
			body: JSON.stringify(data),
		}).then(this._checkResponseStatus);
	}

	checkTokenValidity(jwt) {
		return fetch(`${this.baseUrl}/users/me`, {
			method: "GET",
			headers: { ...this.headers, Authorization: `Bearer ${jwt}` },
		}).then(this._checkResponseStatus);
	}
}

export default new Auth(authObject);
