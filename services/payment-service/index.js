const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.post('/process-payment', (req, res) => {
  const { amount, method } = req.body;
  // Payment processing logic here
  res.json({ message: 'Payment processed', amount, method });
});

app.listen(PORT, () => {
  console.log(`Payment service running on port ${PORT}`);
});