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
    });
  }

  post(e) {
    e.preventDefault();
    const message = this.refs.message.value;
    this.props.postMessage(this.props.channel.id, message).then(m => {
      console.log(m);
    });
    this.refs.message.value = "";
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

          <h2 style={{ float: "none" }}>Messages</h2>
          <Messages id={this.props.channel.id} />
          {/*<form onSubmit={this.post.bind(this)}>
            <input
              type="text"
              className="message-box"
              ref="message"
              placeholder="Type a message"
            />
            <Button className="send-message">Send</Button>
          </form>*/}
          <form id="FORM_1" onSubmit={this.post.bind(this)}>
            <div id="DIV_2">
              <div id="DIV_3">
                <div id="DIV_4">
                  <input type="file" id="INPUT_5" />
                </div>
                <input
                  type="text"
                  rows="1"
                  placeholder="Type a message"
                  id="TEXTAREA_6"
                  ref="message"
                />
              </div>
            </div>
          </form>
        </Col>
        <Col s={2} m={2} className="channel-members">
          <h2>Users</h2>
          {this.props.members.map(c => {
            return (
              <Row className="member" key={c.username}>
                <img className="avatar" alt="Avatar" src={c.avatar} />
                <div className="member-inner">
                  <span className="member-username">
                    {c.username}
                  </span>
                </div>
              </Row>
            );
          })}
        </Col>
      </div>
    );
  }
}
