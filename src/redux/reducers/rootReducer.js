import { combineReducers } from "redux";
import { categoryReducer } from "./categoryReducer";
import { userReducer } from "./userReducer";


export const rootReducer = combineReducers({
  category: categoryReducer,
  user: userReducer,
}); 