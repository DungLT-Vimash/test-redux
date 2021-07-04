const initialState = {
  data: {},
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_DATA":
      // console.log(action.payload.data);
      return {
        ...state,
        data: action.payload.data,
      };
    case "ADD":
      return state.data.push(action.payload.data);
    case "edit":
      return false;
    case "remove":
      return false;
    default:
      return false;
  }
};

export default todoReducer;
