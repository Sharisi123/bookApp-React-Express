import React from "react";
import { Route, Switch } from "react-router-dom";
import { observer } from "mobx-react";
import BookList from "containers/Private/BooksList";
import Authors from "containers/Private/Authors";
import AuthorProfile from "containers/Private/AuthorProfile";
import Create from "containers/Private/CreateBook";
import Chats from "./Chats";

interface IProps {
  dark: boolean;
  darkStyles: string;
}

const Private = observer(({ dark, darkStyles }: IProps) => {
  const BookListProps = () => <BookList dark={dark} darkStyles={darkStyles} />;
  const CreateProps = () => <Create dark={dark} darkStyles={darkStyles} />;
  const AuthorsProps = () => <Authors dark={dark} darkStyles={darkStyles} />;
  const AuthorProfileProps = () => (
    <AuthorProfile dark={dark} darkStyles={darkStyles} />
  );

  return (
    <>
      <Switch>
        <Route exact path="/books" component={BookListProps} />
        <Route exact path="/create" component={CreateProps} />
        <Route exact path="/authors" component={AuthorsProps} />
        <Route exact path="/authors/:id" component={AuthorProfileProps} />
        <Route exact path="/chats" component={Chats} />
      </Switch>
    </>
  );
});

export default Private;
