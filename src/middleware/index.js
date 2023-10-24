const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

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

    req.user = await User.findOne({ where: { username: req.body.username } });
    console.log(req.user);
    if (!req.user) {
      res.status(401).json({ errormessage: "Invalid Username" });
      return;
    }

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      req.user.password
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

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    const decodedToken = await jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findOne({ where: { id: decodedToken.id } });

    if (!user) {
      const error = new Error("User is not Authorised");
      res.status(401).json({ errorMessage: error.message, error: error });
    }

    req.authCheck = user;

    next();
  } catch (error) {
    res.status(501).json({ errorMessage: error.message, error: error });
  }
};

module.exports = {
  hashPass,
  comparePass,
  verifyToken,
};
