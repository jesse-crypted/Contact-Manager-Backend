const express = require('express');
const connectDb = require('./config/dbConnection');

const errorHandler = require('./middleware/errorHandler');
const dotenv = require('dotenv').config();

const contactRouter = require('./routes/contactRoutes');
const userRouter = require('./routes/userRoutes');

connectDb();
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json()); // Helps to parse Json data from request body

// Route Handler
app.use('/api/v1/contacts', contactRouter);
app.use('/api/v1/users', userRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`
  ################################################
  🛡️  server running on port ${port} 🛡️
  ################################################
  `);
});
