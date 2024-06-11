import propTypes from "prop-types";
import styles from "./answerCard.module.css";
import { BsPersonCircle } from "react-icons/bs";
import { applyStyleForCodes } from "../../util/applyStyleForCodes";

export default function AnswerCard({ answer, isLast }) {
  console.log(answer);

  return (
    <div
      key={answer?.id}
      className={`${styles.answer} ${!isLast && styles.border}`}
    >
      <div>
        <div className={styles.user}>
          <BsPersonCircle className={styles.userAvatar} />
          <span>{answer?.username}</span>
        </div>

        <div
          className={styles.ans}
          dangerouslySetInnerHTML={{
            __html: "<p>" + applyStyleForCodes(answer?.answer) + "</p>",
          }}
        ></div>
        {/* <p className={styles.ans}>{answer?.answer}</p> */}
      </div>
    </div>
  );
}

AnswerCard.propTypes = {
  answer: propTypes.object,
  isLast: propTypes.bool,
};
