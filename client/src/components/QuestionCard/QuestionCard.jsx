import { Link } from "react-router-dom";
import propTypes from "prop-types";
import styles from "./questionCard.module.css";
import { BsPersonCircle } from "react-icons/bs";
import { MdNavigateNext } from "react-icons/md";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "../../axiosConfig";

export default function QuestionCard({
  question,
  isLast,
  isFetchingFavorite,
  setQuestions,
}) {
  const [showDescription, setShowDescription] = useState(false);
  const [isFavorite, setIsFavorite] = useState(question.is_favorite);

  const handleFavorite = async () => {
    const { data } = await axios.put(
      `/questions/favorite/${question.id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (data.message == "Question removed from favorites") {
      if (isFetchingFavorite) {
        setQuestions((prev) => prev.filter((q) => q.id !== question.id));
      }
      setIsFavorite(false);
    } else {
      setIsFavorite(true);
    }
  };

  return (
    <div className={`${styles.Container}  ${!isLast && styles.border}`}>
      <div key={question?.id} className={`${styles.question}`}>
        <div>
          <div className={styles.user}>
            <BsPersonCircle className={styles.userAvatar} />
            <span>{question?.username}</span>
          </div>

          {/* <Link to={`/question/${question?.id}`} className={styles.title}>
            {question?.title}
          </Link> */}
          <div className={styles.titleWrapper}>
            <Link
              to={`/question/${question?.id}`}
              className={styles.title}
              dangerouslySetInnerHTML={{
                __html: question?.title,
              }}
            ></Link>
            {isFavorite ? (
              <FaHeart
                onClick={handleFavorite}
                style={{ color: "red", cursor: "pointer" }}
              />
            ) : (
              <FaRegHeart
                onClick={handleFavorite}
                style={{ cursor: "pointer" }}
              />
            )}
          </div>
        </div>
        <MdNavigateNext
          className={`${styles.nextIcon} ${
            showDescription && styles.rotateNextButton
          }`}
          onClick={() => setShowDescription(!showDescription)}
        />
        <Link to={`/question/${question?.id}`} className={styles.view}>
          read more
        </Link>
      </div>
      {showDescription && (
        <>
          <div className={styles.descriptionTopBorder}></div>
          <div className={styles.description}>{question?.description}</div>
        </>
      )}
    </div>
  );
}

QuestionCard.propTypes = {
  question: propTypes.object,
  isLast: propTypes.bool,
};
