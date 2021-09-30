import { Button } from '@material-ui/core';
import React, { useContext } from 'react';
import { provider } from '../../Context/ContextPovider';
import FadeMenu from './Menu';
import './Navbar.css';

const Navbar = () => {
	const { adminPannel, setLoginPopup } = useContext(provider);
	return (
		<div className='nav'>
			<div>
				{/* <lottie-player
					src='https://assets3.lottiefiles.com/packages/lf20_wmnfnun7.json'
					background='transparent'
					speed='1'
					style={{ width: '100px', height: '100px' }}
					loop
					autoplay
				></lottie-player> */}
				<lottie-player
					src='https://assets3.lottiefiles.com/packages/lf20_ta0fa7bj.json'
					background='transparent'
					speed='1'
					// loop
					style={{ width: '70px', height: '70px' }}
					autoplay
				></lottie-player>

				{adminPannel.token === '' ? (
					<Button
						onClick={() => {
							setLoginPopup(true);
						}}
						variant='contained'
						color='primary'
					>
						LogIn
					</Button>
				) : (
					<FadeMenu userName={adminPannel.admin.name.split(' ')[0]} />
				)}
			</div>
		</div>
	);
};

export default Navbar;
