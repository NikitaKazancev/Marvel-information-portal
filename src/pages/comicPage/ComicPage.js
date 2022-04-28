import { SingleComic } from '../../components';
import { ErrorBoundary } from '../../generalComponents';

const ComicPage = () => {
	return (
		<ErrorBoundary>
			<SingleComic />
		</ErrorBoundary>
	);
};

export default ComicPage;
