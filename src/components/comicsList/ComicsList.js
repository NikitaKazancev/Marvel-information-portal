import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../../generalComponents/spinner/Spinner';
import ErrorMessage from '../../generalComponents/errorMessage/ErrorMessage';

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
				{comics.map(({ id, ...data }) => {
					return <Comic {...data} key={id} />;
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

const Comic = ({ thumbnail, title, price }) => (
	<li className='comics__item'>
		<a href='#'>
			<img src={thumbnail} alt={title} className='comics__item-img' />
			<div className='comics__item-name'>{title}</div>
			<div className='comics__item-price'>{price}</div>
		</a>
	</li>
);

export default ComicsList;
