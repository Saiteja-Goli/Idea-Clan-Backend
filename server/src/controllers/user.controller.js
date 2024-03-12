const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const secretKey = 'ideaclan1234';

exports.registerUser = async (req, res) => {
console.log("Entering to register")
try {
  const { name, email, username, password, role } = req.body;
  // Check if the email is already registered
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: 'Email already registered' });
  }
  // Hash the password before saving it
  const hashedPassword = await bcrypt.hash(password, 10);
  // Create a new user instance
  const newUser = new User({
    name,
    email,
    username,
    password: hashedPassword,
    role,
  });
  // Save the user to the database
  await newUser.save();
  // Generate a JWT token for the newly registered user
  const token = jwt.sign({ id: newUser._id }, secretKey);
  res.status(201).json({ message: 'User registered successfully', token });
} catch (error) {
  console.error('Registration failed:', error);
  res.status(500).json({ error: 'Internal server error' });
}
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ email: user.email, id: user.id }, secretKey);
    res.status(200).json({
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName, // Add other user data as needed
      },
      message: "Login successful",
      accessToken: token,
    });
  } catch (error) {
    res.status(500).json({ message: "Login error", error: error.message });
  }
};


exports.test = async (req, res) => {
  res.send("Tested successfully")
}

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user is authorized to access profile data based on role
    if (user.role !== 'student' && user.role !== 'admin') {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



