const defaultState = {
  page: 1,
};

const SET_PAGE = "SET_PAGE";

export const currentPageReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_PAGE:
      return {
        ...state,
        page: action.payload,
      };

    default:
      return state;
  }
};
