import React, { Component } from 'react';
import Router, { Link, RouteHandler } from 'react-router';

// components

import { Row, Col, Input, Button } from 'react-materialize';

export default class ChannelList extends Component {
    constructor(props) {
        super(props);
        let t = localStorage.getItem('access_token')
        if (t === null || t === '')
            window.location.href = '/';

        this.state = {
            channels: null
        }
    }

    componentDidMount() {
        let t = localStorage.getItem('access_token')
        console.log(t)
        fetch('/api/channels', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + t
            }
        })
            .then(response => response.json())
            .then((channels) => { this.setState({ channels }); });
    }

    render() {
        if (!this.state.channels)
            return <div>Loading...</div>;

        return (<Col> {
            this.state.channels.map(c => {
                return <Row key={c.name}>{c.name}</Row>
            })

        }
        </Col>
        );

    };

}
