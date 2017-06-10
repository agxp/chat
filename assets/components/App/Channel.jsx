import React, { Component } from "react";
import Router, { Link, RouteHandler } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { browserHistory } from "react-router";
import * as actionCreators from "../../actions/auth";

// components

import { Row, Col, Input, Button } from "react-materialize";

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
export default class Channel extends Component {
  componentWillMount() {
    this.state = {
      users: null,
      channel: null,
      channel_id: null
    };
  }

  componentDidMount() {
    // hopefully the token exists
    fetch("/api/users/@me/channels", {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer " + this.props.token
      }
    })
      .then(response => response.json())
      .then(channel => {
        console.log(channel);
        this.setState({ channel });

        fetch("/api/channels/" + channel[0].id + "/members", {
          method: "GET",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Bearer " + this.props.token
          }
        })
          .then(response => response.json())
          .then(users => {
            this.setState({ users });
          });
      });
  }

  render() {
    if (!this.state.channel || !this.state.users) return <div>Loading...</div>;

    return (
      <div>
        <Row> {this.state.channel[0].name}: {this.state.channel[0].topic}</Row>
        <Col s={8} m={8} className="channel-messages">
          <h2>Messages</h2>
        </Col>
        <Col s={2} m={2} className="channel-members">
          <h2>Users</h2>
          {this.state.users.map(c => {
            return (
              <Row className="member" key={c.username}>
                <img className="avatar" alt="Avatar" src={c.avatar} />
                <div className="member-inner">
                  <span className="member-username">{c.username}</span>
                </div>
              </Row>
            );
          })}
        </Col>
      </div>
    );
  }
}
