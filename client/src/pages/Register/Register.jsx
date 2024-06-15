import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import styles from "./register.module.css";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

export default function Register() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !inputs?.username ||
      !inputs?.firstname ||
      !inputs?.lastname ||
      !inputs?.email ||
      !inputs?.password
    ) {
      setError("Please fill all fields");
      return console.log("Please fill all fields");
    }

    try {
      const res = await axios.post("/api/users/register", inputs);

      if (res.status === 201) {
        navigate("/login");
      } else {
        setError(res.data.message);
      }
      console.log(res.data);
    } catch (error) {
      setError(error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section className={styles.container}>
      <div className={styles.innerWrapper}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2>Join the network</h2>
          {error && <div className={styles.error}>{error}</div>}
          <div>
            <input
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="Email"
              className=""
            />
          </div>

          <div className={styles.fullName}>
            <input
              onChange={handleChange}
              name="firstname"
              type="text"
              placeholder="first name"
              className=""
            />

            <input
              onChange={handleChange}
              name="lastname"
              type="text"
              placeholder="last name"
              className=""
            />
          </div>

          <div>
            <input
              onChange={handleChange}
              name="username"
              type="text"
              placeholder="username"
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
            Register
          </button>
          <p className={styles.privacyTerm}>
            I agree to the <Link to="">privacy policy</Link> and{" "}
            <Link to="">terms of services.</Link>
          </p>
          <Link to="/login">Already have an account?</Link>
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
