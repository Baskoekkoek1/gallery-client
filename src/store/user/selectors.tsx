import { Painting } from "./types";

type State = {
  user: {
    token: string;
    name: string;
    email: string;
    id: number;
    gallery: {
      id: number;
      title: string;
      description: string;
      userId: number;
      paintings: Painting[];
    };
  };
};

export const selectToken = (state: State) => state.user.token;

export const selectUser = (state: State) => state.user;

export const selectMyGallery = (state: State) => state.user.gallery;

export {};
