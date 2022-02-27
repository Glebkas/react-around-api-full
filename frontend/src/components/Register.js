import React from "react";
import { Link } from "react-router-dom";
function Register(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    console.log(userData);
    props.onRegister(userData);
  }

  return (
    <div className="auth">
      <h3 className="auth__title">Sign up</h3>
      <form className="form" onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          className="form__input form__input_type_auth"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        ></input>
        <input
          placeholder="Password"
          className="form__input form__input_type_auth"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        ></input>
        <button className="form__submit form__submit_type_auth" type="submit">
          Sign up
        </button>
      </form>
      <p className="auth__caption">
        Already a member?{" "}
        <Link className="auth__caption-link" to="/signin">
          Sign in here!
        </Link>
      </p>
    </div>
  );
}

export default Register;
