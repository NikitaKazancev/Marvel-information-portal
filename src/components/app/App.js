import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Spinner } from '../../generalComponents';
import AppHeader from '../appHeader/AppHeader';

const ErrorBlock = lazy(() => import('../../pages/errorBlock/ErrorBlock'));
const MainPage = lazy(() => import('../../pages/mainPage/MainPage'));
const ComicsPage = lazy(() => import('../../pages/comicsPage/ComicsPage'));
const SinglePage = lazy(() => import('../../pages/singlePage/SinglePage'));
const SingleComic = lazy(() =>
	import('../../components/singleComic/SingleComic')
);
const SingleChar = lazy(() => import('../../components/singleChar/SingleChar'));

const App = () => {
	return (
		<Router>
			<div className='app'>
				<AppHeader />
				<main>
					<Suspense fallback={<Spinner />}>
						<Routes>
							<Route path='/' element={<MainPage />} />
							<Route path='/comics' element={<ComicsPage />} />
							<Route
								path='/comics/:id'
								element={
									<SinglePage type='comic' Component={SingleComic} />
								}
							/>
							<Route
								path='/characters/:id'
								element={
									<SinglePage
										type='character'
										Component={SingleChar}
									/>
								}
							/>
							<Route path='*' element={<ErrorBlock />} />
						</Routes>
					</Suspense>
				</main>
			</div>
		</Router>
	);
};

export default App;
