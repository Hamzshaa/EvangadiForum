import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import styles from "./login.module.css";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

export default function Login() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!inputs?.email || !inputs?.password) {
      setError("Please fill all fields");
      return console.log("Please fill all fields");
    }

    try {
      const { data, status } = await axios.post("/api/users/login", inputs);
      if (status === 200) {
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        console.log(data);
        setError(data.message);
      }
    } catch (error) {
      console.log(error.response.data.message);
      setError(error.response.data.message);
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.innerWrapper}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2>Login to your account</h2>
          {error && <div className={styles.error}>{error}</div>}
          <div>
            <input
              name="email"
              type="text"
              placeholder="Your Email"
              onChange={handleChange}
              className=""
            />
          </div>

          <div className={styles.password}>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Your Password"
              onChange={handleChange}
              className=""
            />
            {showPassword ? (
              <IoEyeOutline
                className={styles.eye}
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <IoEyeOffOutline
                className={styles.eye}
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>

          <button type="submit" className="">
            Login
          </button>
          <Link to="/register">Create an account?</Link>
        </form>

        <div className={styles.about}>
          <div className={styles.about}>About</div>
          <h3>Evangadi Networks Q&A</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            facere illum ullam.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit, reiciendis doloribus! Molestiae a ullam consequuntur
            sed animi adipisci officiis maiores odio, magni ex illo sint at.
            Fugit excepturi molestiae est.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A eaque
            nesciunt provident nostrum perspiciatis consectetur temporibus
            culpa, possimus corporis nam.
          </p>

          <button>
            <Link to="">HOW IT WORKS</Link>
          </button>
        </div>
      </div>
    </section>
  );
}
