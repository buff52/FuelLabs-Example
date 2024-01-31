const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const fuelDex = require('./fuelDex');

app.get('/', (req, res) => {
  res.send('Hello FuelLabs DApp!');
});

app.get('/balance/:address', (req, res) => {
  const address = req.params.address;
  res.json({ balance: fuelDex.balances[address] || 0 });
});

app.post('/deposit', (req, res) => {
  const { token, amount, address } = req.body;
  fuelDex.deposit(token, amount, address);
  res.json({ success: true });
});

app.post('/withdraw', (req, res) => {
  const { token, amount, address } = req.body;
  const success = fuelDex.withdraw(token, amount, address);
  res.json({ success });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
