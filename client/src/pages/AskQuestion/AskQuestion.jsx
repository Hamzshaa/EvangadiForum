import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./askQuestion.module.css";
import { useState } from "react";

export default function AskQuestion() {
  const [input, setInput] = useState({ title: "", description: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const MAX_TITLE_LENGTH = 50;

  console.log(input);

  const handleChange = (e) => {
    if (e.target.name === "title" && e.target.value.length > MAX_TITLE_LENGTH)
      return;
    setInput((prevInput) => ({
      ...prevInput,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (input.title.trim() == "" || input.description.trim() == "") {
      setError("Please fill all fields");
      return;
    }

    try {
      const { status, data } = await axios.post(`/api/questions`, input, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (status !== 201) {
        setError(data.message);
        return;
      }

      navigate("/");
      setInput({ title: "", description: "" });
    } catch (error) {
      setError(error.response.data.message);
      console.log(error);
    }
  };

  console.log((input.title.length / MAX_TITLE_LENGTH) * 100 + "%");
  return (
    <div className={styles.container}>
      <div className={styles.guide}>
        <h2>Steps to write a good question</h2>
        <ul>
          <li>Summerize your problem in a one-line title.</li>
          <li>Describe your problem in more detail.</li>
          <li>Describe what you tried and what you expected to happen.</li>
          <li>Review your Question and post it to the site.</li>
        </ul>
      </div>

      <div className={styles.askQuestion}>
        <h2>Ask Question</h2>
        <p>
          <Link to="/">Go to Question page</Link>
        </p>
        <form onSubmit={handleSubmit}>
          {error && <div className={styles.error}>{error}</div>}
          <input
            type="text"
            placeholder="Title"
            name="title"
            onChange={handleChange}
            value={input?.title}
          />
          <div className={styles.wordCounterContainer}>
            <div
              style={{
                width: (input.title.length / MAX_TITLE_LENGTH) * 100 + "%",
                backgroundColor:
                  input.title.length / MAX_TITLE_LENGTH > 0.75
                    ? "#ff7500"
                    : "#0dff00",
              }}
              className={styles.wordCounter}
            ></div>
          </div>
          <textarea
            placeholder="Your description here..."
            name="description"
            onChange={handleChange}
            value={input?.description}
          />
          <button type="submit">Ask Your Question</button>
        </form>
      </div>
    </div>
  );
}
