import { useState } from 'react';
import AppHeader from '../appHeader/AppHeader';
import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import ErrorBoundary from '../../generalComponents/errorBoundary/ErrorBoundary';

import decoration from '../../resources/img/vision.png';

const App = () => {
	const [selectedChar, setSelectedChar] = useState(null);

	const onSelectChar = id => {
		setSelectedChar(id);
	};

	const onError = setError => {
		setTimeout(() => {
			document.querySelector('.error').classList.remove('error_show');
			setTimeout(() => setError({ error: false }), 1000);
		}, 4000);
	};

	return (
		<div className='app'>
			<AppHeader />
			<main>
				<ErrorBoundary>
					<RandomChar onError={onError} />
				</ErrorBoundary>
				<div className='char__content'>
					<ErrorBoundary>
						<CharList onSelectChar={onSelectChar} onError={onError} />
					</ErrorBoundary>
					<ErrorBoundary>
						<CharInfo charId={selectedChar} onError={onError} />
					</ErrorBoundary>
				</div>
				<img className='bg-decoration' src={decoration} alt='vision' />
			</main>
		</div>
	);
};

export default App;
