import { AppBanner, ComicsList } from '../../components';
import { ErrorBoundary } from '../../generalComponents';

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
