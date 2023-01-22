import React from 'react';
import './Button.css';

const ButtonComponent = ({
	label,
	handleClick,
	data,
	index,
	remove,
	mode,
}) => {
	return (
		<button
			className="buttomWrapper"
			onClick={() => handleClick(data, index, remove, mode)}
		>
			{label}
		</button>
	);
};

export default ButtonComponent;
