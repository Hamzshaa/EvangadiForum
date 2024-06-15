import Answer from "../models/answer.model.js";
import Question from "../models/question.model.js";

export const postAnswer = async (req, res) => {
  try {
    const question = await Question.findById(req.params.questionId);

    if (!question) {
      return res.status(404).send("Question not found");
    }

    if (!req.body.answer) {
      return res.status(400).send("Answer is required");
    }

    const answer = await Answer.create({
      answer: req.body.answer,
      questionId: req.params.questionId,
      userId: req.user.userid,
    });

    if (!answer) {
      return res.status(500).send("Failed to post answer");
    }

    res.status(201).send("Answer posted");
  } catch (error) {
    console.error("Post answer error: ", error.message);
    return res.status(500).send("Server error");
  }
};

export const getAnswers = async (req, res) => {
  try {
    const question = await Question.findById(req.params.questionId);

    if (!question) {
      return res.status(404).send("Question not found");
    }

    const answers = await Answer.find({
      questionId: req.params.questionId,
    }).sort({ _id: -1 });

    res.send(answers);
  } catch (error) {
    console.error("Get answers error: ", error.message);
    return res.status(500).send("Server error");
  }
};
