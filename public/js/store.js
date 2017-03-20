import { applyMiddleware, createStore , compose } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

import reducer from "./reducers";

const middleWare = applyMiddleware(thunk, logger());
const composeEnhancers = compose;

export default createStore(reducer, middleWare);
