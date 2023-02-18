import React from 'react';
import './Button.css';

const ButtonComponent = ({
	label,
	handleClick,
	data,
	index,
	remove,
	mode,
	background,
}) => {
	return (
		<button
			className="buttomWrapper"
			style={{ background: background }}
			onClick={() => handleClick(data, index, remove, mode)}
		>
			{label}
		</button>
	);
};

export default ButtonComponent;
