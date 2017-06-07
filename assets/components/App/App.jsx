import React, { Component } from "react";
import Router, { Link, RouteHandler } from "react-router";

// components
import Header from "Header/Header";

import { Row, Col, Input, Button } from "react-materialize";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      access_token: ""
    };

    this.onSubmit = this.onSubmit.bind(this);

    this.onUsernameChange = this.onUsernameChange.bind(this);
  }

  onSubmit(event) {
    if (this.state.email && this.state.password) {
      // signup
    } else {
      fetch("api/trial", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "username=" + this.state.username
      })
        .then(res => res.json())
        .then(resJson => {
          console.log(resJson.access_token);
          localStorage.setItem("access_token", resJson.access_token);
          window.location.href = "/channels/@me";
        }) // success
        .catch(err => console.log(err));
    }
    event.preventDefault();
  }

  onUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  render() {
    const { username, password, email } = this.state;
    return (
      <div class="app">
        <Header />
        <section id="landing-hero" class="container">
          <Row className="content landing-cta">
            <h1>Welcome to a better chat app.</h1>
            <p className="blurb">blahblahblahblahblah.</p>
            <Row className="buttons">
              <form onSubmit={this.onSubmit} className="col s12">
                <Input
                  s={12}
                  m={5}
                  id="username"
                  className="validate"
                  type="text"
                  value={username}
                  label="Username"
                  onChange={this.onUsernameChange}
                />
                <Col s={12} m={2}>
                  <Button
                    floating
                    large
                    className="red"
                    icon="Go"
                    waves="light"
                  />
                </Col>
              </form>
            </Row>
          </Row>
        </section>
      </div>
    );
  }
}
