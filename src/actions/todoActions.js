import * as taskApis from "../apis/task";

export const fetchListTask = () => async (dispatch) => {
  const api = await taskApis.getList();
  dispatch({
    type: "SHOW_DATA",
    payload: api,
  });
};
export const addListData = (data) => async (dispatch) => {
  const api = await taskApis.add(data);
  dispatch({
    type: "ADD",
    payload: api,
  });
};
