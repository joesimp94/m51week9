const { Router } = require("express");
const userRouter = Router();

const { hashPass, comparePass, verifyToken } = require("../middleware/");

const {
  findAllUsers,
  registerNewUser,
  loginUser,
  deleteUser,
  updateUser,
} = require("./controllers");

userRouter.get("/", findAllUsers);

userRouter.post("/register", hashPass, registerNewUser);

userRouter.post("/login", comparePass, verifyToken, loginUser);

userRouter.delete("/", verifyToken, deleteUser);

userRouter.put("/update", verifyToken, updateUser);

module.exports = userRouter;
