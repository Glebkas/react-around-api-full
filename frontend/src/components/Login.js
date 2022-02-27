import React from "react";
import { Link } from "react-router-dom";

function Login(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    props.onLogin(userData);
  }

  return (
    <div className="auth">
      <h3 className="auth__title">Log in</h3>
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
          Log in
        </button>
      </form>
      <p className="auth__caption">
        Not a member yet?{" "}
        <Link className="auth__caption-link" to="/signup">
          Sign up here!
        </Link>
      </p>
    </div>
  );
}

export default Login;
