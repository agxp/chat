import React, { Component } from "react";
import Router, { Link, RouteHandler } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { browserHistory } from "react-router";
import * as actionCreators from "../../actions/channelActions";

// components

import { Row, Col, Input, Button } from "react-materialize";

import Messages from "./Messages";

function mapStateToProps(state) {
  return {
    channel: state.channel.channel,
    members: state.channel.members
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}
@connect(mapStateToProps, mapDispatchToProps)
export default class Channel extends Component {
  componentDidMount() {
    this.props.fetchChannel("@me").then(channel => {
      console.log(this.props.channel);
      console.log("hi");
    });
  }

  render() {
    if (!this.props.channel || !this.props.members)
      return <div>Loading...</div>;

    return (
      <div className="channel-wrapper">
        <Col s={8} m={8} className="channel-messages">
          <h2 id="channel-name">
            {this.props.channel.name}:
            {this.props.channel.topic}
          </h2>

          <h2>Messages</h2>
          <Messages id={this.props.channel.id} />
        </Col>
        <Col s={2} m={2} className="channel-members">
          <h2>Users</h2>
          {this.props.members.map(c => {
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
