import React, { useCallback, useContext, useEffect } from 'react';
import eventBus from '../../utils/eventBus';

import SimpleDialog from '../Modal';
import axios from 'axios';
import {
	Alert,
	Button,
	DialogActions,
	Snackbar,
} from '@mui/material';
import UpdateUser from '../Table/UpdateUser';
import { provider } from '../../Context/ContextPovider';
import { BASE_URL, EVENTS } from '../../constants';
import ButtonComponent from '../Button/Button';

const DataCard = ({ data, title, total, bgColor, id, name }) => {
	const [isOpen, setIsOpen] = React.useState(false);
	const [open, setOpen] = React.useState(false);
	const [content, setContent] = React.useState('');
	const { setCurrentUser, handleState, adminPannel, message } =
		useContext(provider);

	console.log(data);

	const handleClose = () => {
		setIsOpen(false);
	};

	// Update main axios Function =>>>---------------------------------------------------------
	const updateRequest = useCallback(
		(payload) => {
			handleClose();
			const url = `${BASE_URL}/users/${id}`;
			const headers = {
				headers: {
					Authorization: 'Bearer ' + adminPannel.token,
				},
			};
			axios
				.patch(url, payload, headers)
				.then((_res) => {
					handleState('User has been successfully updated');
				})
				.catch((e) => console.log(e))
				.finally(() => eventBus.dispatch(EVENTS.REFRESH_USER, true));
		},
		[adminPannel.token, handleState, id],
	);

	const handleUpdate = useCallback(
		(payload, _, edit, index, remove, mode) => {
			const d = new Date();
			const date =
				d.getDate() +
				'/' +
				(d.getMonth() + 1) +
				'/' +
				d.getFullYear();

			console.log(data, 'data');
			if (remove) {
				data?.splice(index, 1);
			} else {
				if (!edit) {
					data = [...data, { ...payload, date }];
				} else {
					data[index] = { ...payload, date };
				}
			}

			let sum = 0;
			data?.forEach((item) => {
				sum += Number(item.actualPrice) - Number(item.paid);
			});

			mode = mode || title.split(' ')[0]?.toLowerCase();

			updateRequest({
				balance: sum,
				[mode]: data,
			});
		},
		[title, updateRequest],
	);

	const editAndUpdate = (row, index, remove, _mode) => {
		if (remove) {
			handleUpdate(
				'',
				row,
				false,
				index,
				remove,
				title.split(' ')[0]?.toLowerCase(),
			);
			return;
		}
		setContent(
			<UpdateUser
				handleClose={handleClose}
				handleUpdate={handleUpdate}
				row={row}
				edit={true}
				index={index}
				mode={title.split(' ')[0]?.toLowerCase()}
				data={data}
			/>,
		);
	};

	const handleUpdateAdd = useCallback(
		(row) => {
			setContent(
				<UpdateUser
					handleClose={handleClose}
					handleUpdate={handleUpdate}
					row={row}
					data={data}
					name={name}
				/>,
			);
		},
		[data, handleUpdate, name],
	);

	const updateUser = (row, i) => {
		setIsOpen(true);
		setContent(
			<div className="editModal">
				<ButtonComponent
					label="Edit trasection"
					data={row}
					handleClick={editAndUpdate}
					remove={false}
					mode={title.split(' ')[0]}
					index={i}
				/>
				<ButtonComponent
					label="Remove trasection"
					data={row}
					handleClick={editAndUpdate}
					remove={true}
					mode={title.split(' ')[0]}
					index={i}
				/>
				<br />
				<br />
				<DialogActions>
					<Button variant="outlined" onClick={handleClose}>
						Do nothing
					</Button>
				</DialogActions>
			</div>,
		);
	};

	useEffect(() => {
		eventBus.on(EVENTS.ADD_NEW_TRANSACTION, (_payload) => {
			setIsOpen(true);
			handleUpdateAdd({ row: data });
		});
	}, [data, handleUpdateAdd]);

	return data?.length !== 0 ? (
		<div className="basicCard transaction">
			<div style={{ backgroundColor: bgColor }} className="header">
				<span className="title">{title}</span>
				<span className="title">{total}</span>
			</div>

			<div className="allTransaction">
				{data?.map((data, i) => (
					<div className="row">
						<span className="date">{data.date}</span>
						<span className="purpose">{data.purpose}</span>
						<span
							className="actualPrice"
							onClick={() => updateUser({ row: data }, i)}
						>
							<span>{data.actualPrice}</span>
							<i class="fa-solid fa-chevron-right"></i>
						</span>
					</div>
				))}
			</div>

			<Snackbar
				open={open}
				autoHideDuration={5000}
				onClose={handleClose}
			>
				<Alert
					onClose={handleClose}
					severity="success"
					sx={{ width: '100%' }}
				>
					{message}!
				</Alert>
			</Snackbar>

			<SimpleDialog
				isOpen={isOpen}
				handleClose={handleClose}
				content={content}
			/>
		</div>
	) : null;
};

export default DataCard;
