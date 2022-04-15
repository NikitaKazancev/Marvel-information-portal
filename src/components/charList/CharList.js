import { Component } from 'react/cjs/react.production.min';
import Spinner from '../../generalComponents/spinner/Spinner';
import ErrorMessage from '../../generalComponents/errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
import './charList.scss';

export default class CharList extends Component {
	marvelService = new MarvelService();

	state = {
		characters: [],
		loading: true,
		error: false
	};

	componentDidMount() {
		this.getNewCharacters();
	}

	getNewCharacters = () => {
		this.setState({ loading: true });

		this.marvelService
			.getAllCharacters(9)
			.then((characters) =>
				this.setState({
					characters: [
						...this.state.characters,
						...characters.map(({ id, name, thumbnail }) => ({
							id,
							name,
							thumbnail
						}))
					],
					error: false,
					loading: false
				})
			)
			.catch(this.onError);
	};

	onError = () => {
		this.setState({ error: true, loading: false });
		this.props.onError();
	};

	render() {
		const { characters, error, loading } = this.state;

		return (
			<div className='char__list'>
				<ul className='char__grid'>
					{characters.map((char) => {
						const { id, ...data } = char;
						return (
							<CharListItem
								{...data}
								key={id}
								onSelectChar={() => this.props.onSelectChar(id)}
							/>
						);
					})}
				</ul>
				{loading ? <Spinner /> : null}
				{error ? <ErrorMessage /> : null}
				<button
					className='button button__main button__long'
					onClick={this.getNewCharacters}>
					<div className='inner'>load more</div>
				</button>
			</div>
		);
	}
}

const CharListItem = ({ thumbnail, name, onSelectChar }) => {
	let imageClasses = 'char__item-img';
	if (~thumbnail.search('image_not_available'))
		imageClasses += ' char__item-img_nothing';

	return (
		<div className='char__item' onClick={onSelectChar}>
			<img src={thumbnail} alt={name} className={imageClasses} />
			<div className='char__name'>{name}</div>
		</div>
	);
};
