import useHttp from '../hooks/http.hook';

import { random } from './functions';

const useMarvelService = () => {
	const { loading, error, request } = useHttp();

	const _apiKey = 'apikey=80d1823509a50e401b71216ea4fb0330';
	const _baseUrl = `https://gateway.marvel.com:443/v1/public/`;

	const charsAmount = 1561;
	const comicsAmount = 51833;

	const getDataById = async ({ id, dataName, transformFunc }) =>
		await request(`${_baseUrl}${dataName}/${id}?${_apiKey}`).then(res =>
			transformFunc(res.data.results[0])
		);

	const getCharacter = async id =>
		await getDataById({
			id,
			dataName: 'characters',
			transformFunc: _transformCharacterData,
		});

	const getCharacterByName = async name =>
		await request(`${_baseUrl}characters?name=${name}&${_apiKey}`).then(
			res => {
				if (res.data.results.length)
					return _transformCharacterData(res.data.results[0]);
				return null;
			}
		);

	const getComic = async id =>
		await getDataById({
			id,
			dataName: 'comics',
			transformFunc: _transformComicData,
		});

	const getMultipleData = async ({
		dataName,
		amount,
		allAmount,
		transformFunc,
	}) => {
		const randomOffset = random({ end: allAmount });
		return await request(
			`${_baseUrl}${dataName}?limit=${amount}&offset=${randomOffset}&${_apiKey}`
		).then(res => res.data.results.map(transformFunc));
	};

	const getComics = async (amount = 8) =>
		await getMultipleData({
			dataName: 'comics',
			amount,
			allAmount: comicsAmount,
			transformFunc: _transformComicData,
		});

	const getCharacters = async (amount = 9) =>
		await getMultipleData({
			dataName: 'characters',
			amount,
			allAmount: charsAmount,
			transformFunc: _transformCharacterData,
		});

	const getRandomCharacter = async () =>
		await getCharacters(1).then(chars => chars[0]);

	const _transformCharacterData = ({
		id,
		name,
		description,
		thumbnail: { path, extension },
		urls,
		comics,
	}) => {
		description = description.includes('</p>')
			? description.slice(16, -4)
			: description || `At the moment there's no description about ${name}`;

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

	const _transformComicData = ({
		id,
		title,
		description,
		pageCount,
		thumbnail: { path, extension },
		textObjects,
		prices,
	}) => ({
		id,
		title,
		description:
			description || `At the moment there's no description about ${title}`,
		pageCount: pageCount
			? pageCount + ' pages'
			: "At the moment there's no info about number of pages",
		thumbnail: `${path}.${extension}`,
		language: textObjects.length
			? textObjects[0]?.language || 'en-us'
			: 'en-us',
		price: prices.length
			? prices[0].price
				? `$ ${prices[0].price}`
				: 'the price is not available'
			: 'the price is not available',
	});

	return {
		loading,
		error,
		getCharacter,
		getCharacters,
		getRandomCharacter,
		getComics,
		getComic,
		getCharacterByName,
	};
};

export default useMarvelService;
