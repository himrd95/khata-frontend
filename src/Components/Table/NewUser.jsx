import {
	Button,
	DialogTitle,
	Input,
	Paper,
	TextField,
} from '@material-ui/core';
import Styled from 'styled-components';
import React, { useContext, useEffect, useState } from 'react';
import { provider } from '../../Context/ContextPovider';
import { CircularProgress, DialogActions } from '@mui/material';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import speak from '../../utils/speech';
import { useRef } from 'react';

const Container = Styled.div`
padding:10px 30px;
text-align:center;
width:fit-content
margin:auto;
`;
const NewUser = ({ handleClose, handleAddUser }) => {
	const [payload, setPayload] = useState({ mode: '' });
	const inputRef = useRef();

	const { isLoading, adminPannel } = useContext(provider);

	const handlechange = (e) => {
		const { name, value, files } = e.target;
		setPayload({
			...payload,
			[name]: name === 'profile' ? files[0] : value,
		});
	};

	const handleChoose = () => {
		inputRef.current.click();
	};

	useEffect(() => {
		adminPannel.voice && speak('Add a new User');
	}, [adminPannel.voice]);

	return (
		<Container>
			<DialogTitle>Add a new User</DialogTitle>

			<TextField
				onChange={(e) => handlechange(e)}
				required
				id="filled-required"
				label="Name"
				variant="filled"
				name="name"
			/>
			<br />
			<br />
			<Input
				ref={inputRef}
				accept="image/*"
				id="raised-button-file"
				onChange={(e) => handlechange(e)}
				type="file"
				required
				label="Profile"
				variant="filled"
				name="profile"
				multiple
				style={{ display: 'none' }}
			/>

			<label htmlFor="raised-button-file">
				<Button
					variant="contained"
					component="span"
					onClick={handleChoose}
				>
					Choose User's pic
				</Button>
			</label>
			<br />
			<br />
			<TextField
				onChange={(e) => handlechange(e)}
				type="number"
				id="filled-required"
				label="Aamount"
				variant="filled"
				name="actualPrice"
				pattern="[0-9]*"
				inputMode="numeric"
			/>
			<br />
			<br />
			{/* <TextField
				onChange={(e) => handlechange(e)}
				id="filled-required"
				type="number"
				label="Paid Amount"
				variant="filled"
				name="paid"
			/>
			<br />
			<br /> */}
			<FormControl
				variant="filled"
				sx={{ width: '75%', display: 'flex' }}
			>
				<InputLabel id="demo-simple-select-label">Mode</InputLabel>
				<Select
					required
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={payload.mode}
					label="Mode"
					name="mode"
					placeholder="Mode"
					onChange={(e) => handlechange(e)}
				>
					<MenuItem value={'given'}>
						{' '}
						<span style={{ margin: '5px 20px' }}>{`Given to ${
							payload.name ?? 'them'
						} (Debit)`}</span>{' '}
					</MenuItem>
					<br />
					<MenuItem value={'taken'}>
						<span style={{ margin: '5px 20px' }}>{`Taken from ${
							payload.name ?? 'them'
						} (Credit)`}</span>
					</MenuItem>
				</Select>

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
			<DialogActions>
				<Button
					onClick={handleClose}
					sx={{ margin: '0 10px 10px 0' }}
					variant="contained"
				>
					Cancel
				</Button>
				<Button
					onClick={() => handleAddUser(payload)}
					variant="contained"
					color="primary"
				>
					{isLoading && (
						<CircularProgress
							sx={{ color: 'white', marginRight: '10px' }}
							size={16}
						/>
					)}
					Add User
				</Button>
			</DialogActions>
			<br />
		</Container>
	);
};

export default NewUser;
