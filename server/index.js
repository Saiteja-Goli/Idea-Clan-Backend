const express = require('express');
const cors = require('cors');
const authRoutes = require('./src/routes/userRoutes');
const courseRoutes = require('./src/routes/courseRoutes');
const lectureRoutes = require('./src/routes/lecturesRoutes');
const enrollmentRoutes = require('./src/routes/enrollmentRoutes');
const verifyToken = require('./src/middleware/verifyToken');
const { connection } = require("./src/configs/db")

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
app.listen(process.env.PORT || 9000, async () => {
  try {
    await connection;
    console.log("connected to db");
    console.log("Listining on port 9000");
  } catch (error) {
    console.log("Error:", error);
  }
});
