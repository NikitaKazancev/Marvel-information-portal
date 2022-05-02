import './singleChar.scss';

const SingleChar = ({ title, description, thumbnail }) => {
	return (
		<div className='single-page'>
			<img
				src={thumbnail}
				alt={title}
				className='single-page__img single-page__img_char'
			/>
			<div className='single-page__info'>
				<h2 className='single-page__name'>{title}</h2>
				<p className='single-page__descr'>{description}</p>
			</div>
		</div>
	);
};

export default SingleChar;
