import Create from "containers/Public/Create";
import Header from "components/Header";
import React from "react";
import { Router, Switch, Route } from "react-router";
import history from "utils/history";
import List from "containers/Public/List";

function App() {
  return (
    <div>
      <Router history={history}>
        <Header />

        <Switch>
          <Route exact path="/" component={List} />
          <Route exact path="/create" component={Create} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
