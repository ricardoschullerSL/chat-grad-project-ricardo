import { combineReducers } from "redux";

import user from "./userReducer";
import chat from "./chatReducer";

export default combineReducers({
    user,
    chat,
});
