import { Component } from 'react/cjs/react.production.min';
import propTypes from 'prop-types';

import Spinner from '../../generalComponents/spinner/Spinner';
import ErrorMessage from '../../generalComponents/errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

import './charList.scss';

class CharList extends Component {
	marvelService = new MarvelService();

	state = {
		characters: [],
		loading: true,
		error: false,
	};

	componentDidMount() {
		this.getNewCharacters();
	}

	getNewCharacters = () => {
		this.setState({ loading: true });

		this.marvelService
			.getCharacters(9)
			.then(newCharacters =>
				this.setState(state => ({
					characters: [
						...state.characters,
						...newCharacters.map(({ id, name, thumbnail }) => ({
							id,
							name,
							thumbnail,
						})),
					],
					error: false,
					loading: false,
				}))
			)
			.catch(this.onError);
	};

	onError = () => {
		this.setState({ error: true, loading: false });
		this.props.onError();
	};

	itemsRefs = [];
	setRef = elem => this.itemsRefs.push(elem);

	onSelectedRef = i => {
		this.itemsRefs.forEach(elem =>
			elem.classList.remove('char__item_selected')
		);
		this.itemsRefs[i].classList.add('char__item_selected');
		this.itemsRefs[i].focus();
	};

	render() {
		const { characters, error, loading } = this.state;

		return (
			<div className='char__list'>
				<ul className='char__grid'>
					{characters.map((char, i) => {
						const { id, ...data } = char;
						return (
							<CharListItem
								{...data}
								key={id}
								setRef={this.setRef}
								onSelectChar={() => {
									this.props.onSelectChar(id);
									this.onSelectedRef(i);
								}}
							/>
						);
					})}
				</ul>
				{loading ? <Spinner /> : null}
				{error ? <ErrorMessage /> : null}
				<button
					disabled={loading}
					className='button button__main button__long'
					onClick={this.getNewCharacters}
				>
					<div className='inner'>load more</div>
				</button>
			</div>
		);
	}
}

const CharListItem = ({ thumbnail, name, onSelectChar, setRef }) => {
	let imageClasses = 'char__item-img';
	if (~thumbnail.search('image_not_available'))
		imageClasses += ' char__item-img_nothing';

	return (
		<div
			ref={setRef}
			className='char__item'
			onClick={onSelectChar}
			tabIndex={0}
		>
			<img src={thumbnail} alt={name} className={imageClasses} />
			<div className='char__name'>{name}</div>
		</div>
	);
};

CharList.propTypes = {
	onSelectChar: propTypes.func,
};

export default CharList;
