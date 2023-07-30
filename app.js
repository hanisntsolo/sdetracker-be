const express = require('express');
const app = express();
const port = process.env.PORT || 3001; // Use the port specified in the environment variable or port 3001

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello, this is your Node.js backend!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});