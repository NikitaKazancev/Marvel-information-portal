import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AppHeader from '../appHeader/AppHeader';
import { MainPage, ComicsPage, ErrorBlock, ComicPage } from '../../pages';

const App = () => {
	return (
		<Router>
			<div className='app'>
				<AppHeader />
				<main>
					<Routes>
						<Route path='/' element={<MainPage />} />
						<Route path='/comics' element={<ComicsPage />} />
						<Route path='/comics/:comicId' element={<ComicPage />} />
						<Route path='*' element={<ErrorBlock />} />
					</Routes>
				</main>
			</div>
		</Router>
	);
};

export default App;
