import { select, takeEvery, call, put } from "redux-saga/effects";

const getPage = (state) => {
  return state.nextPage;
};

function* handleData() {
  try {
    const page = yield select(getPage);
    const images = yield call("", page);
    yield put(images);
  } catch (error) {
    // dispath error
    yield put();
  }
}

function* watchImagesLoad() {
  yield takeEvery("", handleData);
}

export default watchImagesLoad;
