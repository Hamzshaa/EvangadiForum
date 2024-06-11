import { dbConn } from "../db/dbConfig.js";
import generateUniqueId from "generate-unique-id";

export const postQuestion = async (req, res) => {
  if (!req.body.title || !req.body.description) {
    return res.status(400).send("Title and description are required");
  }

  const questionId = generateUniqueId({
    length: 20,
  });

  console.log(questionId);

  let response = null;
  if (req.body.tag) {
    const [question] = await dbConn.query(
      "INSERT INTO questions (title, description, tag, userid, questionid) VALUES (?,?,?,?,?)",
      [
        req.body.title,
        req.body.description,
        req.body.tag,
        req.user.userid,
        questionId,
      ]
    );
    response = question;
  } else {
    const [question] = await dbConn.query(
      "INSERT INTO questions (title, description, userid) VALUES (?,?,?)",
      [req.body.title, req.body.description, req.user.userid]
    );
    response = question;
  }

  if (response?.length === 0) {
    return res.status(500).send("Failed to post question");
  }

  res.status(201).send("Question posted");
};

export const getQuestions = async (req, res) => {
  const [questions] = await dbConn.query("SELECT * FROM questions");
  questions.sort((a, b) => b.id - a.id);
  res.send(questions);
};

export const getQuestion = async (req, res) => {
  const [question] = await dbConn.query(
    "SELECT * FROM questions WHERE id = ?",
    [req.params.questionId]
  );

  if (question.length === 0) {
    return res.status(404).send("Question not found");
  }

  res.status(200).send(question);
};

export const searchQuestions = async (req, res) => {
  const [questions] = await dbConn.query(
    "SELECT * FROM questions WHERE title LIKE ?",
    [`%${req.params.searchQuery}%`]
  );
  res.status(200).send(questions);
};
