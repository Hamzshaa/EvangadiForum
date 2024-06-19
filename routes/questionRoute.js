import express from "express";
import {
  getQuestions,
  getQuestion,
  postQuestion,
  searchQuestions,
  favoriteQuestions,
  getFavoriteQuestions,
} from "../controllers/questionController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getQuestions);
router.put("/favorite/:questionId", authMiddleware, favoriteQuestions);
router.get("/favorite", authMiddleware, getFavoriteQuestions);
router.get("/:questionId", authMiddleware, getQuestion);
router.post("/", authMiddleware, postQuestion);
router.get("/search/:searchQuery", searchQuestions);

export default router;
