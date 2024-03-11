const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const secretKey = 'ideaclan1234';
const tokenBlacklist = new Set();

exports.registerUser = async (req, res) => {

  try {
    const { name, username, email,password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User  already registered' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      role,
      username,
      password: hashedPassword,
    });
    await user.save();
    console.log(user);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ email: user.email, id : user.id }, secretKey, { expiresIn: '1h' });
    console.log(token,"LogIn Token");
    res.status(200).json({
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
      },
      message: "Login successfull",
      accessToken: token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.logoutUser = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    tokenBlacklist.add(token);
    res.status(200).json({ message: "Logout successful" });
  } else {
    res.status(400).json({ message: "Invalid token" });
  }
};

exports.test = async(req,res) => {
res.send("Tested successfully")
}


exports.getProfile = async (req, res) => {
  try {
    console.log(req.user);
    const userId = req.user.id;
    console.log(userId, "tested")
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.findByIdAndUpdate(req.user.id, { name, email }, { new: true });
    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


