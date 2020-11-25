import { UserWithToken } from "./actions";

const initialState = {
  token: localStorage.getItem("token"),
  name: null,
  email: null,
};

type Action =
  | { type: "LOGIN_SUCCESS"; payload: UserWithToken }
  | { type: "LOG_OUT"; payload: null };

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", action.payload.token);
      return { ...state, ...action.payload };
    case "LOG_OUT":
      localStorage.removeItem("token");
      return { ...initialState, token: null };

    default:
      return state;
  }
};
