import { useState } from 'react';
import { Helmet } from 'react-helmet';

import { RandomChar, CharList, CharInfo, CharSearch } from '../../components';
import { ErrorBoundary } from '../../generalComponents';

import decoration from '../../resources/img/vision.png';

const MainPage = () => {
	const [selectedChar, setSelectedChar] = useState(null);

	return (
		<>
			<Helmet>
				<meta name='description' content='Marvel information portal' />
				<title>Marvel information portal</title>
			</Helmet>
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
