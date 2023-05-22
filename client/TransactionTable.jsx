import * as React from 'react';
import { useState } from 'react';
import { Modal, Box, Typography } from '@mui/material';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector
} from '@mui/x-data-grid';


function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}


export const TransactionTable = ({ transactions, selectedOption }) => {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleRowClick = (transaction) => {
    setSelectedTransaction(transaction);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const columnsMap = {
    transactions: [
      { field: 'transactionDate', headerName: 'Date', width: 100 },
      { field: 'description', headerName: 'Description', width: 170 },
      { field: 'category', headerName: 'Category', width: 100 },
      { field: 'debit', headerName: 'Debit', width: 100 },
      { field: 'credit', headerName: 'Credit', width: 100 },
      { field: 'id', headerName: 'ID', width: 100 },
      { field: 'merchantStreetAddress', headerName: 'Merchant Address', width: 170 },
      { field: 'merchantCity', headerName: 'Merchant City', width: 100 },
      { field: 'merchantState', headerName: 'Merchant State', width: 100 },
      { field: 'merchantCountry', headerName: 'Merchant Country', width: 150 },
      { field: 'currency', headerName: 'Currency', width: 100 },
    ],
    topCategories: [
      { field: 'name', headerName: 'Category', width: 200 },
      { field: 'totalAmount', headerName: 'Transaction Volume', width: 200 },
    ],
    topMerchants: [
      { field: 'name', headerName: 'Merchant', width: 200 },
      { field: 'totalAmount', headerName: 'Transaction Volume', width: 200 },
    ],
  };

  const columns = selectedOption === 'top-categories' ? columnsMap['topCategories']
    : selectedOption === 'top-merchants' ? columnsMap['topMerchants'] : columnsMap['transactions'];

  const addIdToRows = (rows) => {
    return rows.map((row, index) => ({
      ...row,
      id: index,
    }));
  };

  return (
    <>
      <div
        style={{
          height: 600,
          width: '100%',
          borderRadius: 8,
          boxShadow: '2px 2px 4px rgba(0,0,0,0.1)',
          overflow: 'hidden',
        }}
      >
        <DataGrid
          rows={
            selectedOption === 'top-categories'
              || selectedOption === 'top-merchants'
              ? addIdToRows(transactions)
              : transactions
          }
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          onRowClick={
            (param) => handleRowClick(param.row)
          }
          slots={{
            toolbar: CustomToolbar,
          }}
        />
      </div>
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6">Row Details</Typography>
          {columns.map((column) => (
            <Typography key={column.field}>
              {column.headerName}: {selectedTransaction && selectedTransaction[column.field]}
            </Typography>
          ))}
        </Box>
      </Modal>
    </>
  )
};