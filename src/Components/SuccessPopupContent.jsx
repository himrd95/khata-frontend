import React from 'react';
import { Button } from '@material-ui/core';
import Styled from 'styled-components';

const Container = Styled.div`
padding:15px;
text-align:center;
width:fit-content
`;

const InnerDiv = Styled.div`
text-align:center;
width:fit-content
margin:15px;
border:5px solid darkblue;
padding:15px;
border-radius:8px;
`;

const IconDiv = Styled.div`
color:green;
font-size:80px;
`;
export const SuccessPopupContent = ({ handleLoginModal }) => {
	return (
		<Container>
			<InnerDiv>
				<IconDiv>
					<i className='fas fa-check-circle'></i>
				</IconDiv>
				<h3>You are successfully registered!</h3>
				<Button
					onClick={() => handleLoginModal()}
					variant='contained'
					color='primary'
				>
					Login
				</Button>
			</InnerDiv>
		</Container>
	);
};
