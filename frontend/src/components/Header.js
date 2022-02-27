import React from "react";
import { Link, Route, Switch } from "react-router-dom";

function Header(props) {
  if (props.loggedIn) {
    return (
      <div className="header">
        <div className="header__logo"></div>
        <div className="header__right-container">
          <p className="header__email">{props.email}</p>
          <Link to={"/#"} onClick={props.onSignOut} className="header__link">
            Sign out
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <header className="header">
        <div className="header__logo"></div>

        <Switch>
          <Route path="/signin">
            <Link className="header__link" to="/signup">
              Sign up
            </Link>
          </Route>
          <Route path="/signup">
            <Link className="header__link" to="/signin">
              Sign in
            </Link>
          </Route>
        </Switch>
      </header>
    );
  }
}

export default Header;
