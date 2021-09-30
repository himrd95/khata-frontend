import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { provider } from '../../Context/ContextPovider';

export default function FadeMenu({ userName }) {
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
	return (
		<div>
			<Button
				sx={{ position: 'absolute', right: '5%', color: '#2bc3ff' }}
				id='fade-button'
				aria-controls='fade-menu'
				aria-haspopup='true'
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
			>
				<span style={{ marginLeft: '10px', color: 'whitesmoke' }}>
					<i className='fas fa-chevron-down'></i>{' '}
					<span style={{ margin: '0 5px' }}> Hi </span>
				</span>
				{userName} ...
			</Button>
			<Menu
				id='fade-menu'
				MenuListProps={{
					'aria-labelledby': 'fade-button',
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				TransitionComponent={Fade}
			>
				<MenuItem onClick={handleClose}>Profile</MenuItem>
				<MenuItem onClick={handleClose}>My account</MenuItem>
				<MenuItem onClick={handleLogOut}>Logout</MenuItem>
			</Menu>
		</div>
	);
}
