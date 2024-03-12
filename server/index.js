const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./src/routes/userRoutes');
const courseRoutes = require('./src/routes/courseRoutes');
const lectureRoutes = require('./src/routes/lecturesRoutes');
const enrollmentRoutes = require('./src/routes/enrollmentRoutes');
const verifyToken = require('./src/middleware/verifyToken');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8090;

// Middleware
app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log("Method:", req.method, req.url);
  next();
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.get("/", (req, res) => {
  res.send("WELCOME TO SERVER...!");
});

// Applying verifyToken middleware to routes that require authentication
app.use('/', authRoutes);

app.use('/', courseRoutes);
app.use('/', lectureRoutes);
app.use('/', enrollmentRoutes);

// Server listening
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
