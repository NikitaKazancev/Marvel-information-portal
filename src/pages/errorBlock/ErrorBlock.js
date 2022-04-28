import { Link } from 'react-router-dom';

import './errorBlock.scss';

const ErrorBlock = ({
	messages: { a, b } = { a: 'PAGE NOT FOUND', b: 'TO HOME' },
	to = '/',
}) => {
	return (
		<div className='page404'>
			<div className='page404__glass'>
				<div className='page404__content'>
					<div>{a}</div>
					<Link to={to}>{b}</Link>
				</div>
			</div>
		</div>
	);
};

export default ErrorBlock;
