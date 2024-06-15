import express from "express";
import { postAnswer, getAnswers } from "../controllers/answerController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:questionId", authMiddleware, postAnswer);
router.get("/:questionId", authMiddleware, getAnswers);

export default router;
