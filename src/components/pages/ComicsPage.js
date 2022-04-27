import AppBanner from '../appBanner/AppBanner';
import ComicsList from '../comicsList/ComicsList';
import ErrorBoundary from '../../generalComponents/errorBoundary/ErrorBoundary';

const ComicsPage = () => {
	return (
		<>
			<AppBanner />
			<ErrorBoundary>
				<ComicsList />
			</ErrorBoundary>
		</>
	);
};

export default ComicsPage;
