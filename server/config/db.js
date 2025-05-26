const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: '147.93.109.141',
  user: 'u838965360_HSF2',
  password: 'RahulHSF@2025',
  database: 'u838965360_HSF',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test database connection
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Database connected successfully');
    console.log('Connection details:', {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      database: process.env.DB_NAME
    });
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Error connecting to the database:', error.message);
    console.log('Please check your .env file and make sure:');
    console.log('1. All database credentials are correct');
    console.log('2. The database exists');
    console.log('3. The user has proper permissions');
    return false;
  }
}

// Export both pool and test function
module.exports = { pool, testConnection }; 