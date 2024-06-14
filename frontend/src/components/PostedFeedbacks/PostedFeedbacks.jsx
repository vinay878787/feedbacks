import React from "react";
import styles from "./PostedFeedbacks.module.css";

const PostedFeedbacks = ({ data }) => {
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>All feedbacks</h4>

      {!!data ? (
        data?.map((item) => {
          return (
            <div
              key={item.idx}
              className={`${styles.feedbackItem} md:w-[70%]`}>
              <h3 className={styles.feedbackTitle}>Title: {item.name}</h3>
              <p className={styles.feedbackDescription}>Idea: {item.description}</p>
              <div className={styles.topicsContainer}>
                Topic:
                {item?.topics?.map((topic, key) => {
                  return (
                    <span
                      className={`${styles.topic} ${
                        topic.trim() === "Product Features ⚙️"
                          ? styles.blueBackground
                          : topic.trim() === "Product Pricing 💰"
                          ? styles.greenBackground
                          : topic.trim() === "Product Usablity 💁‍♂️"
                          ? styles.redBackground
                          : ""
                      }`}
                      key={key}>
                      {topic.trim()}
                    </span>
                  );
                })}
              </div>
              <div className={styles.authorContainer}>
                Author:
                <h3 className={styles.authorName}>{item?.association?.name}</h3>
              </div>
            </div>
          );
        })
      ) : (
        <h1 className={styles.loading}>Loading...</h1>
      )}
    </div>
  );
};

export default PostedFeedbacks;
