export const transformString = (str, maxLen = 200) => {
	str = str ?? '';

	if (str.length > maxLen) {
		str = str.slice(0, maxLen - 4);

		let index = str.length;
		for (let i = str.length; i >= 0; i--) {
			if (str[i] !== ' ') index--;
			else break;
		}

		return str.slice(0, index) + ' ...';
	}

	return str;
};

export const random = ({ start = 0, end }) => {
	return Math.floor(Math.random() * (end - start) + start);
};
