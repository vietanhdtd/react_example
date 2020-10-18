import React from "react";
import { Route } from "react-router-dom";

export default function CommonRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (
        <div style={{ height: "100vh", paddingTop: 56 }}>
          <Component {...props} />
        </div>
      )}
    />
  );
}
