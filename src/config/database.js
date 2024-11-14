require('dotenv').config();
// console.log('Mongo URI:', process.env.MONGO_URI);
const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGO_URI);

async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db('EmployeeManagementBackend');
  } catch (error) {
    console.error('Could not connect to MongoDB', error);
    process.exit(1);
  }
}

module.exports = connectDB;
