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

	onError = () => {
		setTimeout(() => {
			document.querySelector('.error').classList.remove('error_show');
			setTimeout(() => this.setState({ error: false }), 1000);
		}, 4000);
	};

	render() {
		return (
			<div className='app'>
				<AppHeader />
				<main>
					<RandomChar onError={this.onError} />
					<div className='char__content'>
						<CharList
							onSelectChar={this.onSelectChar}
							onError={this.onError}
						/>
						<CharInfo
							charId={this.state.selectedChar}
							onError={this.onError}
						/>
					</div>
					<img className='bg-decoration' src={decoration} alt='vision' />
				</main>
			</div>
		);
	}
}

export default App;
