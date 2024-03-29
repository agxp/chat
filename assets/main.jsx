import "styles/app.scss";

import React from "react";
import { render } from "react-dom";
import {
  Router,
  Route,
  Link,
  browserHistory,
  IndexRoute,
  IndexRedirect
} from "react-router";

import { Provider } from "react-redux";

import Home from "components/App/Home";
import Register from "components/App/Register";
import Login from "components/App/Login";
import Chat from "components/App/Chat";
import NotFound from "components/NotFound/NotFound";
import configureStore from "./store";

async function init() {
  const store = await configureStore();
  render(
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/channels/:channel_id" component={Chat} />
        <Route path="/*" component={NotFound} />
      </Router>
    </Provider>,
    document.getElementById("app")
  );
}

init();
