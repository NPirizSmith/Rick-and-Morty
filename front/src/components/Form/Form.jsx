import { useState } from "react";
import validation from "./validation";
import styles from "./Form.module.css";
import formImg from "../../assets/formGif.gif";
import logo from "../../assets/rnmIcon.png";

export default function Form({ login }) {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });

    setErrors(validation({ ...userData, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!userData.email || !userData.password) {
      // Campos vacíos, muestra el mensaje de error
      setFormSubmitted(true);
      return;
    }

    setFormSubmitted(false); // Reinicia el estado de formSubmitted

    // Continuar con el proceso de inicio de sesión
    login(userData);
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <div className={styles.formContainer}>
          <img src={logo} alt="" className={styles.logo} />
          <img src={formImg} alt="" className={styles.formImg} />
          <form action="">
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="text"
                name="email"
                value={userData.email}
                placeholder="Email Address"
                onChange={handleChange}
              />
              {errors.e1 ? (
                <p className={styles.errorText}>{errors.e1}</p>
              ) : errors.e2 ? (
                <p className={styles.errorText}>{errors.e2}</p>
              ) : errors.e3 ? (
                <p className={styles.errorText}>{errors.e3}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                value={userData.password}
                placeholder="Password"
                onChange={handleChange}
              />
              {errors.p1 ? (
                <p className={styles.errorText}>{errors.p1}</p>
              ) : errors.p2 ? (
                <p className={styles.errorText}>{errors.p2}</p>
              ) : null}
            </div>

            

            {Object.keys(errors).length > 0 ? (
              <button disabled>Login</button>
            ) : (
              <button type="submit" onClick={handleSubmit}>
                Login
              </button>
            )}

{formSubmitted && (!userData.email || !userData.password) && (
              <h1 className={styles.errorText}>Please fill out all fields</h1>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
