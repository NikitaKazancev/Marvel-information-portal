import './charInfo.scss';
import { Fragment } from 'react/cjs/react.development';
import { Component } from 'react/cjs/react.production.min';
import Spinner from '../../generalComponents/spinner/Spinner';
import ErrorMessage from '../../generalComponents/errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import MarvelService from '../../services/MarvelService';

class CharInfo extends Component {
	marvelService = new MarvelService();

	state = {
		character: null,
		loading: false,
		error: false,
	};

	componentDidMount() {
		this.updateChar();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.charId !== this.props.charId) this.updateChar();
	}

	updateChar = () => {
		const { charId } = this.props;
		if (!charId) return;

		this.marvelService
			.getCharacter(charId)
			.then(({ name, description, thumbnail, homepage, wiki, comics }) =>
				this.setState({
					character: {
						name,
						description,
						thumbnail,
						homepage,
						wiki,
						comics,
					},
					loading: false,
					error: false,
				})
			)
			.catch(this.catchError);
	};

	catchError = () => {
		this.setState({ error: true, loading: false });
		this.props.onError();
	};

	render() {
		const { character, loading, error } = this.state;

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
	}
}

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
						<a href={homepage} className='button button__main'>
							<div className='inner'>Homepage</div>
						</a>
						<a href={wiki} className='button button__secondary'>
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

export default CharInfo;
