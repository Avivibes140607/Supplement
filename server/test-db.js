require('dotenv').config();
const { testConnection } = require('./config/db');

async function runTest() {
  console.log('Testing database connection...');
  console.log('Environment:', process.env.NODE_ENV);
  
  const isConnected = await testConnection();
  
  if (isConnected) {
    console.log('\n✅ Database connection test passed!');
  } else {
    console.log('\n❌ Database connection test failed!');
  }
}

runTest(); 