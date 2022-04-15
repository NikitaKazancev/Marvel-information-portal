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

	getCharacter = async (id) => {
		return await this.getData(
			`${this._baseUrl}characters/${id}?${this._apiKey}`
		).then((res) => this._transformCharacterData(res.data.results[0]));
	};

	getAllCharacters = async (amount = 9) => {
		return await this.getData(
			`${this._baseUrl}characters?limit=${amount}&offset=200&${this._apiKey}`
		).then((res) => res.data.results.map(this._transformCharacterData));
	};

	_transformCharacterData = ({
		id,
		name,
		description,
		thumbnail: { path, extension },
		urls
	}) => ({
		id,
		name,
		description,
		thumbnail: `${path}.${extension}`,
		homepage: urls[0].url,
		wiki: urls[1].url
	});
}
