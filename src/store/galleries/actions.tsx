import axios from "axios";
import { apiUrl } from "../../config/constants";

export type GalleriesData = { galleries: object[] };
export type oneGalleryData = {
  thisGallery: {
    createdAt: string;
    description: string;
    id: number;
    title: string;
    updatedAt: string;
    userId: number;
  };
};

export function galleriesList(data: GalleriesData) {
  return {
    type: "GALLERIES_FETCHED",
    payload: data,
  };
}

export function oneGallery(data: oneGalleryData) {
  return {
    type: "ONE_GALLERY_FETCHED",
    payload: data,
  };
}

export function fetchGalleries() {
  return async function thunk(dispatch: Function, getState: Function) {
    const response = await axios.get(`${apiUrl}/galleries`);
    dispatch(galleriesList(response.data.galleries));
  };
}

export function fetchOneGallery(id: number) {
  return async function thunk(dispatch: Function, getState: Function) {
    const response = await axios.get(`${apiUrl}/galleries/${id}`);
    dispatch(oneGallery(response.data.thisGallery));
  };
}
