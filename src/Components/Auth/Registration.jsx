import { Button } from '@mui/material';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { provider } from '../../Context/ContextPovider';
import SimpleDialog from '../Modal';
import { SuccessPopupContent } from '../SuccessPopupContent';
import LoginContent from './LoginContent';
import './Registration.css';
import RegistrationContent from './RegistrationContent';

const Registration = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [content, setContent] = useState('');
	const { loginPopup, setAdminPannel, setIsLoading, setError } =
		useContext(provider);

	const handleClose = () => {
		setIsOpen(false);
	};

	const successPopup = () => {
		setContent(
			<SuccessPopupContent handleLoginModal={handleLoginModal} />,
		);
	};
	const handleAddUser = (payload) => {
		const { name, age, email, password, profile } = payload;
		const formData = new FormData();
		formData.append('name', name);
		formData.append('age', age);
		formData.append('email', email);
		formData.append('password', password);
		formData.append('profile', profile);
		setError({ message: '', open: false });
		setIsLoading(true);
		const url = `https://server-khata.herokuapp.com/register/`;
		axios
			.post(url, formData)
			.then((res) => {
				setIsLoading(false);
				if (res.data.token) {
					console.log(res.data);
					successPopup();
				} else
					setError({
						message: 'User has been already registered!',
						open: true,
					});
			})
			.catch((e) =>
				setError({
					message: 'Something went wrong please try again later!',
					open: true,
				}),
			)
			.finally(() => setIsLoading(false));
	};
	const handleRegistrationModal = () => {
		setError({ message: '', open: false });
		setIsOpen(true);
		setContent(
			<RegistrationContent
				handleClose={handleClose}
				handleAddUser={handleAddUser}
			/>,
		);
	};

	const handleLogin = (payload) => {
		setError({ message: '', open: false });
		setIsLoading(true);
		const url = `https://server-khata.herokuapp.com/login/`;
		axios
			.post(url, { ...payload })
			.then((res) => {
				setIsLoading(false);
				if (res.data.token) {
					setAdminPannel(res.data);
					handleClose();
				} else
					setError({ message: 'Wrong credentials!', open: true });
			})
			.catch((e) =>
				setError({ message: 'Wrong credentials!', open: true }),
			)
			.finally(() => setIsLoading(false));
	};
	const handleLoginModal = () => {
		setError({ message: '', open: false });
		setIsOpen(true);
		setContent(
			<LoginContent
				handleClose={handleClose}
				handleLogin={handleLogin}
			/>,
		);
	};
	React.useEffect(() => {
		if (loginPopup) {
			handleLoginModal();
		}
	}, [loginPopup]);
	return (
		<div className='messages'>
			<div>
				<div className='unused'></div>
				<h1>Tired of managing your daily expenses?</h1>
				<h3>Here's the solution. So let's</h3>
				<Button
					onClick={() => handleRegistrationModal()}
					sx={{ padding: '10px 25px' }}
					variant='contained'
					color='primary'
				>
					Get Started
				</Button>
				<p>
					Already registered?{' '}
					<Button
						onClick={() => handleLoginModal()}
						sx={{ color: '#2bc3ff' }}
					>
						Login
					</Button>
				</p>
			</div>

			<SimpleDialog
				isOpen={isOpen}
				handleClose={handleClose}
				content={content}
			/>
		</div>
	);
};

export default Registration;
