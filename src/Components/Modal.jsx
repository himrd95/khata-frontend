import * as React from 'react';
import { Dialog } from '@material-ui/core';

export default function SimpleDialog({
	isOpen,
	handleClose,
	content,
}) {
	return (
		<div>
			<Dialog onClose={handleClose} open={isOpen}>
				{content}
			</Dialog>
		</div>
	);
}
