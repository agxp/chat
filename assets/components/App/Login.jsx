import React, { Component } from "react";
import Router, { Link, RouteHandler } from "react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// components
import Header from "Header/Header";
import { Row, Col, Input, Button } from "react-materialize";

// actions
import * as actionCreators from "../../actions/auth";

function mapStateToProps(state) {
  return {
    isAuthenticating: state.auth.isAuthenticating,
    statusText: state.auth.statusText
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Login extends Component {
  onSubmit(event) {
    event.preventDefault();
    const email = this.refs.email;
    const password = this.refs.password;
    this.props.loginUser(email.value, password.value);
  }

  render() {
    const style = {
      backgroundColor: "white",
      borderRadius: "10px",
      textIndent: "10px"
    };

    return (
      <div>
        <Header />
        <section id="landing-hero" class="container">
          <Row className="content landing-cta">
            <h1>Welcome back.</h1>
            <Row className="buttons center-align">
              <form
                onSubmit={this.onSubmit.bind(this)}
                className="center-align"
                style={{ marginTop: "5%" }}
              >
                <Col s={6} offset="s3">
                  <input
                    style={style}
                    ref="email"
                    id="email"
                    className="validate"
                    type="text"
                    placeholder="email"
                  />
                  <input
                    style={style}
                    ref="password"
                    id="password"
                    className="validate"
                    type="password"
                    placeholder="password"
                  />
                  <Row>
                    <Button type="submit" icon="done" waves="light" />
                  </Row>
                </Col>
              </form>
            </Row>
            <p>
              Need have an account? <Link to="/register">Register</Link>
            </p>
          </Row>
        </section>
      </div>
    );
  }
}
