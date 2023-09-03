// app.js

const express = require('express');
const catRoutes = require('./routes/catRoutes');
const db = require('./models');

const app = express();

// Middleware
app.use(express.json());
app.use('/cataas', catRoutes); // 

// Sync database and then start server
db.sequelize.sync().then(() => {
  const PORT = 3001; // Changed port to 3001
  //
  //const PORT = process.env.NODE_ENV === 'test' ? 3002 : 3001;

  console.log("here")
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/`);
  });
});
module.exports = app;  // Export the app