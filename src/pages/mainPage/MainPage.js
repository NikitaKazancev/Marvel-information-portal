import { useState } from 'react';

import { RandomChar, CharList, CharInfo, CharSearch } from '../../components';
import { ErrorBoundary } from '../../generalComponents';

import decoration from '../../resources/img/vision.png';

const MainPage = () => {
	const [selectedChar, setSelectedChar] = useState(null);

	return (
		<>
			<ErrorBoundary>
				<RandomChar />
			</ErrorBoundary>
			<div className='char__content'>
				<ErrorBoundary>
					<CharList setSelectedChar={setSelectedChar} />
				</ErrorBoundary>
				<div>
					<ErrorBoundary>
						<CharInfo charId={selectedChar} />
					</ErrorBoundary>
					<ErrorBoundary>
						<CharSearch />
					</ErrorBoundary>
				</div>
			</div>
			<img className='bg-decoration' src={decoration} alt='vision' />
		</>
	);
};

export default MainPage;
