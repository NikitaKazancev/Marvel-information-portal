import { Component } from 'react/cjs/react.production.min';

import './errorMessage.scss';

export default class ErrorMessage extends Component {
	componentDidMount() {
		setTimeout(
			() => document.querySelector('.error').classList.add('error_show'),
			0
		);
	}

	render() {
		return <div className='error'>Произошла ошибка, попробуйте снова</div>;
	}
}
