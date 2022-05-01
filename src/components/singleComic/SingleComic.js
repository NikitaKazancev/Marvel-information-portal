import { useState, useEffect, lazy } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Spinner } from '../../generalComponents';

import useMarvelService from '../../services/MarvelService';

import './singleComic.scss';

const ErrorBlock = lazy(() => import('../../pages/errorBlock/ErrorBlock'));

const SingleComic = () => {
	const { comicId } = useParams();
	const { loading, error, getComic } = useMarvelService();
	const [comic, setComic] = useState(null);

	const getNewComic = () => {
		getComic(comicId).then(newComic => setComic(newComic));
	};

	useEffect(getNewComic, [comicId]);

	if (/\D/g.test(comicId)) return <ErrorBlock />;
	if (error)
		return (
			<ErrorBlock
				messages={{
					a: `SORRY, THERE'S NO COMIC WITH SUCH ID (${comicId.toUpperCase()})`,
					b: 'BACK TO ALL',
				}}
				to={'/comics'}
			/>
		);

	return loading ? <Spinner /> : <ComicContent {...comic} />;
};

const ComicContent = ({
	title,
	description,
	pageCount,
	thumbnail,
	language,
	price,
}) => {
	return (
		<div className='single-comic'>
			<img src={thumbnail} alt={title} className='single-comic__img' />
			<div className='single-comic__info'>
				<h2 className='single-comic__name'>{title}</h2>
				<p className='single-comic__descr'>{description}</p>
				<p className='single-comic__descr'>{pageCount}</p>
				<p className='single-comic__descr'>Language: {language}</p>
				<div className='single-comic__price'>$ {price}</div>
			</div>
			<Link to='/comics' className='single-comic__back'>
				Back to all
			</Link>
		</div>
	);
};

export default SingleComic;
