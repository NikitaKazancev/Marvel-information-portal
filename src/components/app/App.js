import AppHeader from '../appHeader/AppHeader';
import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';

import decoration from '../../resources/img/vision.png';
import { Component } from 'react/cjs/react.production.min';

class App extends Component {
	state = {
		selectedChar: null
	};

	onSelectChar = (id) => {
		this.setState({ selectedChar: id });
	};

	render() {
		return (
			<div className='app'>
				<AppHeader />
				<main>
					<RandomChar />
					<div className='char__content'>
						<CharList onSelectChar={this.onSelectChar} />
						<CharInfo />
					</div>
					<img className='bg-decoration' src={decoration} alt='vision' />
				</main>
			</div>
		);
	}
}

export default App;
