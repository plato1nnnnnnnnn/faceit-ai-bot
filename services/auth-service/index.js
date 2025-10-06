const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Authentication logic here
  res.json({ message: 'Login successful', username });
});

app.listen(PORT, () => {
  console.log(`Auth service running on port ${PORT}`);
});