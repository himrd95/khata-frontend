import React, { useContext } from 'react';
import './Dashboard.css';
import axios from 'axios';
import { provider } from '../../Context/ContextPovider';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { BASE_URL, EVENTS } from '../../constants';
import UserDetailsCard from '../UserDetails/UserDetailsCard';
import DetailsCard from '../DetailsCard/DetailsCard';
import SimpleDialog from '../Modal';
import eventBus from '../../utils/eventBus';
import NewUser from '../Table/NewUser';
import { useEffect } from 'react';
import { useCallback } from 'react';
import BottomNav from '../Navbar/BottomNav';

const Alert = React.forwardRef(function Alert(props, ref) {
	return (
		<MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
	);
});

const Dashboard = () => {
	const [users, setUsers] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(false);
	const { state, setMessage, message, adminPannel, handleState } =
		useContext(provider);
	const [open, setOpen] = React.useState(false);
	const [isOpen, setIsOpen] = React.useState(false);
	const [content, setContent] = React.useState('');

	React.useEffect(() => {
		// speak(`Welcome back, ${adminPannel.admin.name.split(' ')[0]}`);
	}, []);

	const getUsers = useCallback(
		(id) => {
			setIsLoading(true);

			let url;
			if (id) url = `${BASE_URL}/users/${id}`;
			else url = `${BASE_URL}/users/`;
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
		},
		[adminPannel.token],
	);

	React.useEffect(() => {
		getUsers();
	}, [getUsers]);

	React.useEffect(() => {
		message !== '' && setOpen(true);
	}, [message]);

	const handleClose = useCallback(
		(event, reason) => {
			if (reason === 'clickaway') {
				return;
			}
			setOpen(false);
			setIsOpen(false);
			handleState('');
			setMessage('');
		},
		[handleState],
	);

	const handleAddUser = useCallback(
		(payload) => {
			setIsLoading(true);
			const { name, actualPrice, paid, mode, profile } = payload;
			const d = new Date();
			const date =
				d.getDate() +
				'/' +
				(d.getMonth() + 1) +
				'/' +
				d.getFullYear();

			const formData = new FormData();
			formData.append('name', name);

			formData.append('userImage', profile);
			const url = `${BASE_URL}/users/`;
			const headers = {
				headers: {
					Authorization: 'Bearer ' + adminPannel.token,
				},
			};
			axios
				.post(url, formData, headers)
				.then((res) => {
					handleState('User has been successfully added');
					setIsLoading(false);
				})
				.catch((e) => console.log(e))
				.finally(() => handleClose());
		},
		[adminPannel.token, handleClose, handleState],
	);

	const addNewUser = useCallback(() => {
		setContent(
			<NewUser
				handleClose={handleClose}
				handleAddUser={handleAddUser}
			/>,
		);
		setIsOpen(true);
	}, [handleAddUser, handleClose]);

	useEffect(() => {
		eventBus.on(EVENTS.ADD_NEW_USER, (payload) => {
			addNewUser();
		});
	}, [addNewUser]);

	return isLoading ? (
		<div className="loadingAnimation">
			<lottie-player
				src="https://assets4.lottiefiles.com/packages/lf20_cj0prrgw.json"
				background="transparent"
				speed="1"
				style={{ width: '50%' }}
				loop
				autoplay
			></lottie-player>
		</div>
	) : (
		<div>
			<DetailsCard />
			{users?.map((user) => (
				<UserDetailsCard {...user} key={user.id} />
			))}

			<BottomNav />

			{/* <CollapsibleTable users={users} /> */}
			<div className="unused"></div>
			<Snackbar
				open={open}
				autoHideDuration={5000}
				onClose={handleClose}
			>
				<Alert
					onClose={handleClose}
					severity="success"
					sx={{ width: '100%' }}
				>
					{message}!
				</Alert>
			</Snackbar>
			{/* <BottomNav /> */}
			<SimpleDialog
				isOpen={isOpen}
				handleClose={handleClose}
				content={content}
			/>
		</div>
	);
};

export default Dashboard;
