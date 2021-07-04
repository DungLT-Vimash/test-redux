import { all } from "redux-saga/effects";
import todo from "./todo";

function* rootSaga() {
  yield all([todo]);
}

export default rootSaga;
