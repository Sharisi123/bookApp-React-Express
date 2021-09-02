import Create from "containers/Public/CreateBook";
import Header from "components/Header";
import { Router, Switch, Route } from "react-router";
import history from "utils/history";
import BookList from "containers/Public/BooksList";
import Authors from "containers/Public/Authors";
import AuthorProfile from "containers/Public/AuthorProfile";
import SignIn from "containers/Public/SignIn";
import SignUp from "containers/Public/SignUp";

function App() {
  return (
    <div>
      <Router history={history}>
        <Header />

        <Switch>
          <Route exact path="/login" component={SignIn} />
          <Route exact path="/register" component={SignUp} />

          <Route exact path="/" component={BookList} />
          <Route exact path="/create" component={Create} />
          <Route exact path="/authors" component={Authors} />
          <Route exact path="/authors/:id" component={AuthorProfile} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
