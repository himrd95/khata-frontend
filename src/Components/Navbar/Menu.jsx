import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { provider } from '../../Context/ContextPovider';

export default function FadeMenu({ userName, pic }) {
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
			<Button
				sx={{
					position: 'fixed',
					right: '5% !important',
					color: '#2bc3ff',
					display: 'flex',
					alignItems: 'center',
					zIndex: 10,
				}}
				id='fade-button'
				aria-controls='fade-menu'
				aria-haspopup='true'
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
			>
				{!pic ? (
					<i className='fas fa-user-circle'></i>
				) : (
					<img
						style={{
							width: '40px',
							height: '40px',
							borderRadius: '50%',
						}}
						src={`https://server-khata.herokuapp.com/${pic}`}
						alt='pofile_picture'
					/>
				)}
				<span style={{ marginLeft: '10px', color: 'whitesmoke' }}>
					<span
						style={{ margin: '0 5px', textTransform: 'capitalize' }}
					>
						{' '}
						Hi{' '}
					</span>
				</span>
				{userName}
				<span style={{ marginLeft: '10px', color: 'whitesmoke' }}>
					<i className='fas fa-chevron-down'></i>{' '}
				</span>
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
				<MenuItem onClick={handleVoice}>Turn {action} voice</MenuItem>
				<MenuItem onClick={handleClose}>My account</MenuItem>
				<MenuItem onClick={handleLogOut}>Logout</MenuItem>
			</Menu>
		</div>
	);
}
