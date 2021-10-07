import React, { useContext } from 'react';
import './Table.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Row from './Row';
import SimpleDialog from '../Modal';
import NewUser from './NewUser';
import axios from 'axios';
import { provider } from '../../Context/ContextPovider';
import { Button, DialogActions, DialogTitle } from '@mui/material';
import UpdateUser from './UpdateUser';
import DataTable from './EditAndUpdate';
import Styled from 'styled-components';

const Container = Styled.div`
padding:10px 30px;
text-align:center;
width:fit-content
margin:auto;
`;

export default function CollapsibleTable({ users }) {
	const [newRows, setNewRows] = React.useState([]);
	const [isOpen, setIsOpen] = React.useState(false);
	const [content, setContent] = React.useState('');
	const { handleState, adminPannel, setIsLoading } =
		useContext(provider);

	const setRows = () => {
		const editButton = <i className='far fa-edit'></i>;
		const deleteButton = <i className='far fa-trash-alt'></i>;
		const rows = users.map((row) => ({
			...row,
			editButton,
			deleteButton,
		}));
		setNewRows(rows);
	};

	React.useEffect(() => {
		setRows();
	}, [users]);

	const addNewUser = () => {
		setContent(
			<NewUser
				handleClose={handleClose}
				handleAddUser={handleAddUser}
			/>,
		);
		setIsOpen(true);
	};
	const handleClose = () => {
		setIsOpen(false);
	};

	const handleAddUser = (payload) => {
		setIsLoading(true);
		const { name, actualPrice, paid, mode } = payload;
		const d = new Date();
		const date =
			d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
		const newPayload = {
			name,
			balance: paid ? actualPrice - paid : 0,
			[mode]: paid ? [{ actualPrice, paid, date }] : [],
		};
		const url = `https://server-khata.herokuapp.com/users/`;
		const headers = {
			headers: {
				Authorization: 'Bearer ' + adminPannel.token,
			},
		};
		axios
			.post(url, newPayload, headers)
			.then((res) => {
				handleState('User has been successfully added');
				setIsLoading(false);
			})
			.catch((e) => console.log(e))
			.finally(() => handleClose());
	};

	const deleteConfirmation = (id) => {
		handleClose();
		const url = `https://server-khata.herokuapp.com/users/${id}`;
		const headers = {
			headers: {
				Authorization: 'Bearer ' + adminPannel.token,
			},
		};
		axios
			.delete(url, headers)
			.then((res) =>
				handleState('User has been successfully deleted'),
			)
			.catch((e) => console.log(e));
	};

	const deleteUser = (id, name) => {
		setIsOpen(true);
		setContent(
			<div>
				<DialogTitle>
					Do you really want to delete {name}?
				</DialogTitle>
				<DialogActions>
					<Button onClick={handleClose}>Disagree</Button>
					<Button onClick={() => deleteConfirmation(id)} autoFocus>
						Agree
					</Button>
				</DialogActions>
			</div>,
		);
	};

	// Update main axios Function =>>>---------------------------------------------------------
	const updateRequest = (id, payload) => {
		handleClose();
		const url = `https://server-khata.herokuapp.com/users/${id}`;
		const headers = {
			headers: {
				Authorization: 'Bearer ' + adminPannel.token,
			},
		};
		axios
			.patch(url, payload, headers)
			.then((res) => {
				handleState('User has been successfully updated');
			})
			.catch((e) => console.log(e));
	};

	const handleUpdate = (payload, row, edit, index, remove, mode) => {
		const d = new Date();
		const date =
			d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();

		if (remove) {
			row[mode].splice(index, 1);
		} else {
			if (!edit) {
				row[mode] = [...row[mode], { ...payload, date }];
			} else {
				row[mode][index] = { ...payload, date };
			}
		}

		let sum = 0;
		row.given?.forEach((item) => {
			sum += Number(item.actualPrice) - Number(item.paid);
		});
		row.taken?.forEach((item) => {
			sum += Number(item.actualPrice) - Number(item.paid);
		});
		updateRequest(row._id, { balance: sum, [mode]: row[mode] });
	};

	const handleUpdateAdd = (row) => {
		setContent(
			<UpdateUser
				handleClose={handleClose}
				handleUpdate={handleUpdate}
				row={row}
			/>,
		);
	};
	const editAndUpdate = (row, index, remove, mode) => {
		if (remove) {
			handleUpdate('', row, false, index, remove, mode);
			return;
		}
		setContent(
			<UpdateUser
				handleClose={handleClose}
				handleUpdate={handleUpdate}
				row={row}
				edit={true}
				index={index}
				mode={mode}
			/>,
		);
	};
	const handleUpdateEdit = (row) => {
		setContent(
			<DataTable
				handleClose={handleClose}
				editAndUpdate={editAndUpdate}
				row={row}
			/>,
		);
	};
	const handleUpdateRemove = (row) => {
		setContent(
			<DataTable
				handleClose={handleClose}
				editAndUpdate={editAndUpdate}
				row={row}
				remove={true}
			/>,
		);
	};

	// Buttons for updating users ====================>>>>>>>
	const updateUser = (row) => {
		setIsOpen(true);
		setContent(
			<Container>
				<DialogTitle>Edit Hystory</DialogTitle>
				<Button
					onClick={() => handleUpdateAdd(row)}
					variant='contained'
					color='primary'
				>
					ADD a new trasection?
				</Button>
				<Button
					sx={{ margin: '10px 10px' }}
					onClick={() => handleUpdateEdit(row)}
					variant='contained'
					color='secondary'
				>
					EDIT a trasection?
				</Button>
				<Button
					onClick={() => handleUpdateRemove(row)}
					variant='outlined'
				>
					Remove a trasection?
				</Button>
				<br />
				<br />
				<DialogActions>
					<Button variant='outlined' onClick={handleClose}>
						Do nothing
					</Button>
				</DialogActions>
			</Container>,
		);
	};
	return (
		<TableContainer
			style={{ width: '95%', margin: 'auto' }}
			className='mainTable'
			component={Paper}
		>
			<Table aria-label='collapsible table'>
				<TableHead
					className='header'
					style={{
						background:
							'linear-gradient(90deg, rgba(167,215,161,1) 0%, rgba(198,192,255,0.3981967787114846) 56%, rgba(183,196,250,1) 90%, rgba(205,162,255,1) 100%)',
					}}
				>
					<TableRow>
						<TableCell>
							<span className='header'>Name</span>
						</TableCell>
						<TableCell sx={{ padding: '10px' }} align='right'>
							<span className='header' padding='none'>
								Balance
							</span>
						</TableCell>
						<TableCell align='right'>
							<span className='header'>Edit</span>
						</TableCell>
						<TableCell sx={{ padding: '10px' }} align='right'>
							<span className='header'>Clear</span>
						</TableCell>
						<TableCell onClick={() => addNewUser()} align='right'>
							<i className='fas fa-plus-square'></i>
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody
					style={{
						background:
							'linear-gradient(90deg, rgba(215,212,255,1) 0%, rgba(228,225,255,1) 25%, rgba(229,235,252,1) 71%, rgba(220,255,216,1) 100%)',
					}}
				>
					{newRows.map((row) => (
						<Row
							key={row.name}
							deleteUser={deleteUser}
							row={row}
							updateUser={updateUser}
						/>
					))}
				</TableBody>
			</Table>

			<SimpleDialog
				isOpen={isOpen}
				handleClose={handleClose}
				content={content}
			/>
		</TableContainer>
	);
}
