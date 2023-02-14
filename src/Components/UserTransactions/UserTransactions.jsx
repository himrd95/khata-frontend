import {
	Alert,
	Button,
	DialogActions,
	DialogTitle,
	Snackbar,
} from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { useRef } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { BASE_URL, EVENTS } from '../../constants';
import { provider } from '../../Context/ContextPovider';
import eventBus from '../../utils/eventBus';
import { compareDate } from '../../utils/helpers';
import DetailsCard from '../DetailsCard/DetailsCard';
import SimpleDialog from '../Modal';
import BottomNav from '../Navbar/BottomNav';
import DataCard from './DataCard';
import './UserTransactions.css';

const UserTransactions = () => {
	const { currentUser, adminPannel, handleState, message } =
		useContext(provider);
	const [user, setUser] = useState(currentUser);
	const [isLoading, setIsLoading] = React.useState(false);
	const [open, setOpen] = React.useState(false);
	const params = useParams();
	const [isOpen, setIsOpen] = React.useState(false);
	const [content, setContent] = React.useState('');
	const navigate = useNavigate();

	const {
		name,
		given,
		taken,
		userImage,
		totalGiven,
		totalTaken,
		_id,
	} = user;

	const givenRef = useRef(totalGiven);
	const takenRef = useRef(totalTaken);

	const getUsers = useCallback(
		(id) => {
			setIsLoading(true);

			let url;
			if (id) url = `${BASE_URL}/users/${id}`;
			else url = `${BASE_URL}/users/`;
			const headers = {
				headers: {
					Authorization: 'Bearer ' + adminPannel?.token,
				},
			};
			axios
				.get(url, headers)
				.then((res) => setUser(res.data))
				.catch((e) => console.log(e))
				.finally(() => setIsLoading(false));
		},
		[adminPannel?.token],
	);

	useEffect(() => {
		let sum1 = 0;
		given?.map(
			(a) => (sum1 += Number(a.actualPrice) - Number(a.paid)),
		);
		givenRef.current = sum1;

		let sum2 = 0;
		taken?.map(
			(a) => (sum2 += Number(a.actualPrice) - Number(a.paid)),
		);
		takenRef.current = sum2;

		if (!name) {
			getUsers(params.id);
		}

		eventBus.on(EVENTS.REFRESH_USER, () => {
			getUsers(params.id);
		});
	}, [
		user,
		getUsers,
		given,
		name,
		params.id,
		taken,
		totalGiven,
		totalTaken,
	]);

	const handleClose = useCallback(() => {
		setIsOpen(false);
		setOpen(false);
		handleState('');
	}, [handleState]);

	const deleteConfirmation = useCallback(
		(id) => {
			handleClose();
			const url = `${BASE_URL}/users/${id}`;
			const headers = {
				headers: {
					Authorization: 'Bearer ' + adminPannel.token,
				},
			};
			axios
				.delete(url, headers)
				.then(() => handleState('User has been successfully deleted'))
				.catch((e) => console.log(e))
				.finally(() => navigate('/'));
		},
		[adminPannel.token, handleClose, handleState, navigate],
	);

	const deleteUser = useCallback(
		(id, name) => {
			console.log('delete');
			setIsOpen(true);
			setContent(
				<div className="deletePopup">
					<DialogTitle>
						Do you really want to close account with {name}?
					</DialogTitle>
					<DialogActions>
						<Button onClick={handleClose}>Cancle</Button>
						<Button onClick={() => deleteConfirmation(id)} autoFocus>
							Yes
						</Button>
					</DialogActions>
				</div>,
			);
		},
		[deleteConfirmation, handleClose],
	);

	useEffect(() => {
		message !== '' && setOpen(true);
	}, [message]);

	return isLoading ? (
		<lottie-player
			src="https://assets4.lottiefiles.com/packages/lf20_cj0prrgw.json"
			background="transparent"
			speed="1"
			// style="width: 300px; height: 300px;"
			style={{ transform: 'translateY(150px)' }}
			loop
			autoplay
		></lottie-player>
	) : (
		<>
			<div className="main">
				<DetailsCard userName={name} profilePic={userImage} />

				<div className="basicCard actions">
					<span>Edit</span>
					<span onClick={() => deleteUser(_id, name)}>Delete</span>
				</div>

				<DataCard
					data={given?.sort((a, b) => compareDate(a.date, b.date))}
					title="Given (Debit)"
					total={givenRef.current}
					bgColor="#c5e1a5"
					id={_id}
					name={name}
				/>
				<DataCard
					data={taken?.sort((a, b) => compareDate(a.date, b.date))}
					title="Taken (Credit)"
					total={takenRef.current}
					bgColor="#ffcdd2"
					id={_id}
					name={name}
				/>

				<div style={{ height: '100px' }}></div>

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

				<SimpleDialog
					isOpen={isOpen}
					handleClose={handleClose}
					content={content}
				/>
			</div>
			<BottomNav />
		</>
	);
};

export default UserTransactions;
