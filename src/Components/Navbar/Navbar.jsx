import { Button } from '@material-ui/core';
import React from 'react';
import './Navbar.css';

const Navbar = () => {
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
					loop
					style={{ width: '70px', height: '70px' }}
					autoplay
				></lottie-player>
				<Button variant='contained' color='primary'>
					Sign Out
				</Button>
			</div>
		</div>
	);
};

export default Navbar;
