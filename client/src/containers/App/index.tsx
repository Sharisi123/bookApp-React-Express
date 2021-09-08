import Header from "components/Header";
import { Router, Switch, Route } from "react-router";
import history from "utils/history";
import SignIn from "containers/Public/SignIn";
import SignUp from "containers/Public/SignUp";
import { Provider } from "mobx-react";
import store from "stores";
import Welcome from "containers/Public/Welcome";
import PrivateRoute from "components/PrivateRoute";
import Private from "containers/Private";
import CheckUser from "containers/Public/CheckUser";

function App() {
  const CheckUserWithProps = () => <CheckUser />;

  return (
    <Provider {...store}>
      <Router history={history}>
        <Header />

        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route exact path="/login" component={SignIn} />
          <Route exact path="/register" component={SignUp} />
          <Route exact path="/checkUser" component={CheckUserWithProps} />

          <PrivateRoute component={Private} path="/" />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
