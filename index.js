const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import the cors middleware

const app = express();
const User = require('./models/item'); // Import the User model

// Use CORS middleware
app.use(cors());

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello from Node API Server Updated");
});

app.post("/api/register", async (req, res) => {
  try {
    const {name , phone, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({ name, phone, email, password });
    await user.save();

    console.log("New User Registered:", user); // Log the new user to the console

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
});


app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error: error.message });
  }
});



// LogIn 
app.post("/api/login", async (req, res) => {
  try {
    const { phone, password } = req.body;

    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    console.log("User logged in successfully:", user); // Log successful login
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
});



mongoose
  .connect(
    "mongodb+srv://alif102:ezicalc@cluster0.bdcjm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to database!");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  });
