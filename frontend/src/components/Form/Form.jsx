import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { username, email } from "../../utils/userDetails";
import toast from "react-hot-toast";
import styles from "./Form.module.css";

const BACKENDURI = import.meta.env.VITE_BACKEND_URI;

function Form() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [allFeedback, setAllFeedback] = useState(null);
  const [formData, setFormData] = useState({
    name: username || "",
    email: email || "",
    summary: "",
    idea: "",
    topic: "",
  });
  const [isProfileVisible, setProfileVisibility] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getFeedbacks = async () => {
    const URI_SLUG = "/api/v1/feedback/getfeedback";
    const URI_HEAD = import.meta.env.VITE_BACKEND_URI;
    try {
      const response = await fetch(`${URI_HEAD}${URI_SLUG}`);
      const data = await response.json();
      setAllFeedback(data);
    } catch (error) {
      console.error(error);
      setAllFeedback(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitFeedback = async () => {
      const response = await fetch(
        `${BACKENDURI}/api/v1/feedback/submitFeedback`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    };

    toast.promise(submitFeedback(), {
      loading: "Submitting feedback...",
      success: () => {
        setFormData({
          name: username || "",
          email: email || "",
          summary: "",
          idea: "",
          topic: "",
        });
        getFeedbacks();
        return "Thank you for your feedback!";
      },
      error: (err) => `Error submitting form: ${err.toString()}`,
    });
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
    const username = loginInfo.name;
    const email = loginInfo.email;
    console.log("username :",username);
    console.log("email:",email);
    setUserName(username.name);
  }, []);
  return (
    <div className={styles.formWrapper}>
      <Toaster />
      <div
        className={styles.profileContainer}
        onClick={() => setProfileVisibility(!isProfileVisible)}
      >
        <div className={styles.profile}>{userName.slice(0, 2)}</div>
        {isProfileVisible && (
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles.heading}>Please provide your feedback</div>

        <label htmlFor="category" className={styles.label}>
          Category
        </label>
        <select
          id="category"
          value={formData.category}
          onChange={handleChange}
          className={styles.inputBox}
        >
          <option value="" disabled>
            Choose the category
          </option>
          <option value="topic_637o8zkv" name="topic">
            Product Features
          </option>
          <option value="topic_gv8qz6ev" name="topic">
            Product Pricing
          </option>
          <option value="topic_2dx6756d" name="topic">
            Product Usability
          </option>
        </select>

        <label htmlFor="heading" className={styles.label}>
          Heading
        </label>
        <input
          id="heading"
          placeholder="Heading for feedback"
          value={formData.heading}
          onChange={handleChange}
          className={styles.inputBox}
        />

        <label htmlFor="feedback" className={styles.label}>
          Feedback
        </label>
        <textarea
          id="feedback"
          placeholder="Please provide your feedback"
          value={formData.feedback}
          onChange={handleChange}
          className={styles.inputBox}
          rows="5"
          cols="30"
        />

        <label htmlFor="ratings" className={styles.label}>
          Ratings
        </label>
        <input
          type="number"
          id="ratings"
          placeholder="Please provide your rating out of 5"
          value={formData.ratings}
          onChange={handleChange}
          className={styles.inputBox}
        />

        <button type="submit" className={styles.submitBtn}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
