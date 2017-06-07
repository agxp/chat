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

import App from "components/App/App";
import Chat from "components/App/Chat";
import NotFound from "components/NotFound/NotFound";

render(
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="/channels/:channel_id" component={Chat} />
    <Route path="/*" component={NotFound} />
  </Router>,
  document.getElementById("app")
);
