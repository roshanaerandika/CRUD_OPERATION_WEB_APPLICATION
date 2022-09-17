const express = require("express");
const mongoose = require("mongoose");
const { User } = require("./models");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/users", async (req, res) => {
  const allUsers = await User.find();
  return res.status(200).json(allUsers);
});

app.post("/user", async (req, res) => {
  const newUser = new User({ ...req.body });
  const insertedUser = await newUser.save();
  return res.status(201).json(insertedUser);
});

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://crudApp:cpT4svcvqxPBux3T@cluster0.6ovdequ.mongodb.net/?retryWrites=true&w=majority"
    );
    app.listen(5000, () => console.log("Server started on port 5000"));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
