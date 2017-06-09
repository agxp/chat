import jwtDecode from "jwt-decode";

import { createReducer } from "../utils/misc";
import {
  CREATE_CHANNEL_FAILURE,
  CREATE_CHANNEL_REQUEST,
  CREATE_CHANNEL_SUCCESS,
  JOIN_CHANNEL_FAILURE,
  JOIN_CHANNEL_REQUEST,
  JOIN_CHANNEL_SUCCESS
} from "../constants/index";

const initialState = {
  isCreating: null,
  created: null,
  isJoining: null,
  joined: null,
  channel: null,
  status: null,
  statusText: null
};

export default createReducer(initialState, {
  [CREATE_CHANNEL_REQUEST]: state =>
    Object.assign({}, state, {
      isCreating: true,
      statusText: null
    }),
  [CREATE_CHANNEL_SUCCESS]: (state, payload) =>
    Object.assign({}, state, {
      isCreating: false,
      created: true,
      statusText: "Successfully created channel",
      channel: payload.channel
    }),
  [CREATE_CHANNEL_FAILURE]: (state, payload) =>
    Object.assign({}, state, {
      isCreating: false,
      created: false,
      status: payload.status,
      statusText: payload.statusText,
      channel: null
    }),
  [JOIN_CHANNEL_SUCCESS]: (state, payload) =>
    Object.assign({}, state, {
      joining: false,
      joined: true,
      channel: channel
    }),
  [JOIN_CHANNEL_REQUEST]: state =>
    Object.assign({}, state, {
      joining: true
    }),
  [JOIN_CHANNEL_FAILURE]: (state, payload) =>
    Object.assign({}, state, {
      joining: false,
      joined: false,
      statusText: payload.statusText,
      channel: null
    })
});
