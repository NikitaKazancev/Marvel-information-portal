import { Component } from 'react/cjs/react.production.min';

import './randomChar.scss';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import RandomCharStatic from './randomCharStatic/RandomCharStatic';
import RandomCharBlock from './randomCharBlock/RandomCharBlock';

export default class RandomChar extends Component {
	constructor(props) {
		super(props);
		this.updateChar();
	}

	state = {
		character: {
			name: null,
			description: null,
			thumbnail: null,
			homepage: null,
			wiki: null
		},

		loading: true
	};

	updateChar = () => {
		this.setState({ loading: true });

		new MarvelService()
			.getCharacter(
				Math.floor(Math.random() * (1011500 - 1010701) + 1010701)
			)
			.then((character) => this.setState({ character, loading: false }));
	};

	render() {
		const { character, loading } = this.state;
		const { description, name } = character;

		const descr =
			description || `At the moment there's no info about ${name}`;

		const characterContent = loading ? (
			<Spinner />
		) : (
			<RandomCharBlock {...character} description={descr} />
		);

		return (
			<div className='randomchar'>
				{characterContent}
				<RandomCharStatic onUpdateChar={this.updateChar} />
			</div>
		);
	}
}
