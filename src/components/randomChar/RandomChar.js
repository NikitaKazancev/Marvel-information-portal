import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import { Spinner, ErrorMessage } from '../../generalComponents';
import RandomCharStatic from './randomCharStatic/RandomCharStatic';
import RandomCharBlock from './randomCharBlock/RandomCharBlock';

import './randomChar.scss';

const RandomChar = () => {
	const { loading, error, getRandomCharacter } = useMarvelService();

	const [character, setCharacter] = useState({
		name: null,
		description: null,
		thumbnail: null,
		homepage: null,
		wiki: null,
	});

	const updateChar = () => {
		getRandomCharacter().then(
			({ name, description, thumbnail, homepage, wiki }) => {
				setCharacter({ name, description, thumbnail, homepage, wiki });
			}
		);
	};

	// eslint-disable-next-line
	useEffect(updateChar, []);

	const content = loading ? <Spinner /> : <RandomCharBlock {...character} />;

	return (
		<div className='randomchar'>
			{content}
			{error ? <ErrorMessage /> : null}
			<RandomCharStatic onUpdateChar={updateChar} />
		</div>
	);
};

export default RandomChar;
