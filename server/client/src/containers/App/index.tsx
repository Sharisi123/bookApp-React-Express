import Header from "components/Header";
import { Router } from "react-router";
import history from "utils/history";
import { Provider } from "mobx-react";
import store from "stores";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import ThemeSwitcher from "components/ThemeSwitcher";
import AllRoutes from "./AllRoutes";

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

  return (
    <Provider {...store}>
      <Router history={history}>
        <Header changeTheme={SwitchTheme} />

        <ThemeSwitcher
          component={AllRoutes}
          dark={isThemeDark}
          darkStyles={styles.dark}
        />
      </Router>
    </Provider>
  );
}

export default App;
