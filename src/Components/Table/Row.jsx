import React from 'react';
import './Table.css';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

function Row({ row, deleteUser, updateUser }) {
	const [open, setOpen] = React.useState(false);

	return (
		<React.Fragment>
			<TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
				<TableCell component='th' scope='row'>
					<span className='name'>{row.name}</span>
				</TableCell>
				<TableCell align='right'>{row.balance}</TableCell>
				<TableCell onClick={() => updateUser(row)} align='right'>
					{row.editButton}
				</TableCell>
				<TableCell
					onClick={() => deleteUser(row._id, row.name)}
					align='right'
				>
					{row.deleteButton}
				</TableCell>
				<TableCell align='right'>
					<IconButton
						aria-label='expand row'
						size='small'
						onClick={() => setOpen(!open)}
					>
						{open ? (
							<i className='fas fa-chevron-up'></i>
						) : (
							<i className='fas fa-chevron-down'></i>
						)}
					</IconButton>
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell
					style={{
						paddingBottom: 0,
						paddingTop: 0,
						background: '#5E8B7E',
					}}
					colSpan={6}
				>
					<Collapse in={open} timeout='auto' unmountOnExit>
						<Box sx={{ margin: 1 }}>
							<Typography variant='h6' gutterBottom component='div'>
								History
							</Typography>
							<Table size='small' aria-label='hystory'>
								<TableHead>
									<TableRow>
										<TableCell>Date</TableCell>
										<TableCell padding='none'>Actual</TableCell>
										<TableCell align='right'>Paid</TableCell>
										<TableCell align='right'>Balance</TableCell>
									</TableRow>
								</TableHead>

								<TableBody>
									{row.hystory?.map((historyRow, i) => (
										<TableRow key={new Date().getMilliseconds() + i}>
											<TableCell component='th' scope='row'>
												{historyRow.date}
											</TableCell>
											<TableCell padding='none'>
												{historyRow.actualPrice}
											</TableCell>
											<TableCell align='right'>
												{historyRow.paid}
											</TableCell>
											<TableCell align='right'>
												{historyRow.actualPrice - historyRow.paid}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	);
}

export default Row;
