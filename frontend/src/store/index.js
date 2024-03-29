import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";


//import reducers here
import sessionReducer from "./session";
import spotReducer from "./spots";
import reviewReducer from "./reviews"
import bookingReducer from "./bookings"

const rootReducer = combineReducers({
  // add reducer functions here
  session: sessionReducer,
  spots: spotReducer,
  reviews: reviewReducer,
  bookings: bookingReducer
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
