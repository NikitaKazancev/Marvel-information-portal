import { useEffect, useState } from 'react';
import propTypes from 'prop-types';

import Spinner from '../../generalComponents/spinner/Spinner';
import ErrorMessage from '../../generalComponents/errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './charList.scss';

const CharList = ({ setSelectedChar }) => {
	const [characters, setCharacters] = useState([]);

	const { loading, error, getCharacters } = useMarvelService();

	const getNewCharacters = () => {
		getCharacters().then(newCharacters =>
			setCharacters(characters => [
				...characters,
				...newCharacters.map(({ id, name, thumbnail }) => ({
					id,
					name,
					thumbnail,
				})),
			])
		);
	};

	useEffect(getNewCharacters, []);

	const itemsRefs = [];
	const setRef = elem => itemsRefs.push(elem);

	const onSelectedRef = i => {
		itemsRefs.forEach(elem => elem.classList.remove('char__item_selected'));
		itemsRefs[i].classList.add('char__item_selected');
		itemsRefs[i].focus();
	};

	return (
		<div className='char__list'>
			<ul className='char__grid'>
				{characters.map((char, i) => {
					const { id, ...data } = char;
					return (
						<CharListItem
							{...data}
							key={id}
							setRef={setRef}
							onSelectChar={() => {
								setSelectedChar(id);
								onSelectedRef(i);
							}}
						/>
					);
				})}
			</ul>
			{loading ? <Spinner /> : null}
			{error ? <ErrorMessage /> : null}
			<button
				disabled={loading}
				className='button button__main button__long'
				onClick={getNewCharacters}
			>
				<div className='inner'>load more</div>
			</button>
		</div>
	);
};

const CharListItem = ({ thumbnail, name, onSelectChar, setRef }) => {
	let imageClasses = 'char__item-img';
	if (~thumbnail.search('image_not_available'))
		imageClasses += ' char__item-img_nothing';

	return (
		<div
			ref={setRef}
			className='char__item'
			onClick={onSelectChar}
			tabIndex={0}
		>
			<img src={thumbnail} alt={name} className={imageClasses} />
			<div className='char__name'>{name}</div>
		</div>
	);
};

CharList.propTypes = {
	onSelectChar: propTypes.func,
};

export default CharList;
