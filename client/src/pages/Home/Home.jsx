import { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppState } from "../../App";
import styles from "./home.module.css";
import { Link } from "react-router-dom";
import QuestionCard from "../../components/QuestionCard/QuestionCard";
import { IoSearch } from "react-icons/io5";

export default function Home() {
  const {
    user: { username },
  } = useContext(AppState);
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/questions", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const updatedQuestions = await Promise.all(
        data.map(async (question) => {
          const username = await getUsername(question.userId);
          return { ...question, username };
        })
      );

      setQuestions(updatedQuestions);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const getUsername = async (userId) => {
    const res = await axios.get(`/api/users/${userId}`);
    return res.data.username;
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (e.target.value.trim() === "") {
      fetchQuestions();
      return;
    }

    try {
      const { data } = await axios.get(
        `/api/questions/search/${e.target.value}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const updatedQuestions = await Promise.all(
        data.map(async (question) => {
          const username = await getUsername(question.userId);
          return { ...question, username };
        })
      );

      const searchTerm = e.target.value;

      updatedQuestions.forEach((question) => {
        const edited = question.title
          .split(searchTerm.trim())
          .join(`<span style="color: orange !important;">${searchTerm}</span>`);
        question.title = edited;
      });

      setQuestions(updatedQuestions);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.welcomeWrapper}>
        <div className={styles.button}>
          <Link to="/ask-question">Ask Question</Link>
        </div>
        <span className={styles.username}>Welcome {username}</span>
      </div>

      <div>
        <div className={styles.searchWrapper}>
          <p>Questions</p>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search Questions"
              className={styles.search}
              onChange={(e) => handleSearch(e)}
            />
            <button type="submit" className={styles.button}>
              <IoSearch />
            </button>
          </form>
        </div>
        <div className={styles.questionsWrapper}>
          {questions?.length == 0 && (
            <div className={styles.empty}>
              <img src="/empty.png" alt="empty" />
              <p>no question</p>
            </div>
          )}
          {questions.map((question, index) => (
            <QuestionCard
              key={question.id}
              question={question}
              isLast={index == questions.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
