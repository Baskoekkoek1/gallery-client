import { combineReducers } from "redux";
import user from "./user/reducer";
import galleries from "./galleries/reducer";
import appState from "./appState/reducer";

export default combineReducers({
  appState,
  user,
  galleries,
});
