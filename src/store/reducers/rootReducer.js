import { combineReducers } from "redux";
import authReducer from "./auth";
import showReducer from "./show";


export default combineReducers({
  show: showReducer,
  auth: authReducer
})