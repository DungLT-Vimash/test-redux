import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import thunk from "redux-thunk";
import rootReducer from "../reducers";
import rootSaga from "../sagas";

const composeEnhancers =
  process.env.NODE_ENV !== "production" &&
  typeof window === "object" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        shouldHotReload: false,
      })
    : compose;

const sagaMiddleware = createSagaMiddleware();

const configureStore = () => {
  const middlewares = [thunk, sagaMiddleware];
  const enhancers = [applyMiddleware(...middlewares)];
  const store = createStore(rootReducer, composeEnhancers(...enhancers));
  sagaMiddleware.run(rootSaga);
  return store;
};
// const configureStore = () => {
//   const sagaMiddleware = createSagaMiddleware();

//   const store = createStore(
//     rootReducer,
//     compose(applyMiddleware(sagaMiddleware)),
//     composeEnhancers
//   );
//   sagaMiddleware.run(rootSaga);
//   return store;
// };

export default configureStore;
