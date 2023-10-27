const User = require("./model");
require("dotenv").config()
const jwt = require("jsonwebtoken");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({});

    if (users.length >= 1) {
      res.status(200).json({ message: "success", users });
      return;
    }
    res.status(404).json({ message: "failure" });
  } catch (error) {
    res.status(500).json({ message: error.message, error });
  }
};

const registerNewUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({ message: "Success!", newUser });
  } catch (error) {
    res.status(500).json({ message: error.message, error });
  }
};
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjk4MzMxMjIyfQ
//   .jZWMIpSA7y_25lrkvEs -
//   CjFVvdUqg -
//   zye217YMbmIJw;
const loginUser = async (req, res) => {
  console.log(process.env.SECRET_KEY);
  try {
    if (req.user) {
      const token = await jwt.sign({ id: req.user.id }, process.env.SECRET_KEY);
      console.log(token);
      res.status(201).json({
        message: "Success",
        user: {
          username: req.user.username,
          email: req.user.email,
          token,
        },
      });
      return;
    }
    if (req.authCheck) {
      res.status(200).json({ message: "Success", user });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deleteSingleUser = await User.destroy({
      where: { username: req.body.username },
    });
    res.status(201).json({ message: "Success!", deleteSingleUser });
  } catch (error) {
    res.status(500).json({ message: error.message, error });
  }
};

const updateUser = async (req, res) => {
  try {
    const updateSingleUser = await User.update(
      { username: req.body.newUsername },
      { where: { username: req.body.username } }
    );
    res.status(201).json({ message: "Success!", updateSingleUser });
  } catch (error) {
    res.status(500).json({ message: error.message, error });
  }
};

module.exports = {
  getAllUsers,
  registerNewUser,
  loginUser,
  deleteUser,
  updateUser,
};
