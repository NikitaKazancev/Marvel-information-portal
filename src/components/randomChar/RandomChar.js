import { Component } from 'react/cjs/react.production.min';

import { createPortal } from 'react-dom';

import MarvelService from '../../services/MarvelService';
import Spinner from '../../generalComponents/spinner/Spinner';
import RandomCharStatic from './randomCharStatic/RandomCharStatic';
import RandomCharBlock from './randomCharBlock/RandomCharBlock';
import ErrorMessage from '../../generalComponents/errorMessage/ErrorMessage';

import './randomChar.scss';

export default class RandomChar extends Component {
	marvelService = new MarvelService();

	state = {
		character: {
			name: null,
			description: null,
			thumbnail: null,
			homepage: null,
			wiki: null,
		},

		loading: false,
		error: false,
	};

	componentWillMount() {
		this.updateChar();
	}

	catchError = () => {
		this.setState({ error: true, loading: false });
		this.props.onError();
	};

	updateChar = () => {
		this.setState({ loading: true });

		this.marvelService
			.getRandomCharacter()
			.then(({ name, description, thumbnail, homepage, wiki }) =>
				this.setState({
					character: { name, description, thumbnail, homepage, wiki },
					loading: false,
				})
			)
			.catch(() => this.catchError());
	};

	render() {
		const { character, loading, error } = this.state;

		const content = loading ? (
			<Spinner />
		) : (
			<RandomCharBlock {...character} />
		);

		return (
			<div className='randomchar'>
				{content}
				{error ? (
					<ErrorPortal>
						<ErrorMessage />
					</ErrorPortal>
				) : null}
				<RandomCharStatic onUpdateChar={this.updateChar} />
			</div>
		);
	}
}

const ErrorPortal = ({ children }) => {
	return createPortal(children, document.querySelector('body'));
};
