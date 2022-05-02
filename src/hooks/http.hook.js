import { useState, useCallback } from 'react';

const useHttp = (
	{ errorElem, activeErrorClass, timing } = {
		errorElem: '.error',
		activeErrorClass: 'error_show',
		timing: 4000,
	}
) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const request = useCallback(
		async (
			url,
			options = {
				method: 'GET',
				body: null,
				headers: { 'Content-type': 'application/json' },
			}
		) => {
			setLoading(true);

			try {
				const res = await fetch(url, options);

				if (!res.ok) {
					throw new Error(`Could not fetch ${url}, status: ${res.status}`);
				}

				const data = await res.json();

				setLoading(false);
				setError(null);
				return data;
			} catch (e) {
				setLoading(false);
				setError(e.message);

				if (document.querySelector(errorElem))
					setTimeout(() => {
						document
							.querySelector(errorElem)
							.classList.remove(activeErrorClass);
						setTimeout(() => setError({ error: null }), 1000);
					}, timing);

				throw e;
			}
		},
		[errorElem, activeErrorClass, timing]
	);

	const clearError = useCallback(() => setError(null), []);

	return { loading, error, request, clearError };
};

export default useHttp;
