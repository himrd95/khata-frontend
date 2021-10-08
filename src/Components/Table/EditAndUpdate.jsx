import {
	Button,
	DialogTitle,
	DialogActions,
	Typography,
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useContext, useEffect } from 'react';
import Styled from 'styled-components';
import { provider } from '../../Context/ContextPovider';
import speak from '../../utils/spetch';
import './Table.css';

const Container = Styled.div`
padding:10px;
text-align:center;
width:fit-content;
margin:auto;
height:fit-content;
`;
export default function DataTable({
	handleClose,
	row,
	editAndUpdate,
	remove,
}) {
	const { adminPannel } = useContext(provider);
	const action = remove ? 'Delete' : 'Edit';
	useEffect(() => {
		adminPannel.voice &&
			speak(`Select the Transaction which you want to
				${action}`);
	}, []);

	return (
		<Container>
			<DialogTitle>
				Select the Transaction which you want to {action}
			</DialogTitle>
			<TableContainer>
				{row.given.length > 0 && (
					<div>
						<Typography
							variant='h6'
							sx={{
								marginTop: '15px',
								color: 'green',
							}}
							component='div'
						>
							<span style={{ marginRight: '10px' }}>Given</span>
							<i className='fas fa-arrow-alt-circle-up'></i>
						</Typography>
						<Table
							sx={{ padding: '20px' }}
							aria-label='customized table'
						>
							<TableHead>
								<TableRow>
									<TableCell sx={{ padding: '10px 5px' }}>
										Date
									</TableCell>
									<TableCell sx={{ padding: '10px 5px' }}>
										Actual
									</TableCell>
									<TableCell
										sx={{ padding: '10px 5px' }}
										align='right'
									>
										Paid
									</TableCell>
									<TableCell
										sx={{ padding: '10px 5px' }}
										align='right'
									>
										Balance
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{row.given?.map((SingleRow, i) => (
									<TableRow
										sx={{ cursor: 'pointer' }}
										key={SingleRow.actualPrice + SingleRow.paid}
										onClick={() =>
											editAndUpdate(row, i, remove, 'given')
										}
									>
										<TableCell sx={{ padding: '10px 5px' }}>
											{SingleRow.date}
										</TableCell>
										<TableCell sx={{ padding: '10px 5px' }}>
											{SingleRow.actualPrice}
										</TableCell>
										<TableCell
											sx={{ padding: '10px 5px' }}
											align='right'
										>
											{SingleRow.paid}
										</TableCell>
										<TableCell
											sx={{ padding: '10px 5px' }}
											align='right'
										>
											{SingleRow.actualPrice - SingleRow.paid}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				)}

				{row.taken.length > 0 && (
					<div>
						<Typography
							variant='h6'
							sx={{
								marginTop: '15px',
								color: 'darkred',
							}}
							component='div'
						>
							<span style={{ marginRight: '10px' }}>Taken</span>
							<i className='fas fa-arrow-alt-circle-down'></i>
						</Typography>
						<Table
							sx={{ padding: '20px' }}
							aria-label='customized table'
						>
							<TableHead>
								<TableRow>
									<TableCell sx={{ padding: '10px 5px' }}>
										Date
									</TableCell>
									<TableCell sx={{ padding: '10px 5px' }}>
										Actual
									</TableCell>
									<TableCell
										sx={{ padding: '10px 5px' }}
										align='right'
									>
										Paid
									</TableCell>
									<TableCell
										sx={{ padding: '10px 5px' }}
										align='right'
									>
										Balance
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{row.taken?.map((SingleRow, i) => (
									<TableRow
										key={
											SingleRow.date +
											SingleRow.actualPrice +
											SingleRow.paid
										}
										onClick={() =>
											editAndUpdate(row, i, remove, 'taken')
										}
									>
										<TableCell sx={{ padding: '10px 5px' }}>
											{SingleRow.date}
										</TableCell>
										<TableCell sx={{ padding: '10px 5px' }}>
											{SingleRow.actualPrice}
										</TableCell>
										<TableCell
											sx={{ padding: '10px 5px' }}
											align='right'
										>
											{SingleRow.paid}
										</TableCell>
										<TableCell
											sx={{ padding: '10px 5px' }}
											align='right'
										>
											{SingleRow.actualPrice - SingleRow.paid}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				)}
			</TableContainer>
			<br />
			<br />
			<br />

			<DialogActions>
				<Button variant='outlined' onClick={handleClose}>
					Close
				</Button>
			</DialogActions>
		</Container>
	);
}
