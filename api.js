const serverless = require('serverless-http');
const app = require('../backend/server');

// This wraps your Express app into a Netlify-compatible function
module.exports.handler = serverless(app);
