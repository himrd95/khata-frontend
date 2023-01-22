import React from 'react';
import { provider } from '../../Context/ContextPovider';
import BottomNav from '../Navbar/BottomNav';

const Profile = () => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const { adminPannel, setAdminPannel } = React.useContext(provider);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogOut = () => {
		handleClose();
		setAdminPannel({
			token: '',
			admin: {},
		});
	};
	const handleVoice = () => {
		handleClose();
		setAdminPannel({ ...adminPannel, voice: !adminPannel.voice });
	};
	const action = adminPannel.voice ? 'off' : 'on';

	return (
		<div>
			<div onClick={handleVoice}>Turn {action} voice</div>
			<div onClick={handleClose}>My account</div>
			<div onClick={handleLogOut}>Logout</div>

			<BottomNav />
		</div>
	);
};

export default Profile;
