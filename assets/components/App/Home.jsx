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
    isRegistering: state.auth.isRegistering,
    registerStatusText: state.auth.registerStatusText
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Register extends Component {
  onSubmit(event) {
    event.preventDefault();
    const input = this.refs.username;
    console.log(input.value);
    this.props.registerUser(input.value, "trial", "trial", "channels/@me");
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
            <h1>Welcome to a better chat app.</h1>
            <p>
              A realtime chat app inspired by Discord and Slack. It's going to
              have a lot of features
            </p>
            <p>
              Try it out without an email!
            </p>
            <Row className="buttons center-align">
              <form
                onSubmit={this.onSubmit.bind(this)}
                className="center-align"
              >
                <Col s={7} offset="s2">
                  <input
                    style={style}
                    ref="username"
                    id="username"
                    className="validate"
                    type="text"
                    placeholder="enter a username"
                  />
                </Col>
                <Col s={1} offset="4">
                  <Button type="submit" icon="done" waves="light" />
                </Col>
              </form>
            </Row>
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </Row>
        </section>
      </div>
    );
  }
}
