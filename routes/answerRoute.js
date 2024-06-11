import express from "express";
import { postAnswer, getAnswers } from "../controllers/answerController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

//  /api/answers/:questionId
// -> /api/answers/1

router.post("/:questionId", authMiddleware, postAnswer);
router.get("/:questionId", authMiddleware, getAnswers);

export default router;
