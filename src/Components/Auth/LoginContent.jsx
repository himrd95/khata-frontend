import React, { useContext } from 'react';
import { Button, DialogTitle, TextField } from '@material-ui/core';
import Styled from 'styled-components';
import { CircularProgress } from '@mui/material';
import { provider } from '../../Context/ContextPovider';

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
const LoginContent = ({ handleClose, handleLogin }) => {
	const [payload, setPayLoad] = React.useState({});
	const { isLoading, error } = useContext(provider);

	const handlechange = (e) => {
		const { name, value } = e.target;
		setPayLoad({ ...payload, [name]: value });
	};

	return (
		<Container>
			<DialogTitle>Please provide the details.</DialogTitle>

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
				onChange={(e) => handlechange(e)}
				type='password'
				required
				id='filled-required'
				label='Password'
				variant='filled'
				name='password'
			/>
			<Error>{error.open && error.message}</Error>
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
				onClick={() => handleLogin(payload)}
				variant='contained'
				color='primary'
			>
				{isLoading && (
					<CircularProgress
						sx={{ color: 'white', marginRight: '10px' }}
						size={16}
					/>
				)}
				Log in
			</Button>
		</Container>
	);
};

export default LoginContent;
