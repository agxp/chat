import React, { Component } from "react";
import Router, { Link, RouteHandler } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { browserHistory } from "react-router";
import * as actionCreators from "../../actions/auth";

// components
import { Row, Col, Input, Button } from "react-materialize";

import ChannelList from "App/ChannelList";
import Channel from "App/Channel";

function mapStateToProps(state) {
  return {
    token: state.auth.token,
    userName: state.auth.userName,
    isAuthenticated: state.auth.isAuthenticated
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}
@connect(mapStateToProps, mapDispatchToProps)
export default class CreateChannel extends Component {
  onSubmit(event) {
    event.preventDefault();
    const name = this.refs.name;
    const topic = this.refs.password;
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
            <h1>Create a new Channel</h1>
            <Row className="buttons center-align">
              <form
                onSubmit={this.onSubmit.bind(this)}
                className="center-align"
                style={{ marginTop: "5%" }}
              >
                <Col s={6} offset="s3">
                  <input
                    style={style}
                    ref="name"
                    id="name"
                    className="validate"
                    type="text"
                    placeholder="name"
                  />
                  <input
                    style={style}
                    ref="topic"
                    id="topic"
                    className="validate"
                    type="text"
                    placeholder="topic"
                  />
                  <Row>
                    <Button type="submit" icon="done" waves="light" />
                  </Row>
                </Col>
              </form>
            </Row>
            <p>
              <Link to="/channels/@me">Go Back</Link>
            </p>
          </Row>
        </section>
      </div>
    );
  }
}
