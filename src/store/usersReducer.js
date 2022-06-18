const defaultState = {
  users: [],
};

const SET_USERS = "SET_USERS";

export const usersReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_USERS:
      return { ...state, users: [...action.payload] };
    default:
      return state;
  }
};

export const setUsersAction = (payload) => ({
  type: SET_USERS,
  payload: payload,
});
