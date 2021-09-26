import React, { createContext, useState } from 'react';

export const provider = createContext();
const ContextPovider = ({ children }) => {
	const [state, setState] = useState(false);
	const [message, setMessage] = useState('');
	const handleState = (msg) => {
		setState(!state);
		setMessage(msg);
	};
	const value = { state, handleState, message };
	return (
		<provider.Provider value={value}>{children}</provider.Provider>
	);
};

export default ContextPovider;
