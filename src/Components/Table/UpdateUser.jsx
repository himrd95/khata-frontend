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
const UpdateUser = ({
	handleClose,
	row,
	handleUpdate,
	edit,
	index,
}) => {
	const initState = edit
		? {
				actualPrice: row.hystory[index].actualPrice,
				paid: row.hystory[index].paid,
		  }
		: { actualPrice: '', paid: '' };

	const [payload, setPayLoad] = React.useState(initState);
	const handlechange = (e) => {
		const { name, value } = e.target;
		setPayLoad({ ...payload, [name]: value });
	};
	return (
		<Container>
			<DialogTitle>Update {row.name}'s account</DialogTitle>

			<TextField
				onChange={(e) => handlechange(e)}
				type='number'
				id='filled-required'
				label={edit ? row.hystory[index].actualPrice : 'Actual amount'}
				variant='filled'
				name='actualPrice'
			/>
			<br />
			<br />
			<TextField
				onChange={(e) => handlechange(e)}
				id='filled-required'
				type='number'
				label={edit ? row.hystory[index].paid : 'Paid Amount'}
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
			<Button
				onClick={() => handleUpdate(payload, row, edit, index)}
				variant='contained'
				color='primary'
			>
				Update User
			</Button>
		</Container>
	);
};

export default UpdateUser;
