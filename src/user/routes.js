const { Router } = require("express");
const userRouter = Router();

const { hashPass, comparePass } = require("../middleware/");

const { findAllUsers, registerNewUser, loginUser } = require("./controllers");

userRouter.get("/", findAllUsers);

userRouter.post("/register", hashPass, registerNewUser);

userRouter.post("/login", comparePass, loginUser);

module.exports = userRouter;
