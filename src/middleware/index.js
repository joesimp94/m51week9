const bcrypt = require("bcrypt");

const User = require("../user/model");

const saltRounds = parseInt(process.env.SALT_ROUNDS);

const hashPass = async (req, res, next) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, saltRounds);
    next();
  } catch (error) {
    res.status(502).json({ errormessage: error.message, error });
  }
};

const comparePass = async (req, res, next) => {
  try {
    if (!req.body.username) {
      res.status(500).json({ message: "Username cannot be blank." });
      return;
    }

    const user = await User.findOne({ where: { username: req.body.username } });
    console.log(user);
    if (!user) {
      res.status(401).json({ errormessage: "Invalid Username" });
      return;
    }

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!passwordMatch) {
      res.status(401).json({ message: "Unauthorised Login!" });
      return;
    }
    next();
  } catch (error) {
    res.status(501).json({ errormessage: error.message, error });
  }
};

module.exports = {
  hashPass,
  comparePass,
};
