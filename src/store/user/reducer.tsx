import { UserWithToken, Painting } from "./actions";

const initialState = {
  token: localStorage.getItem("token"),
  name: null,
  email: null,
};

type Action =
  | { type: "LOGIN_SUCCESS"; payload: UserWithToken }
  | { type: "LOG_OUT"; payload: null }
  | { type: "ADD_PAINTING_SUCCESS"; payload: Painting }
  | { type: "DELETE_PAINTING_SUCCESS"; payload: Painting };

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", action.payload.token);
      return { ...state, ...action.payload };
    case "LOG_OUT":
      localStorage.removeItem("token");
      return { ...initialState, token: null };
    case "ADD_PAINTING_SUCCESS":
      return {
        ...state,
        gallery: {
          //@ts-ignore
          ...state.gallery,
          //@ts-ignore
          paintings: [...state.gallery.paintings, action.payload],
        },
      };
    case "DELETE_PAINTING_SUCCESS":
      console.log("CALLED");
      const paintingId = action.payload.apiID;
      //@ts-ignore
      const newPaintings = state.gallery.paintings.filter(
        (painting: Painting) => painting.apiID !== paintingId
      );
      console.log("newPaintings", newPaintings);
      return {
        ...state,
        //@ts-ignore
        gallery: { ...state.gallery, paintings: newPaintings },
      };
    default:
      return state;
  }
};
