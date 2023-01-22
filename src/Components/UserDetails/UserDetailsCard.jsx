import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../constants';
import { provider } from '../../Context/ContextPovider';
import './UserDetailsCard.css';

import SimpleDialog from '../Modal';
import { Alert, Snackbar } from '@mui/material';

const UserDetailsCard = (props) => {
	const { name, given, taken, userImage, _id } = props;
	const [isOpen, setIsOpen] = React.useState(false);
	const [open, setOpen] = React.useState(false);
	const [content, setContent] = React.useState('');
	const { setCurrentUser, message } = useContext(provider);
	const navigate = useNavigate();
	let totalGiven = 0;

	given?.map(
		(a) => (totalGiven += Number(a.actualPrice) - Number(a.paid)),
	);
	let totalTaken = 0;
	taken?.map(
		(a) => (totalTaken += Number(a.actualPrice) - Number(a.paid)),
	);

	useEffect(() => {
		message !== '' && setOpen(true);
	}, [message]);

	const handleChangeRoute = () => {
		navigate(`${_id}`);
		setCurrentUser({ ...props, totalGiven, totalTaken });
	};

	const handleClose = () => {
		setIsOpen(false);
		setOpen(false);
	};

	console.log(`${BASE_URL}/${userImage}`, 'from dash');
	return (
		<div className="basicCard" onClick={() => handleChangeRoute()}>
			<div className="user">
				<span className="profilePicture">
					{!userImage ? (
						<i className="fas fa-user-circle"></i>
					) : (
						<img
							src={`${BASE_URL}/${userImage}`}
							alt="pofile_picture"
							width="40px"
						/>
					)}
				</span>
				<span className="userName">{name}</span>
			</div>
			<div
				style={
					totalGiven > totalTaken
						? { color: '#006300' }
						: { color: 'darkred' }
				}
				className="card_balance"
			>
				{totalGiven - totalTaken}
			</div>

			<i class="fa-solid fa-chevron-right"></i>

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
	);
};

export default UserDetailsCard;
