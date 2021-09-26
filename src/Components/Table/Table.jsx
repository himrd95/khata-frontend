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

export default function CollapsibleTable({ users }) {
	const [newRows, setNewRows] = React.useState([]);
	const [isOpen, setIsOpen] = React.useState(false);
	const [content, setContent] = React.useState('');
	const { handleState } = useContext(provider);

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
		const { name, actualPrice, paid } = payload;
		const d = new Date();
		const date =
			d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
		const newPayload = {
			name,
			balance: paid ? actualPrice - paid : 0,
			hystory: paid ? [{ actualPrice, paid, date }] : [],
		};
		const url = `https://server-khata.herokuapp.com/users/`;
		axios
			.post(url, newPayload)
			.then((res) => handleState('User has been successfully added'))
			.catch((e) => console.log(e))
			.finally(() => handleClose());
	};

	const deleteConfirmation = (id) => {
		handleClose();
		const url = `https://server-khata.herokuapp.com/users/${id}`;
		axios
			.delete(url)
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

	const updateRequest = (id, payload) => {
		handleClose();
		const url = `https://server-khata.herokuapp.com/users/${id}`;
		axios
			.patch(url, payload)
			.then((res) => {
				handleState('User has been successfully updated');
				console.log(res.data);
			})
			.catch((e) => console.log(e));
	};

	const handleUpdate = (payload, row, edit, index, remove) => {
		const d = new Date();
		const date =
			d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();

		if (remove) {
			row.hystory.splice(index, 1);
		} else {
			if (!edit) {
				row.hystory.push({ ...payload, date });
			} else {
				row.hystory[index] = { ...payload, date };
			}
		}

		let sum = 0;
		row.hystory?.forEach((item) => {
			sum += Number(item.actualPrice) - Number(item.paid);
		});
		updateRequest(row._id, { balance: sum, hystory: row.hystory });
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
	const editAndUpdate = (row, index, remove) => {
		if (remove) {
			handleUpdate('', row, false, index, remove);
			return;
		}
		setContent(
			<UpdateUser
				handleClose={handleClose}
				handleUpdate={handleUpdate}
				row={row}
				edit={true}
				index={index}
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
	const updateUser = (row) => {
		setIsOpen(true);
		setContent(
			<div>
				<DialogTitle>
					<Button
						onClick={() => handleUpdateAdd(row)}
						variant='contained'
						color='primary'
					>
						ADD a new trasection?
					</Button>
				</DialogTitle>
				<DialogTitle>
					<Button
						onClick={() => handleUpdateEdit(row)}
						variant='contained'
						color='secondary'
					>
						EDIT a trasection?
					</Button>
				</DialogTitle>
				<DialogTitle>
					<Button
						onClick={() => handleUpdateRemove(row)}
						variant='outlined'
					>
						Remove a trasection?
					</Button>
				</DialogTitle>
				<DialogActions>
					<Button onClick={handleClose}>Do nothing</Button>
				</DialogActions>
			</div>,
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
						background: '#DFEEEA',
					}}
				>
					<TableRow>
						<TableCell>
							<span className='header'>Name</span>
						</TableCell>
						<TableCell align='right'>
							<span className='header' padding='none'>
								Balance
							</span>
						</TableCell>
						<TableCell align='right'>
							<span className='header'>Edit</span>
						</TableCell>
						<TableCell align='right'>
							<span className='header'>Clear</span>
						</TableCell>
						<TableCell onClick={() => addNewUser()} align='right'>
							<i className='fas fa-plus-square'></i>
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody style={{ background: '#A7C4BC' }}>
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