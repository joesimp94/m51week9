const User = require("./model");

const jwt = require("jsonwebtoken");

const findAllUsers = async (req, res) => {
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

const loginUser = async (req, res) => {
  console.log(req.user);
  try {
    const token = await jwt.sign({ id: req.user.id }, process.env.SECRET_KEY);
    res.status(201).json({
      message: "Success",
      user: req.user.username,
      token: token,
    });
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
  findAllUsers,
  registerNewUser,
  loginUser,
  deleteUser,
  updateUser,
};
