import React from "react";
import { Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../authService";

const NeedsAuthRoute = ({ component: Component, ...rest }: any) => (
  <Route
    {...rest}
    element={isAuthenticated() ? Component : <Navigate to="/login" />}
  />
);

export default NeedsAuthRoute;
