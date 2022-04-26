import { transformString } from '../../../services/functions';

const RandomCharBlock = ({ name, description, thumbnail, homepage, wiki }) => {
	let imageClasses = 'randomchar__img';
	if (thumbnail && thumbnail.includes('image_not_available'))
		imageClasses += ' randomchar__img_nothing';

	return (
		<div className='randomchar__block'>
			<img src={thumbnail} alt='Random character' className={imageClasses} />
			<div className='randomchar__info'>
				<p className='randomchar__name'>{name}</p>
				<p className='randomchar__descr'>{transformString(description)}</p>
				<div className='randomchar__btns'>
					<a
						href={homepage}
						target='_blank'
						rel='noreferrer'
						className='button button__main'
					>
						<div className='inner'>homepage</div>
					</a>
					<a
						href={wiki}
						target='_blank'
						rel='noreferrer'
						className='button button__secondary'
					>
						<div className='inner'>Wiki</div>
					</a>
				</div>
			</div>
		</div>
	);
};

export default RandomCharBlock;
