const defaultState = {
  path: "",
  order: "",
};

const SET_PATH = "SET_PATH";
const SET_ORDER = "SET_ORDER";

export const sortReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_PATH:
      return {
        ...state,
        path: action.payload,
      };
    case SET_ORDER:
      return {
        ...state,
        order: action.payload,
      };

    default:
      return state;
  }
};
