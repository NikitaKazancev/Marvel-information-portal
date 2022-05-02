import { Helmet } from 'react-helmet';

import { AppBanner, ComicsList } from '../../components';
import { ErrorBoundary } from '../../generalComponents';

const ComicsPage = () => {
	return (
		<>
			<Helmet>
				<meta name='description' content='Page with list of comics' />
				<title>Comics</title>
			</Helmet>
			<AppBanner />
			<ErrorBoundary>
				<ComicsList />
			</ErrorBoundary>
		</>
	);
};

export default ComicsPage;
