import React, { Component } from "react";
import Router, { Link, RouteHandler } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { browserHistory } from "react-router";
import * as actionCreators from "../../actions/channelActions";

// components

import { Row, Col, Input, Button } from "react-materialize";

function mapStateToProps(state) {
  return {
    // channel: state.channel.channel,
    messages: state.channel.messages
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}
@connect(mapStateToProps, mapDispatchToProps)
export default class Messages extends Component {
  componentDidMount() {
    // hopefully the token exists
    this.props.fetchMessages(this.props.id).then(messages => {
      console.log(this.props.messages);
      console.log("got messages");
    });
  }

  render() {
    if (!this.props.messages) return <div>Loading...</div>;

    return (
      <div className="channel-messages-list">
        <Col s={12} className="channel-messages">
          {this.props.messages.reverse().map(c => {
            return (
              <Row className="member" key={c.id}>
                <img className="avatar" alt="Avatar" src={c.author[0].avatar} />
                <div className="member-inner">
                  <span className="member-username">{c.content}</span>
                </div>
              </Row>
            );
          })}
        </Col>
      </div>
    );
  }
}
