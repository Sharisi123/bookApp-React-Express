import Header from "components/Header";
import { Router, Switch, Route } from "react-router";
import history from "utils/history";
import { Provider } from "mobx-react";
import store from "stores";
import Welcome from "containers/Public/Welcome";
import PrivateRoute from "components/PrivateRoute";
import Private from "containers/Private";
import CheckUser from "containers/Public/CheckUser";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";

function App() {
  const [isThemeDark, setIsThemeDark] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("isThemeDark")) {
      // @ts-ignore
      const themeMode = JSON.parse(localStorage.getItem("isThemeDark"));

      if (themeMode) {
        setIsThemeDark(themeMode);
      }
    }
  }, []);

  const SwitchTheme = () => {
    setIsThemeDark((theme) => !theme);
    localStorage.setItem("isThemeDark", JSON.stringify(!isThemeDark));
  };

  const WelcomeProps = () => (
    <Welcome dark={isThemeDark} darkStyles={styles.dark} />
  );
  const CheckUserProps = () => (
    <CheckUser dark={isThemeDark} darkStyles={styles.dark} />
  );

  return (
    <Provider {...store}>
      <Router history={history}>
        <Header changeTheme={SwitchTheme} />

        <Switch>
          <Route exact path="/" component={WelcomeProps} />
          <Route exact path="/checkUser" component={CheckUserProps} />

          <PrivateRoute
            component={Private}
            path="/"
            dark={isThemeDark}
            darkStyles={styles.dark}
          />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
