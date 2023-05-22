const express = require('express')
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express()
app.use(cors());
const port = process.env.PORT || 3000;

const transactions = fs.readFileSync(path.resolve(__dirname, './transactions.json'), 'utf-8');

// API Endpoints
app.get('/transactions', (req, res) => {
  res.status(200).contentType('application/json').send(transactions);
})

app.get('/top-merchants', (req, res) => {
  const transactionsObj = JSON.parse(transactions);
  const merchants = new Map();
  transactionsObj.forEach(transaction => {
    if (transaction.category !== 'Payment/Credit') {
      const merchant = transaction.description;
      if (merchants.has(merchant)) {
        const currentTotal = merchants.get(merchant);
        merchants.set(merchant, currentTotal + parseFloat(transaction.debit));
      } else {
        merchants.set(merchant, parseFloat(transaction.debit));
      }
    }
  });

  const sortedMerchants = Array.from(merchants.entries()).sort((a, b) => b[1] - a[1]).slice(0, 10);
  const response = sortedMerchants.map(merchant => {
    return {
      name: merchant[0],
      totalAmount: merchant[1],
    };
  });

  res.status(200).contentType('application/json').send(response);
});

app.get('/top-transactions', (req, res) => {
  const transactionsObj = JSON.parse(transactions);
  const sortedTransactions = transactionsObj.sort((a, b) =>
    (parseFloat(b.debit) || parseFloat(b.credit)) -
    (parseFloat(a.debit) || parseFloat(a.credit)))
    .slice(0, 10);

  res.status(200).contentType('application/json').send(sortedTransactions);
});

app.get('/top-categories', (req, res) => {
  const transactionsObj = JSON.parse(transactions);
  const categories = new Map();
  transactionsObj.forEach(transaction => {
    const category = transaction.category;
    const amount = parseFloat(transaction.debit) || parseFloat(transaction.credit);
    if (categories.has(category)) {
      const currentTotal = categories.get(category);
      categories.set(category, currentTotal + amount);
    } else {
      categories.set(category, amount);
    }
  });

  const sortedCategories = Array.from(categories.entries()).sort((a, b) => b[1] - a[1]).slice(0, 10);
  const response = sortedCategories.map(category => {
    return {
      name: category[0],
      totalAmount: category[1],
    };
  });

  res.status(200).contentType('application/json').send(response);
});

// Serve static files
const publicDir = path.resolve(__dirname, '../public');
app.use(express.static(publicDir));
app.get('/', function(req, res) {
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.listen(port, () => {
  console.log(`Express listening at http://localhost:${port}`)
})