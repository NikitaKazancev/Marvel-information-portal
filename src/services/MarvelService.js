export default class MarvelService {
	_apiKey = 'apikey=80d1823509a50e401b71216ea4fb0330';
	_baseUrl = `https://gateway.marvel.com:443/v1/public/`;
	maxId = 1011500;
	minId = 1010701;

	getData = async url => {
		const res = await fetch(url);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
		}

		return await res.json();
	};

	getCharacter = async id =>
		await this.getData(
			`${this._baseUrl}characters/${id}?${this._apiKey}`
		).then(res => this._transformCharacterData(res.data.results[0]));

	getCharacters = async (amount = 9) => {
		const {
			maxId,
			minId,
			getData,
			_baseUrl,
			_apiKey,
			_transformCharacterData,
		} = this;

		const randomOffset = Math.floor(Math.random() * (maxId - minId - amount));
		return await getData(
			`${_baseUrl}characters?limit=${amount}&offset=${randomOffset}&${_apiKey}`
		).then(res => res.data.results.map(_transformCharacterData));
	};

	getRandomCharacter = async () =>
		await this.getCharacter(
			Math.floor(Math.random() * (this.maxId - this.minId) + this.minId)
		);

	_transformCharacterData = ({
		id,
		name,
		description,
		thumbnail: { path, extension },
		urls,
		comics,
	}) => {
		if (description.includes('</p>')) description = description.slice(16, -4);
		else
			description =
				description || `At the moment there's no info about ${name}`;
		return {
			id,
			name,
			description,
			thumbnail: `${path}.${extension}`,
			homepage: urls[0].url,
			wiki: urls[1].url,
			comics: comics.items,
		};
	};
}

const marvelService = new MarvelService();
export { marvelService };
