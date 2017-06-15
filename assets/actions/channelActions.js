import { browserHistory } from "react-router";

import {
  FETCH_CHANNEL_FAILURE,
  FETCH_CHANNEL_REQUEST,
  FETCH_CHANNEL_SUCCESS,
  FETCH_MESSAGES_FAILURE,
  FETCH_MESSAGES_REQUEST,
  FETCH_MESSAGES_SUCCESS
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
