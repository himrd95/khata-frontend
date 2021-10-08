import {
	Button,
	DialogTitle,
	Paper,
	TextField,
} from '@material-ui/core';
import Styled from 'styled-components';
import React, { useContext, useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import speak from '../../utils/spetch';
import { provider } from '../../Context/ContextPovider';

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
	mode,
}) => {
	const [modeVal, setModeVal] = useState('');
	const initState = edit
		? {
				actualPrice: row[mode][index].actualPrice,
				paid: row[mode][index].paid,
		  }
		: { actualPrice: '', paid: '' };

	const [payload, setPayLoad] = React.useState(initState);
	const { adminPannel } = useContext(provider);

	const handlechange = (e) => {
		const { name, value } = e.target;
		setPayLoad({ ...payload, [name]: value });
	};

	useEffect(() => {
		adminPannel.voice && speak(`Update ${row.name}'s account`);
	}, []);
	return (
		<Container>
			<DialogTitle>Update {row.name}'s account</DialogTitle>

			<TextField
				onChange={(e) => handlechange(e)}
				type='number'
				id='filled-required'
				label={edit ? row[mode][index].actualPrice : 'Actual amount'}
				variant='filled'
				name='actualPrice'
			/>
			<br />
			<br />
			<TextField
				onChange={(e) => handlechange(e)}
				id='filled-required'
				type='number'
				label={edit ? row[mode][index].paid : 'Paid Amount'}
				variant='filled'
				name='paid'
			/>
			<br />
			<br />
			<FormControl
				variant='filled'
				sx={{ minWidth: 60, display: 'flex' }}
			>
				{!edit && (
					<InputLabel id='demo-simple-select-label'>Mode</InputLabel>
				)}
				{!edit && (
					<Select
						labelId='demo-simple-select-label'
						id='demo-simple-select'
						value={modeVal}
						label='Mode'
						name='mode'
						placeholder='Mode'
						onChange={(e) => setModeVal(e.target.value)}
					>
						<MenuItem value={'given'}>
							<span style={{ margin: '5px 20px' }}>Given</span>{' '}
						</MenuItem>
						<br />
						<MenuItem value={'taken'}>
							<span style={{ margin: '5px 20px' }}>Taken</span>
						</MenuItem>
					</Select>
				)}

				<Paper
					style={{
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
			</FormControl>
			<div>
				<Button
					onClick={handleClose}
					style={{ marginRight: '10px' }}
					variant='contained'
				>
					Cancle
				</Button>
				<Button
					onClick={() =>
						handleUpdate(
							payload,
							row,
							edit,
							index,
							false,
							edit ? mode : modeVal,
						)
					}
					variant='contained'
					color='primary'
				>
					Update
				</Button>
			</div>
		</Container>
	);
};

export default UpdateUser;
