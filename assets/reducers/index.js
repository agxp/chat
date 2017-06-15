import { combineReducers } from "redux";

import auth from "./auth";
import channel from "./channelReducer";

export default combineReducers({
  auth,
  channel
});
