import { lazy, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { ErrorBoundary } from '../../generalComponents';
import useMarvelService from '../../services/MarvelService';
import { AppBanner } from '../../components';
import { Spinner } from '../../generalComponents';

import './singlePage.scss';

const ErrorBlock = lazy(() => import('../../pages/errorBlock/ErrorBlock'));

const SinglePage = ({ type, Component }) => {
	const { id } = useParams();
	const { loading, error, getComic, getCharacter } = useMarvelService();
	const [data, setData] = useState(null);

	const getNewData = () => {
		switch (type) {
			case 'comic':
				getComic(id).then(newComic => setData(newComic));
				break;
			case 'character':
				getCharacter(id).then(newChar => setData(newChar));
				break;
		}
	};

	useEffect(getNewData, [id]);

	let content;

	if (/\D/g.test(id)) content = <ErrorBlock />;
	if (error)
		content = (
			<ErrorBlock
				messages={{
					a: `SORRY, THERE'S NO ${type.toUpperCase()} WITH SUCH ID (${id.toUpperCase()})`,
					b: 'BACK TO ALL',
				}}
				to={type === 'comic' ? '/comics' : '/'}
			/>
		);

	content = loading ? (
		<Spinner />
	) : (
		<ErrorBoundary>
			<Component {...data} />
		</ErrorBoundary>
	);

	return (
		<>
			<AppBanner />
			{content}
		</>
	);
};

export default SinglePage;
