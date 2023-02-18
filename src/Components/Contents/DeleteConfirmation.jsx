import {
	Button,
	DialogActions,
	DialogTitle,
} from '@material-ui/core';
import React from 'react';

const DeleteConfirmation = ({
	handleClose,
	lable,
	id,
	deleteConfirmation,
	props,
}) => {
	return (
		<div className="deletePopup">
			<DialogTitle>{lable}</DialogTitle>
			<DialogActions>
				<Button onClick={() => handleClose()}>Cancle</Button>
				<Button
					onClick={() => deleteConfirmation(id || props)}
					autoFocus
				>
					Yes
				</Button>
			</DialogActions>
		</div>
	);
};

export default DeleteConfirmation;
