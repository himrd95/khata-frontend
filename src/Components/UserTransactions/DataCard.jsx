import React, { useCallback, useContext, useEffect } from 'react';
import eventBus from '../../utils/eventBus';

import SimpleDialog from '../Modal';
import axios from 'axios';
import {
	Alert,
	Button,
	DialogActions,
	DialogTitle,
	Snackbar,
} from '@mui/material';
import UpdateUser from '../Table/UpdateUser';
import { provider } from '../../Context/ContextPovider';
import { BASE_URL, EVENTS, moneyFormate } from '../../constants';
import ButtonComponent from '../Button/Button';
import { useState } from 'react';

const DataCard = ({ data, title, total, bgColor, id, name }) => {
	const [isOpen, setIsOpen] = React.useState(false);
	const [open, setOpen] = React.useState(false);

	const [content, setContent] = React.useState('');
	const [details, setDetails] = useState(data);
	const {
		handleState,
		adminPannel,
		message,
		addTransaction,
		setAddTransaction,
	} = useContext(provider);

	const handleClose = useCallback(() => {
		setIsOpen(false);
		setAddTransaction(false);
		console.log('called');
	}, [setAddTransaction]);

	// Update main axios Function =>>>---------------------------------------------------------
	const updateRequest = useCallback(
		(payload) => {
			setIsOpen(false);
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
				.finally(() => handleClose());
		},
		[adminPannel.token, handleClose, handleState, id],
	);

	const handleUpdate = useCallback(
		(payload, _, edit, index, remove, mode) => {
			let updatedData = [...details];
			const d = new Date();
			const date =
				d.getDate() +
				'/' +
				(d.getMonth() + 1) +
				'/' +
				d.getFullYear();

			if (remove) {
				updatedData?.splice(index, 1);
			} else {
				if (!edit) {
					updatedData = [...updatedData, { ...payload, date }];
				} else {
					updatedData[index] = { ...payload, date };
				}
			}

			let sum = 0;
			updatedData?.forEach((item) => {
				sum += Number(item.actualPrice) - Number(item.paid);
			});

			mode = mode || title.split(' ')[0]?.toLowerCase();

			setDetails([...updatedData]);
			updateRequest({
				balance: sum,
				[mode]: updatedData,
			});
		},
		[details, title, updateRequest],
	);

	const editAndUpdate = useCallback(
		(row, index, remove, _mode) => {
			console.log('editAndUpdate');
			if (remove) {
				setContent(
					<div className="deletePopup">
						<DialogTitle>
							{`Do you really want to remove the transaction of ₹${data[index].actualPrice}?`}
						</DialogTitle>
						<DialogActions>
							<Button onClick={handleClose}>Cancle</Button>
							<Button
								onClick={() =>
									handleUpdate(
										'',
										row,
										false,
										index,
										remove,
										title.split(' ')[0]?.toLowerCase(),
									)
								}
								autoFocus
							>
								Yes
							</Button>
						</DialogActions>
					</div>,
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
		},
		[data, handleClose, handleUpdate, title],
	);

	const handleUpdateAdd = useCallback(
		(row) => {
			if (isOpen) {
				return;
			}
			console.log('handleUpdateAdd');
			setContent(
				<UpdateUser
					handleClose={handleClose}
					handleUpdate={handleUpdate}
					row={row}
					data={data}
					name={name}
				/>,
			);
			setAddTransaction(true);
		},
		[
			data,
			handleClose,
			handleUpdate,
			isOpen,
			name,
			setAddTransaction,
		],
	);

	const userActioons = (row, i) => {
		console.log('userAction');
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
		eventBus.on(EVENTS.ADD_NEW_TRANSACTION, (payload) => {
			handleUpdateAdd({ row: data });
		});

		return () => eventBus.remove(EVENTS.ADD_NEW_TRANSACTION);
	}, [data, handleUpdateAdd]);
	return (
		<>
			{data?.length !== 0 ? (
				<div className="basicCard transaction">
					<div
						style={{ backgroundColor: bgColor }}
						className="header"
					>
						<span className="title">{title}</span>
						<span className="title">{moneyFormate(total)}</span>
					</div>

					<div className="allTransaction">
						{details?.map((data, i) => (
							<div className="row">
								<div className="dateAndPurpose">
									<span className="date">{data.date}</span>
									<span className="purpose">{data.purpose}</span>
								</div>
								<span
									className="actualPrice"
									onClick={() => userActioons({ row: data }, i)}
								>
									<span>{moneyFormate(data.actualPrice)}</span>
									<i class="fa-solid fa-chevron-right"></i>
								</span>
							</div>
						))}
					</div>
				</div>
			) : null}
			<Snackbar
				open={open}
				autoHideDuration={5000}
				onClose={() => setOpen(false)}
			>
				<Alert
					onClose={() => setOpen(false)}
					severity="success"
					sx={{ width: '100%' }}
				>
					{message}!
				</Alert>
			</Snackbar>

			{isOpen ? (
				<SimpleDialog
					isOpen={isOpen}
					handleClose={handleClose}
					content={content}
				/>
			) : null}

			{addTransaction ? (
				<SimpleDialog
					isOpen={addTransaction}
					handleClose={handleClose}
					content={content}
				/>
			) : null}
		</>
	);
};

export default React.memo(DataCard);
