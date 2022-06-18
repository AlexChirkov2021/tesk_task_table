import { createStore, combineReducers, applyMiddleware } from "redux";
import { usersReducer } from "./usersReducer";
import { rolesReducer } from "./rolesReducer";
import { columnsReducer } from "./columnsReducer";
import { currentPageReducer } from "./currentPageReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { sortReducer } from "./sortReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  sortBy: sortReducer,
  currentPage: currentPageReducer,
  roles: rolesReducer,
  users: usersReducer,
  columns: columnsReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
