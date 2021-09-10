import React from "react";
import { Route } from "react-router-dom";
const ThemeSwitcher = ({
  component: Component,
  dark,
  darkStyles,
  ...rest
}: any): any => {
  return (
    <Route
      {...rest}
      render={(props) => <Component dark={dark} darkStyles={darkStyles} />}
    />
  );
};

export default ThemeSwitcher;
