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
  messages: null
};

export default createReducer(initialState, {
  [FETCH_CHANNEL_REQUEST]: state =>
    Object.assign({}, state, {
      isCreating: true,
      statusText: null
    }),
  [FETCH_CHANNEL_SUCCESS]: (state, payload) =>
    Object.assign({}, state, {
      isCreating: false,
      created: true,
      statusText: "Successfully created channel",
      channel: payload.channel
    }),
  [FETCH_CHANNEL_FAILURE]: (state, payload) =>
    Object.assign({}, state, {
      isCreating: false,
      created: false,
      status: payload.status,
      statusText: payload.statusText,
      channel: null
    }),
  [FETCH_MESSAGES_SUCCESS]: (state, payload) =>
    Object.assign({}, state, {
      joining: false,
      joined: true,
      channel: channel
    }),
  [FETCH_MESSAGES_REQUEST]: state =>
    Object.assign({}, state, {
      joining: true
    }),
  [FETCH_CHANNEL_FAILURE]: (state, payload) =>
    Object.assign({}, state, {
      joining: false,
      joined: false,
      statusText: payload.statusText,
      channel: null
    })
});
