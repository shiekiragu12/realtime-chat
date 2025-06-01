// generateSecretKey.js
const crypto = require('crypto');
const fs = require('fs');

// Generate a random secret key
const secretKey = crypto.randomBytes(32).toString('hex');

// Write the secret key to a .env file
fs.writeFileSync('.env', `SECRET_KEY=${secretKey}\n`);

console.log('Secret key generated and saved to .env file.');
