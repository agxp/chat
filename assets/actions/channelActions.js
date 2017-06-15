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
      const channel = await fetch("/api/users/@me/channels/" + id, {
        method: "GET",
        headers: { Authorization: "Bearer " + token }
      });
      dispatch({ type: FETCH_CHANNEL_SUCCESS, channel });
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
  return function(dispatch) {
    dispatch(joinChannelRequest());
    return get_messages(id)
      .then(parseJSON)
      .then(messages => {
        try {
          dispatch(fetchMessagesSuccess(messages));
        } catch (e) {
          dispatch(
            fetchMessagesFailure({
              response: {
                status: 403,
                statusText: "Invalid token"
              }
            })
          );
        }
      })
      .catch(error => {
        dispatch(
          fetchMessagesFailure({
            response: {
              status: 403,
              statusText: "Undefined error"
            }
          })
        );
      });
  };
}
