import { Helmet } from 'react-helmet';

import './singleChar.scss';

const SingleChar = ({ name, description, thumbnail }) => {
	return (
		<div className='single-page'>
			<Helmet>
				<meta name='description' content={`Character ${name}`} />
				<title>{name}</title>
			</Helmet>
			<img
				src={thumbnail}
				alt={name}
				className='single-page__img single-page__img_char'
			/>
			<div className='single-page__info'>
				<h2 className='single-page__name'>{name}</h2>
				<p className='single-page__descr'>{description}</p>
			</div>
		</div>
	);
};

export default SingleChar;
