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
export default class Chat extends Component {
  constructor(props) {
    super(props);
    let t = localStorage.getItem("token");
    if (t === null || t === "") window.location.href = "/login";
    console.log(this.props.params.channel_id);
  }

  postMessage(event) {
    // if (this.state.email && this.state.password) {
    //     // signup
    // } else {
    //     fetch('api/trial', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/x-www-form-urlencoded'
    //         },
    //         body: "username=" + this.state.username
    //     })
    //         .then(res => res.json())
    //         .then(resJson => {
    //             console.log(resJson.access_token)
    //             this.setState({ access_token: resJson.access_token });
    //         }) // success
    //         .catch(err => console.log(err));
    // }
    event.preventDefault();
  }

  onMessageChange(event) {
    this.setState({ message: event.target.value });
  }

  render() {
    // const { username, password, email } = this.state;
    const channel_id = this.props.params.channel_id;

    return (
      <Row className="chat">
        <Col s={2} m={2} className="channel-list">
          <ChannelList />
        </Col>
        <Col s={10} m={10} className="channel-full">
          <Channel />
        </Col>
      </Row>
    );
  }
}
