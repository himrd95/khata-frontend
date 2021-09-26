import React, { useContext } from 'react';
import './Dashboard.css';
import axios from 'axios';
import CollapsibleTable from '../Table/Table';
import Navbar from '../Navbar/Navbar';
import { provider } from '../../Context/ContextPovider';
import { LinearProgress, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
	return (
		<MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
	);
});

const Dashboard = () => {
	const [users, setUsers] = React.useState([]);

	const [isLoading, setIsLoading] = React.useState(false);
	const { state, message } = useContext(provider);
	const [open, setOpen] = React.useState(false);
	const getUsers = (id) => {
		setIsLoading(true);
		let url;
		if (id) url = `https://server-khata.herokuapp.com/users/${id}`;
		else url = `https://server-khata.herokuapp.com/users/`;
		axios
			.get(url)
			.then((res) => setUsers([...res.data]))
			.catch((e) => console.log(e))
			.finally(() => setIsLoading(false));
	};
	React.useEffect(() => {
		getUsers();
	}, [state]);
	console.log(users);

	React.useEffect(() => {
		message !== '' && setOpen(true);
	}, [message]);
	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};
	return (
		<div>
			<Navbar />

			<div className={isLoading ? 'unused-before' : 'unused'}></div>

			{isLoading ? (
				<LinearProgress color='secondary' />
			) : (
				<CollapsibleTable users={users} />
			)}
			<Snackbar
				open={open}
				autoHideDuration={6000}
				onClose={handleClose}
			>
				<Alert
					onClose={handleClose}
					severity='success'
					sx={{ width: '100%' }}
				>
					{message}!
				</Alert>
			</Snackbar>
		</div>
	);
};

export default Dashboard;
