import express from 'express';
import { MongoClient, Db, Collection, ObjectId } from 'mongodb';

const app = express();
const port = process.env.PORT || 3001; // Use the port specified in the environment variable or port 3001

const uri = 'mongodb://hanisntsolo:zaq12wsx@localhost:27017/sdetracker';
// Replace "localhost" with the appropriate MongoDB host or IP address
// "sdetracker" is the database you want to connect to
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectToDatabase(): Promise<Db> {
  try {
    await client.connect();
    console.log('Connected to MongoDB successfully!');
    return client.db('sdetracker'); // Replace 'sdetracker' with your actual database name
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    throw err;
  }
}

async function getUserData(db: Db): Promise<void> {
  try {
    const usersCollection: Collection = db.collection('users');
    const users = await usersCollection.find().toArray();
    console.log('Users:', users);
  } catch (err) {
    console.error('Error fetching user data:', err);
  }
}

async function createUser(db: Db): Promise<void> {
  try {
    const usersCollection: Collection = db.collection('users');

    // The user document you want to insert
    const newUser = {
      username: 'john_doe',
      email: 'john.doe@example.com',
      password: 'usercreated', // You should store a hashed password, not the plain password
      role: 'user', // Optional: Add any other user-related data you need
    };

    const result = await usersCollection.insertOne(newUser);
    console.log('User created:', result.insertedId);
  } catch (err) {
    console.error('Error creating user:', err);
  }
}

// Call the functions to connect to the database and create a user
(async () => {
  try {
    const db = await connectToDatabase();
    await createUser(db);
    await getUserData(db);
  } catch (err) {
    console.error('Error:', err);
  }
})();

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
