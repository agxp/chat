import { browserHistory } from "react-router";

import {
  FETCH_CHANNEL_FAILURE,
  FETCH_CHANNEL_REQUEST,
  FETCH_CHANNEL_SUCCESS,
  FETCH_MESSAGES_FAILURE,
  FETCH_MESSAGES_REQUEST,
  FETCH_MESSAGES_SUCCESS,
  POST_MESSAGE_FAILURE,
  POST_MESSAGE_REQUEST,
  POST_MESSAGE_SUCCESS,
  STREAM_MESSAGES_FAILURE,
  STREAM_MESSAGES_REQUEST,
  STREAM_MESSAGES_SUCCESS
} from "../constants/index";

import { parseJSON } from "../utils/misc";
import {
  get_channel,
  get_messages,
  tokenConfig
} from "../utils/http_functions";

export function fetchChannelSuccess(channel) {
  return {
    type: FETCH_CHANNEL_SUCCESS,
    payload: {}
  };
}

export function fetchChannelFailure(error) {
  return {
    type: FETCH_CHANNEL_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  };
}

export function fetchChannelRequest() {
  return {
    type: FETCH_CHANNEL_REQUEST
  };
}

export function fetchChannel(id) {
  return async (dispatch, getState) => {
    dispatch({ type: FETCH_CHANNEL_REQUEST });
    try {
      console.log(getState());
      const { auth: { token } } = getState();
      console.log(token);
      //   const headers = "Authorization: Bearer " + token;
      let channel = await fetch("/api/channels/" + id, {
        method: "GET",
        headers: { Authorization: "Bearer " + token }
      }).then(channel => channel.json());
      dispatch({ type: FETCH_CHANNEL_SUCCESS, payload: { channel } });
    } catch (error) {
      dispatch({
        type: FETCH_CHANNEL_FAILURE,
        error: Error(
          "Unknown error occured :-(. Please, try again later.",
          error
        )
      });
    }
  };
}

export function fetchMessagesRequest() {
  return {
    type: FETCH_MESSAGES_REQUEST
  };
}

export function fetchMessagesSuccess(messages) {
  return {
    type: FETCH_MESSAGES_SUCCESS,
    payload: {
      messages
    }
  };
}

export function fetchMessagesFailure(error) {
  return {
    type: FETCH_MESSAGES_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  };
}

export function fetchMessages(id) {
  return async (dispatch, getState) => {
    dispatch({ type: FETCH_MESSAGES_REQUEST });
    try {
      console.log(getState());
      const { auth: { token } } = getState();
      console.log(token);
      //   const headers = "Authorization: Bearer " + token;
      let messages = await fetch("/api/channels/" + id + "/messages", {
        method: "GET",
        headers: { Authorization: "Bearer " + token }
      }).then(messages => messages.json());
      dispatch({ type: FETCH_MESSAGES_SUCCESS, payload: { messages } });
    } catch (error) {
      dispatch({
        type: FETCH_MESSAGES_FAILURE,
        error: Error(
          "Unknown error occured :-(. Please, try again later.",
          error
        )
      });
    }
  };
}

export function postMessageRequest() {
  return {
    type: POST_MESSAGE_REQUEST
  };
}

export function postMessageSuccess(messages) {
  return {
    type: POST_MESSAGE_SUCCESS,
    payload: {
      messages
    }
  };
}

export function postMessageFailure(error) {
  return {
    type: POST_MESSAGE_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  };
}

export function postMessage(id, content) {
  return async (dispatch, getState) => {
    dispatch({ type: POST_MESSAGE_REQUEST });
    try {
      console.log(getState());
      const { auth: { token } } = getState();
      console.log(token);
      //   const headers = "Authorization: Bearer " + token;
      let messages = await fetch("/api/channels/" + id + "/messages", {
        method: "POST",
        headers: { Authorization: "Bearer " + token },
        body: JSON.stringify({ content })
      }).then(messages => messages.json());
      dispatch({ type: POST_MESSAGE_SUCCESS, payload: { messages } });
    } catch (error) {
      dispatch({
        type: POST_MESSAGE_FAILURE,
        error: Error(
          "Unknown error occured :-(. Please, try again later.",
          error
        )
      });
    }
  };
}

export function streamMessages(id) {
  return async (dispatch, getState) => {
    dispatch({ type: STREAM_MESSAGES_REQUEST });
    try {
      console.log(getState());
      const { auth: { token } } = getState();
      console.log(token);

      // socket.on("gotMessage", function(data) {
      //   console.log(data + " has joined the party");
      // });
      // socket.get('/api/users/testStream/', {startStream:true})

      // The automatically-created socket is exposed as io.socket.
      // Use .on() to subscribe to the 'user' event on the client.
      // This event is sent by the Sails "create", "update",
      // "delete", "add" and "remove" blueprints to any socket that
      // is subscribed to one or more User model instances.
      io.socket.on("channel", function gotMessage(data) {
        console.log("Message alert!", data);
        let messages = data.data;
        dispatch({ type: STREAM_MESSAGES_SUCCESS, payload: { messages } });
      });
      // Using .get('/user') will retrieve a list of current User models,
      // subscribe this socket to those models, AND subscribe this socket
      // to notifications about new User models when they are created.
      io.socket.request(
        {
          method: "get",
          url: "/api/channels/" + id + "/messages/listen",
          headers: { Authorization: "Bearer " + token }
        },
        function gotResponse(body, response) {
          console.log("message: ", body);
          if (body.data) {
            console.log(body.data);
            let messages = body.data;
            dispatch({ type: STREAM_MESSAGES_SUCCESS, payload: { messages } });
          }
        }
      );
    } catch (error) {
      console.log(error);
      dispatch({
        type: STREAM_MESSAGES_FAILURE,
        error: Error(
          "Unknown error occured :-(. Please, try again later.",
          error
        )
      });
    }
  };
}
