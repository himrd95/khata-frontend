import React, { useContext } from 'react';
import './Dashboard.css';
import axios from 'axios';
import CollapsibleTable from '../Table/Table';
import { provider } from '../../Context/ContextPovider';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import speak from '../../utils/spetch';

const Alert = React.forwardRef(function Alert(props, ref) {
	return (
		<MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
	);
});

const Dashboard = () => {
	const [users, setUsers] = React.useState([]);

	const [isLoading, setIsLoading] = React.useState(false);
	const { state, message, adminPannel } = useContext(provider);
	const [open, setOpen] = React.useState(false);

	React.useEffect(() => {
		speak(`Welcome back, ${adminPannel.admin.name.split(' ')[0]}`);
	}, []);

	const getUsers = (id) => {
		setIsLoading(true);

		let url;
		if (id) url = `https://server-khata.herokuapp.com/users/${id}`;
		else url = `https://server-khata.herokuapp.com/users/`;
		const headers = {
			headers: {
				Authorization: 'Bearer ' + adminPannel.token,
			},
		};
		axios
			.get(url, headers)
			.then((res) => setUsers([...res.data]))
			.catch((e) => console.log(e))
			.finally(() => setIsLoading(false));
	};

	React.useEffect(() => {
		getUsers();
	}, [state]);

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
			<div className='unused'></div>
			<CollapsibleTable users={users} />
			<div className='unused'></div>
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
