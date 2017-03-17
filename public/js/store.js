import { applyMiddleware, createStore , compose } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

import reducer from "./reducers";



const error = (store) => (next) => (action) => {
    try {
        next(action);
    } catch(e) {
        console.log("Error!", e);
    }
}


const middleWare = applyMiddleware(thunk, logger(), error);
const composeEnhancers = compose;
export default createStore(reducer, {
    user:{
        id: "0",
        name: "Ricardo",
        uri: null,
    },
    }
    ,composeEnhancers(middleWare));
