import express from "express";
import {
  register,
  login,
  checkUser,
  getUser,
} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
console.log("Here is userRoute.js");
router.post("/register", register);
router.post("/login", login);
router.get("/check", authMiddleware, checkUser);
router.get("/:userId", getUser);

export default router;
