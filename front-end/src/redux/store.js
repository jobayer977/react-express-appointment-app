import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import rootReducer from "./rootReducer";
import thunk from "redux-thunk";

const middleware = [thunk, logger];
if (process.env.NODE_ENV === "development") {
	middleware.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;
