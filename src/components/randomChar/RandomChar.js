import { Component } from 'react/cjs/react.production.min';

import './randomChar.scss';
import MarvelService from '../../services/MarvelService';
import Spinner from '../../generalComponents/spinner/Spinner';
import RandomCharStatic from './randomCharStatic/RandomCharStatic';
import RandomCharBlock from './randomCharBlock/RandomCharBlock';
import ErrorMessage from '../../generalComponents/errorMessage/ErrorMessage';

export default class RandomChar extends Component {
	marvelService = new MarvelService();

	state = {
		character: {
			name: null,
			description: null,
			thumbnail: null,
			homepage: null,
			wiki: null
		},

		loading: false,
		error: false
	};

	componentWillMount() {
		this.updateChar();
	}

	catchError = () => {
		this.setState({ error: true, loading: false });
		setTimeout(() => {
			document.querySelector('.error').classList.remove('error_show');
			setTimeout(() => this.setState({ error: false }), 1000);
		}, 4000);
	};

	updateChar = () => {
		this.setState({ loading: true });

		this.marvelService
			.getCharacter(
				Math.floor(Math.random() * (1011500 - 1010701) + 1010701)
			)
			.then((character) => this.setState({ character, loading: false }))
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
				{error ? <ErrorMessage /> : null}
				<RandomCharStatic onUpdateChar={this.updateChar} />
			</div>
		);
	}
}
