import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import MarvelService from './services/MarvelService';
import './style/style.scss';

// new MarvelService().getCharacter(1011005).then((res) => console.log(res));

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);
