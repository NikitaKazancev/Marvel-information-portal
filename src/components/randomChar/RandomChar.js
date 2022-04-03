import { Component } from 'react/cjs/react.production.min';
import { transformString } from '../../services/functions';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from '../../services/MarvelService';

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
		}
	};

	updateChar = () => {
		new MarvelService()
			.getCharacter(
				Math.floor(Math.random() * (1011500 - 1010701) + 1010701)
			)
			.then((character) => this.setState({ character }));
	};

	render() {
		const {
			character: { name, description, thumbnail, homepage, wiki }
		} = this.state;

		const descr =
			description || `At the moment there's no info about ${name}`;

		return (
			<div className='randomchar'>
				<div className='randomchar__block'>
					<img
						src={thumbnail}
						alt='Random character'
						className='randomchar__img'
					/>
					<div className='randomchar__info'>
						<p className='randomchar__name'>{name}</p>
						<p className='randomchar__descr'>{transformString(descr)}</p>
						<div className='randomchar__btns'>
							<a href={homepage} className='button button__main'>
								<div className='inner'>homepage</div>
							</a>
							<a href={wiki} className='button button__secondary'>
								<div className='inner'>Wiki</div>
							</a>
						</div>
					</div>
				</div>
				<div className='randomchar__static'>
					<p className='randomchar__title'>
						Random character for today!<br />
						Do you want to get to know him better?
					</p>
					<p className='randomchar__title'>Or choose another one</p>
					<button className='button button__main'>
						<div className='inner' onClick={this.updateChar}>
							try it
						</div>
					</button>
					<img
						src={mjolnir}
						alt='mjolnir'
						className='randomchar__decoration'
					/>
				</div>
			</div>
		);
	}
}
