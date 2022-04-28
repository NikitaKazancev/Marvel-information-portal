import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import { Spinner, ErrorMessage } from '../../generalComponents';

import './comicsList.scss';

const ComicsList = () => {
	const [comics, setComics] = useState([]);

	const { loading, error, getComics } = useMarvelService();

	const getNewComics = () => {
		getComics().then(newComics => {
			setComics(comics => [
				...comics,
				...newComics.map(({ thumbnail, title, price, id }) => ({
					thumbnail,
					title,
					price,
					id,
				})),
			]);
		});
	};

	useEffect(getNewComics, []);

	return (
		<div className='comics__list'>
			<ul className='comics__grid'>
				{comics.map((comic, i) => {
					return <Comic {...comic} key={i} />;
				})}
			</ul>
			{loading ? <Spinner /> : null}
			{error ? <ErrorMessage /> : null}
			<button
				className='button button__main button__long'
				onClick={getNewComics}
				disabled={loading}
			>
				<div className='inner'>load more</div>
			</button>
		</div>
	);
};

const Comic = ({ thumbnail, title, price, id }) => (
	<li className='comics__item'>
		<Link to={`/comics/${id}`}>
			<img src={thumbnail} alt={title} className='comics__item-img' />
			<div className='comics__item-name'>{title}</div>
			<div className='comics__item-price'>{price}</div>
		</Link>
	</li>
);

export default ComicsList;
