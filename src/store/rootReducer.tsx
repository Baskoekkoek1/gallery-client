import { combineReducers } from "redux";
import user from "./user/reducer";
import galleries from "./galleries/reducer";

export default combineReducers({
  user,
  galleries,
});
