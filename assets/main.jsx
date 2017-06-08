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

import Login from "components/App/Login";
import Chat from "components/App/Chat";
import NotFound from "components/NotFound/NotFound";
import store from "./store";

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Login} />
      <Route path="/channels/:channel_id" component={Chat} />
      <Route path="/*" component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById("app")
);
