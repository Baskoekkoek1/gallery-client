import { UserWithToken, Painting, GalleryResponse } from "./types";

const initialState: State = {
  token: localStorage.getItem("token"),
  name: null,
  email: null,
  id: null,
  gallery: {
    id: null,
    title: null,
    description: null,
    userId: null,
    paintings: [],
  },
};

type Action =
  | { type: "LOGIN_SUCCESS"; payload: UserWithToken }
  | { type: "LOG_OUT"; payload: null }
  | { type: "TOKEN_STILL_VALID"; payload: any }
  | { type: "ADD_PAINTING_SUCCESS"; payload: Painting }
  | { type: "DELETE_PAINTING_SUCCESS"; payload: Painting }
  | { type: "GALLERY_UPDATED"; payload: GalleryResponse };

type State = {
  token: string | null;
  name: string | null;
  email: string | null;
  id: number | null;
  gallery: {
    id: number | null;
    title: string | null;
    description: string | null;
    userId: number | null;
    paintings: object[];
  };
};

export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", action.payload.token);
      return { ...state, ...action.payload };
    case "LOG_OUT":
      localStorage.removeItem("token");
      return { ...initialState, token: null };

    case "TOKEN_STILL_VALID":
      return { ...state, ...action.payload };

    case "ADD_PAINTING_SUCCESS":
      return {
        ...state,
        gallery: {
          ...state.gallery,
          paintings: [...state.gallery.paintings, action.payload],
        },
      };
    case "DELETE_PAINTING_SUCCESS":
      console.log("CALLED");
      const paintingId = action.payload.apiID;
      const newPaintings = state.gallery.paintings.filter(
        (painting: any) => painting.apiID !== paintingId
      );
      console.log("newPaintings", newPaintings);
      return {
        ...state,
        gallery: { ...state.gallery, paintings: newPaintings },
      };
    case "GALLERY_UPDATED":
      return {
        ...state,
        gallery: { ...action.payload, paintings: state.gallery.paintings },
      };

    default:
      return state;
  }
};
