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
export default class ChannelList extends Component {
  componentWillMount() {
    this.state = {
      channels: null
    };
  }

  componentDidMount() {
    if (!this.props.token) {
      // const token =
    }
    fetch("/api/channels", {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer " + this.props.token
      }
    })
      .then(response => response.json())
      .then(channels => {
        console.log(channels);
        this.setState({ channels });
      });
  }

  render() {
    if (!this.state.channels) return <div>Loading...</div>;

    return (
      <Col>
        {this.state.channels.map(c => {
          return <Row key={c.name}>{c.name}</Row>;
        })}
      </Col>
    );
  }
}
