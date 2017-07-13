import React, { Component } from "react";
import Router, { Link, RouteHandler } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { browserHistory } from "react-router";
import * as actionCreators from "../../actions/channelActions";
import distanceInWordsToNow from "date-fns/distance_in_words_to_now";

// components

import { Row, Col, Input, Button } from "react-materialize";

function mapStateToProps(state) {
  return {
    token: state.auth.token,
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

      this.props.streamMessages(this.props.id).then(m => {
        console.log(m);
      });
    });
  }

  render() {
    if (!this.props.messages) return <div>Loading...</div>;

    return (
      <div className="channel-messages-list">
        <Col s={12}>
          {this.props.messages.reverse().map(c => {
            return (
              <Row className="member" key={c.id}>
                <img className="avatar" alt="Avatar" src={c.author[0].avatar} />
                <div className="member-inner" style={{ maxHeight: "100%" }}>
                  <span className="member-username">
                    {c.author[0].username}
                  </span>
                  <span style={{ marginLeft: "5px", color: "gray" }}>
                    {distanceInWordsToNow(c.updatedAt)} ago
                  </span>
                  <h2 style={{ height: "2px", clear: "left" }}>
                    {c.content}
                  </h2>
                </div>
                <br />
              </Row>
            );
          })}
        </Col>
      </div>
    );
  }
}
