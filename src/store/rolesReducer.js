const defaultState = {
  roles: [],
};

const SET_ROLES = "SET_ROLES";

export const rolesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_ROLES:
      return { ...state, roles: [...action.payload] };
    default:
      return state;
  }
};

export const setRolesAction = (payload) => ({
  type: SET_ROLES,
  payload: payload,
});
