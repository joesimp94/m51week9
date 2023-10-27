const { Router } = require("express");
const userRouter = Router();

const { hashPass, comparePass, verifyToken } = require("../middleware/");

const {
  getAllUsers,
  registerNewUser,
  loginUser,
  deleteUser,
  updateUser,
} = require("./controllers");

userRouter.get("/", getAllUsers);

userRouter.get("/authCheck", verifyToken, loginUser);

userRouter.post("/register", hashPass, registerNewUser);

userRouter.post("/login", comparePass, loginUser);

userRouter.delete("/", verifyToken, deleteUser);

userRouter.put("/update", verifyToken, updateUser);

module.exports = userRouter;
