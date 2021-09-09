import React from "react";
import { Route, Switch } from "react-router-dom";
import { observer } from "mobx-react";
import BookList from "containers/Private/BooksList";
import Authors from "containers/Private/Authors";
import AuthorProfile from "containers/Private/AuthorProfile";
import Create from "containers/Private/CreateBook";

const Private: React.FC = observer(() => {
  return (
    <>
      <Switch>
        <Route exact path="/books" component={BookList} />
        <Route exact path="/create" component={Create} />
        <Route exact path="/authors" component={Authors} />
        <Route exact path="/authors/:id" component={AuthorProfile} />
      </Switch>
    </>
  );
});

export default Private;
