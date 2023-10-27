const { Router } = require("express");
const userRouter = Router();

const {
  hashPass,
  comparePass,
  verifyToken,
  emailValidation,
} = require("../middleware/");

const {
  getAllUsers,
  registerNewUser,
  loginUser,
  deleteUser,
  updateUser,
} = require("./controllers");

userRouter.get("/", getAllUsers);

userRouter.get("/authCheck", verifyToken, loginUser);

userRouter.post("/register", hashPass, emailValidation, registerNewUser);

userRouter.post("/login", comparePass, loginUser);

userRouter.delete("/", verifyToken, deleteUser);

userRouter.put("/update", verifyToken, updateUser);

module.exports = userRouter;
