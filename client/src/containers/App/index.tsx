import Create from "containers/Public/CreateBook";
import Header from "components/Header";
import { Router, Switch, Route } from "react-router";
import history from "utils/history";
import List from "containers/Public/BooksList";
import Authors from "containers/Public/Authors";
import AuthorProfile from "containers/Public/AuthorProfile";

function App() {
  return (
    <div>
      <Router history={history}>
        <Header />

        <Switch>
          <Route exact path="/" component={List} />
          <Route exact path="/create" component={Create} />
          <Route exact path="/authors" component={Authors} />
          <Route exact path="/authors/:id" component={AuthorProfile} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
