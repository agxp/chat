import React, { Component } from 'react';
import Router, { Link, RouteHandler } from 'react-router';

// components

import { Row, Col, Input, Button } from 'react-materialize';

export default class Channel extends Component {
    constructor(props) {
        super(props);
        let t = localStorage.getItem('access_token')
        if (t === null || t === '')
            window.location.href = '/';
        // let c;
        // if (this.props.params.channel_id === "@me")

        this.state = {
            // channel_id: this.props.params.channel_id,
            users: null,
            channel: null
        }
    }

    componentDidMount() {
        let t = localStorage.getItem('access_token')
        console.log(t)
        fetch('/api/users/@me/channels', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + t
            }
        })
            .then(response => response.json())
            .then((channel) => {
                this.setState({ channel_id: channel[0].id, channel });

                fetch('/api/channels/' + channel[0].id + '/members', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': 'Bearer ' + t
                    }
                })
                    .then(response => response.json())
                    .then((users) => { this.setState({ users }); });

            }
            );




    }

    render() {
        if (!this.state.channel || !this.state.users)
            return <div>Loading...</div>;

        return <div>
            <Row> {this.state.channel[0].name}: {this.state.channel[0].topic}</Row>
            <Col s={8} m={8}> Messages</Col>
            <Col s={2} m={2}> Users
                {
                    this.state.users.map(c => {
                        return <Row key={c.username}>{c.username}</Row>
                    })
                }
            </Col>
        </div>

    };
}