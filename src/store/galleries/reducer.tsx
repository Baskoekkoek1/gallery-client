import { GalleriesData, oneGalleryData } from "./actions";

const initialState = {
  loading: true,
  all_galleries: [],
  selected_gallery: {},
};

type Action =
  | { type: "GALLERIES_FETCHED"; payload: GalleriesData }
  | { type: "ONE_GALLERY_FETCHED"; payload: oneGalleryData };

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case "GALLERIES_FETCHED":
      return { loading: false, all_galleries: action.payload };
    case "ONE_GALLERY_FETCHED":
      return { ...state, selected_gallery: action.payload };

    default:
      return state;
  }
};
