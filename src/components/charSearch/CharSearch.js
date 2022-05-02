import { useState } from 'react';
import { Link } from 'react-router-dom';
import { object, string } from 'yup';
import {
	Formik,
	Form,
	Field,
	ErrorMessage as FormikErrorMessage,
} from 'formik';

import useMarvelService from '../../services/MarvelService';
import { ErrorMessage } from '../../generalComponents';

import './charSearch.scss';

const CharSearch = () => {
	const [char, setCharId] = useState(undefined);
	const { loading, error, getCharacterByName } = useMarvelService();

	const onSubmit = name => {
		getCharacterByName(name).then(char => setCharId(char));
	};

	const searchResult =
		char === undefined ? null : !char ? (
			<div className='char-search__message char-search__message_error'>
				The character was not found. Check the name and try again
			</div>
		) : (
			<div className='char-search__wrapper'>
				<div className='char-search__message char-search__message_success'>
					There is! Visit {char.name} page?
				</div>
				<Link
					to={`/characters/${char.id}`}
					className='button button__secondary'
				>
					<div className='inner'>TO PAGE</div>
				</Link>
			</div>
		);

	return (
		<div className='char-search'>
			<Formik
				initialValues={{
					name: '',
				}}
				validationSchema={object({
					name: string().required('This field is required'),
				})}
				onSubmit={({ name }) => onSubmit(name)}
			>
				<Form className='char-search__form'>
					<label className='char-search__title' htmlFor='name'>
						Or find a character by name:
					</label>
					<div className='char-search__wrapper'>
						<Field
							type='text'
							name='name'
							placeholder='Enter name'
							id='name'
						/>
						<button
							className='button button__main'
							disabled={loading}
							type='submit'
						>
							<div className='inner'>FIND</div>
						</button>
					</div>
					<FormikErrorMessage
						name='name'
						component='div'
						className='char-search__form-error'
					/>
				</Form>
			</Formik>
			{searchResult}
			{error ? <ErrorMessage /> : null}
		</div>
	);
};

export default CharSearch;
