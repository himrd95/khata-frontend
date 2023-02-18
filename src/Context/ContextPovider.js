import React, { createContext, useEffect, useState } from 'react';
import { EVENTS } from '../constants';
import eventBus from '../utils/eventBus';

export const provider = createContext();

const preToken = JSON.parse(localStorage.getItem('khata')) || {
	token: '',
	admin: {},
	voice: false,
};
const ContextPovider = ({ children }) => {
	const [state, setState] = useState(false);
	const [message, setMessage] = useState('');
	const [error, setError] = useState({ message: '', open: false });
	const [loginPopup, setLoginPopup] = useState(false);
	const [adminPannel, setAdminPannel] = useState(preToken);
	const [isLoading, setIsLoading] = React.useState(false);
	const [currentUser, setCurrentUser] = useState({});
	const [addTransaction, setAddTransaction] = useState(false);

	useEffect(() => {
		localStorage.setItem('khata', JSON.stringify(adminPannel));
	}, [adminPannel]);

	const handleState = (msg) => {
		setState(!state);
		setMessage(msg);
	};

	React.useEffect(() => {
		setTimeout(() => {
			setLoginPopup(false);
		}, 1000);
	}, [loginPopup]);

	const value = {
		state,
		handleState,
		message,
		setMessage,
		adminPannel,
		setAdminPannel,
		loginPopup,
		setLoginPopup,
		isLoading,
		setIsLoading,
		error,
		setError,
		currentUser,
		setCurrentUser,
		addTransaction,
		setAddTransaction,
	};
	return (
		<provider.Provider value={value}>{children}</provider.Provider>
	);
};

export default ContextPovider;
