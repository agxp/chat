import React, { Component } from 'react';
import Router, { Link, RouteHandler } from 'react-router';

// components

import { Row, Col, Input, Button } from 'react-materialize';

export default class Chat extends Component {
    constructor(props) {
        super(props);
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
        return (
            <div class="app">
                hello
            </div>
        );
    }
}
