import { browserHistory } from "react-router";

import {
  CREATE_CHANNEL_FAILURE,
  CREATE_CHANNEL_REQUEST,
  CREATE_CHANNEL_SUCCESS,
  JOIN_CHANNEL_FAILURE,
  JOIN_CHANNEL_REQUEST,
  JOIN_CHANNEL_SUCCESS
} from "../constants/index";

import { parseJSON } from "../utils/misc";
import { create_channel, join_channel } from "../utils/http_functions";

export function createChannelSuccess(channel) {
  return {
    type: CREATE_CHANNEL_SUCCESS,
    payload: {}
  };
}

export function createChannelFailure(error) {
  return {
    type: CREATE_CHANNEL_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  };
}

export function createChannelRequest() {
  return {
    type: CREATE_CHANNEL_REQUEST
  };
}

export function createChannel(name, topic) {
  return function(dispatch) {
    dispatch(createChannelRequest());
    return create_channel(token, name, topic)
      .then(parseJSON)
      .then(response => {
        try {
          dispatch(createChannelSuccess(response));
          browserHistory.push("/channels/@me");
        } catch (e) {
          alert(e);
          dispatch(
            createChannelFailure({
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
          createChannelFailure({
            response: {
              status: 403,
              statusText: "Invalid request"
            }
          })
        );
      });
  };
}

export function joinChannelRequest() {
  return {
    type: JOIN_CHANNEL_REQUEST
  };
}

export function joinChannelSuccess(channel) {
  return {
    type: JOIN_CHANNEL_SUCCESS,
    payload: {
      channel
    }
  };
}

export function joinChannelFailure(error) {
  return {
    type: JOIN_CHANNEL_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  };
}

export function joinChannel(token, id) {
  return function(dispatch) {
    dispatch(joinChannelRequest());
    return join_channel(token, id)
      .then(parseJSON)
      .then(response => {
        try {
          dispatch(joinChannelSuccess(response));
          browserHistory.push("/channels/@me");
        } catch (e) {
          dispatch(
            joinChannelFailure({
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
          joinChannelFailure({
            response: {
              status: 403,
              statusText: "Undefined error"
            }
          })
        );
      });
  };
}
