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
				{error ? <ErrorMessage /> : null}
				<RandomCharStatic onUpdateChar={this.updateChar} />
			</div>
		);
	}
}
