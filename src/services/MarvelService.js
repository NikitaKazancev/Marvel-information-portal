export default class MarvelService {
	_apiKey = 'apikey=80d1823509a50e401b71216ea4fb0330';
	_baseUrl = `https://gateway.marvel.com:443/v1/public/`;

	getData = async (url) => {
		const res = await fetch(url);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
		}

		return await res.json();
	};

	getAllCharacters = async (amount) => {
		return await this.getData(
			`${this._baseUrl}characters?limit=${amount}&offset=200&${this._apiKey}`
		);
	};

	getCharacter = async (id) => {
		return await this.getData(`${this._baseUrl}characters/${id}?${this._apiKey}`);
	};
}
