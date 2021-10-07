import React, { useContext, useRef, useState } from 'react';
import {
	Button,
	DialogTitle,
	Input,
	TextField,
} from '@material-ui/core';
import Styled from 'styled-components';
import { provider } from '../../Context/ContextPovider';
import { CircularProgress } from '@mui/material';

const Container = Styled.div`
padding:30px;
text-align:center;
width:fit-content
margin:auto;
`;
const Error = Styled.div`
color:red;
font-size:14px;
`;
const RegistrationContent = ({ handleClose, handleAddUser }) => {
	const [payload, setPayLoad] = React.useState({ email: '' });
	const [confirm, setConfirm] = React.useState('');
	const { isLoading, error, setError } = useContext(provider);
	const passwordRef = useRef(false);
	const [e, setE] = useState(false);
	const inputRef = useRef();

	const handleChoose = () => {
		inputRef.current.click();
	};

	const handlechange = (e) => {
		const { name, value, files } = e.target;
		setPayLoad({
			...payload,
			[name]: name === 'profile' ? files[0] : value,
		});
		if (name === 'email') {
			setE(false);
		}
		if (name === 'password') {
			setE(true);
		}
		validateEmail();
	};

	const handleRegister = () => {
		if (!validateEmail()) {
			setError({
				message: 'Please enter a valid email!',
				open: true,
			});
			return;
		}
		if (payload.password.length < 8) {
			setError({
				message: 'Password should be atleast 8 characters!',
				open: true,
			});
			return;
		}
		handleAddUser(payload);
	};
	const validateEmail = () => {
		if (
			payload.email.includes !== '@' &&
			payload.email.includes !== '.' &&
			payload.email.includes === ','
		) {
			return false;
		}
		return true;
	};

	return (
		<Container>
			<Error>{error.open ? error.message : ' '}</Error>
			<DialogTitle>Please provide the details.</DialogTitle>
			<TextField
				onChange={(e) => handlechange(e)}
				required
				id='filled-required'
				label='Name'
				variant='filled'
				name='name'
			/>
			<br />
			<br />
			<TextField
				onChange={(e) => handlechange(e)}
				required
				type='number'
				id='filled-required'
				label='Age'
				variant='filled'
				name='age'
			/>
			<br />
			<br />
			<TextField
				onChange={(e) => handlechange(e)}
				required
				id='filled-required'
				label='Email'
				variant='filled'
				name='email'
			/>
			<br />
			<br />
			<TextField
				ref={passwordRef}
				onChange={(e) => handlechange(e)}
				type='password'
				required
				id='filled-required'
				label='Password'
				variant='filled'
				name='password'
			/>

			<br />
			<br />
			<TextField
				onChange={(e) => setConfirm(e.target.value)}
				type='password'
				required
				error={
					confirm.length === 0
						? false
						: confirm === payload.password
						? false
						: true
				}
				id='filled-required'
				label='Confirm Password'
				variant='filled'
				name='confirm'
			/>
			<br />
			<br />
			<Input
				ref={inputRef}
				accept='image/*'
				id='raised-button-file'
				onChange={(e) => handlechange(e)}
				type='file'
				required
				label='Profile'
				variant='filled'
				name='profile'
				multiple
				style={{ display: 'none' }}
			/>
			<label htmlFor='raised-button-file'>
				<Button
					variant='contained'
					component='span'
					onClick={handleChoose}
				>
					Choose Profile Picture
					{/* <Input
						ref={inputRef}
						onChange={(e) => handlechange(e)}
						type='file'
						required
						label='Profile'
						variant='filled'
						name='profile'
						style={{ display: 'none' }}
					/> */}
				</Button>
			</label>
			<br />
			<br />
			<Button
				onClick={handleClose}
				style={{ marginRight: '10px' }}
				variant='contained'
			>
				Cancel
			</Button>
			<Button
				onClick={() => handleRegister()}
				variant='contained'
				color='primary'
			>
				{isLoading && (
					<CircularProgress
						sx={{ color: 'white', marginRight: '10px' }}
						size={16}
					/>
				)}
				Sign up
			</Button>
		</Container>
	);
};

export default RegistrationContent;
