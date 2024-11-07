// Get the client
import mysql from 'mysql2/promise';
import dotenv from 'dotenv'
// config env
dotenv.config()

// Create the connection to database
const connection = await mysql.createPool({
  host: process.env.DB_HOST,
  user:process.env.DB_USERNAME,
  password:process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});


export default connection;