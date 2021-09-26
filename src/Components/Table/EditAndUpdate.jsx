import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import './Table.css';

export default function DataTable({
	handleClose,
	row,
	editAndUpdate,
	remove,
}) {
	return (
		<div style={{ height: 400 }}>
			<TableContainer>
				<Table sx={{ padding: '20px' }} aria-label='customized table'>
					<TableHead>
						<TableRow>
							<TableCell sx={{ width: 100 }}>Date</TableCell>
							<TableCell sx={{ width: 60 }}>Actual</TableCell>
							<TableCell sx={{ width: 50 }} align='right'>
								Paid
							</TableCell>
							<TableCell sx={{ width: 50 }} align='right'>
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
								<TableCell sx={{ width: 100 }}>
									{SingleRow.date}
								</TableCell>
								<TableCell sx={{ width: 60 }}>
									{SingleRow.actualPrice}
								</TableCell>
								<TableCell sx={{ width: 50 }} align='right'>
									{SingleRow.paid}
								</TableCell>
								<TableCell sx={{ width: 50 }} align='right'>
									{SingleRow.actualPrice - SingleRow.paid}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
}
