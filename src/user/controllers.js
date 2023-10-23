const User = require("./model");

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
  try {
    res.status(201).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ message: error.message, error });
  }
};

module.exports = {
  findAllUsers,
  registerNewUser,
  loginUser,
};
