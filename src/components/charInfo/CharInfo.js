import { useEffect, useState, memo } from 'react';
import propTypes from 'prop-types';

import { Spinner, ErrorMessage } from '../../generalComponents';
import Skeleton from '../skeleton/Skeleton';
import useMarvelService from '../../services/MarvelService';

import './charInfo.scss';
const CharInfo = memo(({ charId }) => {
	const [character, setCharacter] = useState(null);

	const { loading, error, getCharacter } = useMarvelService();

	const updateChar = () => {
		if (!charId) return;
		getCharacter(charId).then(
			({ name, description, thumbnail, homepage, wiki, comics }) => {
				setCharacter({
					name,
					description,
					thumbnail,
					homepage,
					wiki,
					comics,
				});
			}
		);
	};

	useEffect(updateChar, [charId]);

	let content = character ? (
		loading ? (
			<Spinner />
		) : (
			<CharInfoContent {...character} />
		)
	) : (
		<Skeleton />
	);

	return (
		<div className='char__info'>
			{content}
			{error ? <ErrorMessage /> : null}
		</div>
	);
});

const CharInfoContent = ({
	name,
	description,
	thumbnail,
	homepage,
	wiki,
	comics,
}) => {
	let imageClasses = 'char__basics-img';
	if (~thumbnail.search('image_not_available'))
		imageClasses += ' char__basics-img__nothing';

	const newComics = [];
	for (let i = 0; i < comics.length; i++) {
		newComics.push(comics[i]);
		if (i === 9) break;
	}

	return (
		<>
			<div className='char__basics'>
				<img src={thumbnail} alt={name} className={imageClasses} />
				<div>
					<div className='char__info-name'>{name}</div>
					<div className='char__btns'>
						<a
							target='_blank'
							rel='noreferrer'
							href={homepage}
							className='button button__main'
						>
							<div className='inner'>Homepage</div>
						</a>
						<a
							target='_blank'
							rel='noreferrer'
							href={wiki}
							className='button button__secondary'
						>
							<div className='inner'>Wiki</div>
						</a>
					</div>
				</div>
			</div>
			<div className='char__descr'>{description}</div>
			<div className='char__comics'>Comics:</div>
			<ul className='char__comics-list'>
				{newComics.length
					? newComics.map(({ name }, id) => (
							<li className='char__comics-item' key={id}>
								{name}
							</li>
					  ))
					: 'No comics yet'}
			</ul>
		</>
	);
};

CharInfo.propTypes = {
	charId: propTypes.number,
};

export default CharInfo;
