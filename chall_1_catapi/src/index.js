const express = require('express');
const catRoutes = require('./routes/catRoutes');

// set up of the Express APP; 
// => it uses the routes defined in routes/catRoutes.js
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware: parse JSON reqs that match.
app.use(express.json());

// Routes base;
app.use('/api/v1', catRoutes);

module.exports = app;  // Export the app
