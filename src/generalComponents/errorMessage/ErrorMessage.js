import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import './errorMessage.scss';

const ErrorMessage = () => {
	const parent = document.querySelector('body');

	useEffect(
		() =>
			setTimeout(
				() => document.querySelector('.error').classList.add('error_show'),
				0
			),
		[]
	);

	return createPortal(
		<div className='error'>Произошла ошибка, попробуйте снова</div>,
		parent
	);
};

export default ErrorMessage;
