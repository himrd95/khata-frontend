import { Button, DialogTitle, DialogActions } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Styled from 'styled-components';
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
	return (
		<Container>
			<DialogTitle>
				Select the Transaction which you want to{' '}
				{remove ? 'Delete' : 'Edit'}
			</DialogTitle>
			<TableContainer>
				<Table sx={{ padding: '20px' }} aria-label='customized table'>
					<TableHead>
						<TableRow>
							<TableCell sx={{ padding: '10px 5px' }}>Date</TableCell>
							<TableCell sx={{ padding: '10px 5px' }}>
								Actual
							</TableCell>
							<TableCell sx={{ padding: '10px 5px' }} align='right'>
								Paid
							</TableCell>
							<TableCell sx={{ padding: '10px 5px' }} align='right'>
								Balance
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{row.hystory?.map((SingleRow, i) => (
							<TableRow
								key={SingleRow.date}
								onClick={() => editAndUpdate(row, i, remove)}
							>
								<TableCell sx={{ padding: '10px 5px' }}>
									{SingleRow.date}
								</TableCell>
								<TableCell sx={{ padding: '10px 5px' }}>
									{SingleRow.actualPrice}
								</TableCell>
								<TableCell sx={{ padding: '10px 5px' }} align='right'>
									{SingleRow.paid}
								</TableCell>
								<TableCell sx={{ padding: '10px 5px' }} align='right'>
									{SingleRow.actualPrice - SingleRow.paid}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
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
