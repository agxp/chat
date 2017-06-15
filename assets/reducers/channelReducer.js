import jwtDecode from "jwt-decode";

import { createReducer } from "../utils/misc";
import {
  FETCH_CHANNEL_FAILURE,
  FETCH_CHANNEL_REQUEST,
  FETCH_CHANNEL_SUCCESS,
  FETCH_MESSAGES_FAILURE,
  FETCH_MESSAGES_REQUEST,
  FETCH_MESSAGES_SUCCESS
} from "../constants/index";

const initialState = {
  channel: null,
  members: null,
  messages: null
};

export default createReducer(initialState, {
  [FETCH_CHANNEL_REQUEST]: state =>
    Object.assign({}, state, {
      channel: null,
      members: null
    }),
  [FETCH_CHANNEL_SUCCESS]: (state, payload) =>
    Object.assign({}, state, {
      statusText: "Successfully got channel",
      channel: payload.channel,
      members: payload.channel.members
    }),
  [FETCH_CHANNEL_FAILURE]: (state, payload) =>
    Object.assign({}, state, {
      status: payload.status,
      statusText: payload.statusText,
      channel: null,
      members: null
    }),
  [FETCH_MESSAGES_SUCCESS]: (state, payload) =>
    Object.assign({}, state, {
      statusText: "Successfully got messages",
      messages: payload.messages
    }),
  [FETCH_MESSAGES_REQUEST]: state =>
    Object.assign({}, state, {
      messages: null
    }),
  [FETCH_CHANNEL_FAILURE]: (state, payload) =>
    Object.assign({}, state, {
      status: payload.status,
      statusText: payload.statusText,
      messages: null
    })
});
