import { Link } from "react-router-dom";
import propTypes from "prop-types";
import styles from "./questionCard.module.css";
import { BsPersonCircle } from "react-icons/bs";
import { MdNavigateNext } from "react-icons/md";
import { useState } from "react";

export default function QuestionCard({ question, isLast }) {
  const [showDescription, setShowDescription] = useState(false);
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
          <Link
            to={`/question/${question?.id}`}
            className={styles.title}
            dangerouslySetInnerHTML={{
              __html: question?.title,
            }}
          ></Link>
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
