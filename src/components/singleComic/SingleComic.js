import { Link } from 'react-router-dom';

const SingleComic = ({
	title,
	description,
	pageCount,
	thumbnail,
	language,
	price,
}) => {
	return (
		<div className='single-page'>
			<img src={thumbnail} alt={title} className='single-page__img' />
			<div className='single-page__info'>
				<h2 className='single-page__name'>{title}</h2>
				<p className='single-page__descr'>{description}</p>
				<p className='single-page__descr'>{pageCount}</p>
				<p className='single-page__descr'>Language: {language}</p>
				<div className='single-page__price'>$ {price}</div>
			</div>
			<Link to='/comics' className='single-page__back'>
				Back to all
			</Link>
		</div>
	);
};

export default SingleComic;
