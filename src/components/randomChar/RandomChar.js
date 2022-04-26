import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../../generalComponents/spinner/Spinner';
import RandomCharStatic from './randomCharStatic/RandomCharStatic';
import RandomCharBlock from './randomCharBlock/RandomCharBlock';
import ErrorMessage from '../../generalComponents/errorMessage/ErrorMessage';

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
