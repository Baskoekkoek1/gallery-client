import { UserWithToken, Painting } from "./actions";

const initialState = {
  token: localStorage.getItem("token"),
  name: null,
  email: null,
};

type Action =
  | { type: "LOGIN_SUCCESS"; payload: UserWithToken }
  | { type: "LOG_OUT"; payload: null }
  | { type: "ADD_PAINTING_SUCCES"; payload: Painting };

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", action.payload.token);
      return { ...state, ...action.payload };
    case "LOG_OUT":
      localStorage.removeItem("token");
      return { ...initialState, token: null };
    case "ADD_PAINTING_SUCCES":
      return {
        ...state,
        gallery: {
          //@ts-ignore
          ...state.gallery,
          //@ts-ignore
          paintings: [...state.gallery.paintings, action.payload],
        },
      };

    default:
      return state;
  }
};
