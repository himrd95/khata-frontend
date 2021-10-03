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

	let totalGiven = 0;
	row.given?.map(
		(a, e) => (totalGiven += Number(a.actualPrice) - Number(a.paid)),
	);
	let totalTaken = 0;
	row.taken?.map(
		(a, e) => (totalTaken += Number(a.actualPrice) - Number(a.paid)),
	);

	return (
		<React.Fragment>
			<TableRow sx={{ borderTop: '2px solid #eee' }}>
				<TableCell component='th' scope='row'>
					<span className='name'>{row.name}</span>
				</TableCell>
				<TableCell
					sx={{ padding: '10px', fontWeight: '600' }}
					style={
						totalGiven > totalTaken
							? { color: 'green' }
							: { color: 'darkred' }
					}
					align='right'
				>
					{totalGiven > totalTaken ? (
						totalGiven - totalTaken
					) : (
						<span>
							<span>- </span>
							{totalTaken - totalGiven}
						</span>
					)}
				</TableCell>
				<TableCell onClick={() => updateUser(row)} align='right'>
					{row.editButton}
				</TableCell>
				<TableCell
					sx={{ padding: '10px' }}
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
			<TableRow
				sx={{
					height: '3px',
				}}
			></TableRow>
			<TableRow>
				<TableCell
					style={{
						paddingBottom: 0,
						paddingTop: 0,
						background:
							'linear-gradient(90deg, rgba(94,139,126,1) 0%, rgba(99,158,140,1) 42%, rgba(125,187,134,1) 100%)',
					}}
					colSpan={6}
				>
					<Collapse in={open} timeout='auto' unmountOnExit>
						<Box sx={{ margin: 1 }}>
							{row.given.length !== 0 && (
								<div>
									<Typography
										variant='h5'
										sx={{
											color: 'green',
										}}
										gutterBottom
										component='div'
									>
										<span style={{ marginRight: '10px' }}>Given</span>
										<i className='fas fa-arrow-alt-circle-up'></i>
										<span style={{ marginLeft: '25%' }}>
											Total : {totalGiven}
										</span>
									</Typography>
									<Table size='small' aria-label='given'>
										<TableHead>
											<TableRow>
												<TableCell>Date</TableCell>
												<TableCell padding='none'>Actual</TableCell>
												<TableCell align='right'>Paid</TableCell>
												<TableCell align='right'>Balance</TableCell>
											</TableRow>
										</TableHead>

										<TableBody>
											{row.given?.map((historyRow, i) => (
												<TableRow
													key={new Date().getMilliseconds() + i}
												>
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
								</div>
							)}

							{row.taken.length !== 0 && (
								<div>
									<Typography
										variant='h5'
										sx={{
											marginTop: '15px',
											color: 'darkred',
										}}
										component='div'
									>
										<span style={{ marginRight: '10px' }}>Taken</span>
										<i className='fas fa-arrow-alt-circle-down'></i>
										<span style={{ marginLeft: '25%' }}>
											Total : {totalTaken}
										</span>
									</Typography>
									<Table size='small' aria-label='taken'>
										<TableHead>
											<TableRow>
												<TableCell>Date</TableCell>
												<TableCell padding='none'>Actual</TableCell>
												<TableCell align='right'>Paid</TableCell>
												<TableCell align='right'>Balance</TableCell>
											</TableRow>
										</TableHead>

										<TableBody>
											{row.taken?.map((historyRow, i) => (
												<TableRow
													key={new Date().getMilliseconds() + i}
												>
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
								</div>
							)}
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	);
}

export default Row;
