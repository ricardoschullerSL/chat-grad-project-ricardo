import { combineReducers } from "redux";

import tweets from "./tweetsReducer";
import user from "./userReducer";
import chat from "./chatReducer";

export default combineReducers({
    tweets,
    user,
    chat,
});
