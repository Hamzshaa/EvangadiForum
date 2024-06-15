import Question from "../models/question.model.js";
import User from "../models/user.model.js";

export const postQuestion = async (req, res) => {
  if (!req.body.title || !req.body.description) {
    return res.status(400).send("Title and description are required");
  }

  const user = User.findById(req.user.userid);

  if (!user) {
    return res.status(404).send("User not found");
  }

  try {
    let question = null;
    if (req.body.tag) {
      question = await Question.create({
        title: req.body.title,
        description: req.body.description,
        tag: req.body.tag,
        userId: req.user.userid,
      });
    } else {
      question = await Question.create({
        title: req.body.title,
        description: req.body.description,
        userId: req.user.userid,
      });
    }

    if (!question) {
      return res.status(500).send("Failed to post question");
    }

    res.status(201).send("Question posted");
  } catch (error) {
    console.error("Post question error: ", error.message);
    return res.status(500).send("Server error");
  }
};

export const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find().sort({ _id: -1 });
    res.send(questions);
  } catch (error) {
    console.error("Get questions error: ", error.message);
    return res.status(500).send("Server error");
  }
};

export const getQuestion = async (req, res) => {
  try {
    const question = await Question.findOne({
      _id: req.params.questionId,
    });

    if (!question) {
      return res.status(404).send("Question not found");
    }

    res.status(200).send(question);
  } catch (error) {
    console.error("Get question error: ", error.message);
    return res.status(500).send("Server error");
  }
};

export const searchQuestions = async (req, res) => {
  try {
    const questions = await Question.find({
      title: { $regex: req.params.searchQuery, $options: "i" },
    });
    res.status(200).send(questions);
  } catch (error) {
    console.error("Search questions error: ", error.message);
    return res.status(500).send("Server error");
  }
};
