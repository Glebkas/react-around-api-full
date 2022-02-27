import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, loggedIn, ...props }) => {
  return (
    <Route exact>
      {() => (loggedIn ? <Component {...props} /> : <Redirect to="./signin" />)}
    </Route>
  );
};

export default ProtectedRoute;
