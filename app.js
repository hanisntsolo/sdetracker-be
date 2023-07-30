const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = process.env.PORT || 3001; // Use the port specified in the environment variable or port 3001

const uri = 'mongodb://hanisntsolo:zaq12wsx@localhost:27017/sdetracker';
// Replace "localhost" with the appropriate MongoDB host or IP address
// "sdetracker" is the database you want to connect to
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB successfully!');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}


connectToDatabase();

async function getUserData() {
  try {
    const db = client.db('sdetracker'); // Replace 'mydatabase' with your actual database name
    const usersCollection = db.collection('users');
    const users = await usersCollection.find().toArray();
    console.log('Users:', users);
  } catch (err) {
    console.error('Error fetching user data:', err);
  }
}

getUserData();


// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello, this is your Node.js backend!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

process.on('SIGINT', () => {
  client.close().then(() => {
    console.log('MongoDB connection closed.');
    process.exit(0);
  });
});
