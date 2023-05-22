import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Container, CircularProgress, Select, MenuItem } from '@mui/material';
import { TransactionTable } from './TransactionTable';
import useSWR from 'swr';

const fetcher = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const App = () => {
  const [selectedOption, setSelectedOption] = React.useState('transactions');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const { data: transactions, error } = useSWR(`/${selectedOption}`, fetcher);

  if (error) {
    console.error('Error fetching data', error);
  }


  return (
    <Container maxWidth="xl">
      <Select
        value={selectedOption}
        onChange={handleOptionChange}
        sx={{ marginBottom: 2 }}
      >
        <MenuItem value="transactions">All Transactions</MenuItem>
        <MenuItem value="top-transactions">Top 10 Transactions</MenuItem>
        <MenuItem value="top-categories">Top Categories</MenuItem>
        <MenuItem value="top-merchants">Top 10 Merchants</MenuItem>
      </Select>
      {!transactions ? (
        <CircularProgress />
      ) : (
        <TransactionTable transactions={transactions} selectedOption={selectedOption} />
      )}
    </Container>
  );
};

const root = document.getElementById('root');
createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
