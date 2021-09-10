import React from "react";

import { Route, Redirect } from "react-router-dom";
import { useStore } from "stores";

const PrivateRoute = ({ component: Component, ...rest }: any): any => {
  const { authStore } = useStore();

  return (
    <Route
      {...rest}
      render={(props) =>
        !!authStore.user ? <Component {...rest} /> : <Redirect to="/" />
      }
    />
  );
};

export default PrivateRoute;
