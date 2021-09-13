import PrivateRoute from "components/PrivateRoute";
import Private from "containers/Private";
import CheckUser from "containers/Public/CheckUser";
import Welcome from "containers/Public/Welcome";
import React from "react";
import { Route, Switch } from "react-router";

const AllRoutes = ({ dark, darkStyles }: any) => {
  const WelcomeProps = () => <Welcome dark={dark} darkStyles={darkStyles} />;
  const CheckUserProps = () => (
    <CheckUser dark={dark} darkStyles={darkStyles} />
  );

  return (
    <>
      <Switch>
        <Route exact path="/" component={WelcomeProps} />
        <Route exact path="/checkUser" component={CheckUserProps} />

        <PrivateRoute
          component={Private}
          path="/"
          dark={dark}
          darkStyles={darkStyles}
        />
      </Switch>
    </>
  );
};

export default AllRoutes;
