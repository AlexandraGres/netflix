import { combineReducers } from "redux";
import authReducer from "./auth";
import showReducer from "./show";
import userReducer from "./user";


export default combineReducers({
  show: showReducer,
  auth: authReducer,
  user: userReducer
})