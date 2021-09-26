import {
	Button,
	DialogTitle,
	Paper,
	TextField,
} from '@material-ui/core';
import Styled from 'styled-components';
import React from 'react';

const Container = Styled.div`
padding:30px;
text-align:center;
width:fit-content
margin:auto;
`;
const NewUser = ({ handleClose, handleAddUser }) => {
	const [payload, setPayLoad] = React.useState({});
	const handlechange = (e) => {
		const { name, value } = e.target;
		setPayLoad({ ...payload, [name]: value });
	};
	return (
		<Container>
			<DialogTitle>Add a new User</DialogTitle>
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
				type='number'
				id='filled-required'
				label='Actual amount'
				variant='filled'
				name='actualPrice'
			/>
			<br />
			<br />
			<TextField
				onChange={(e) => handlechange(e)}
				id='filled-required'
				type='number'
				label='Paid Amount'
				variant='filled'
				name='paid'
			/>
			<Paper
				style={{
					width: '100px',
					margin: '20px auto',
					padding: '10px 20px',
					background: '#eee',
				}}
			>
				<span>Balance : </span>
				<span>
					{!payload.actualPrice
						? 0
						: payload.actualPrice - payload.paid}
				</span>
			</Paper>
			<Button
				onClick={handleClose}
				style={{ marginRight: '10px' }}
				variant='contained'
			>
				Cancle
			</Button>
			<Button onClick={()=>handleAddUser(payload)} variant='contained' color='primary'>
				Add User
			</Button>
		</Container>
	);
};

export default NewUser;
