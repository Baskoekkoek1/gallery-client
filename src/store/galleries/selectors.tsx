export type State = {
  galleries: {
    all_galleries: Object[];
    selected_gallery: {
      paintings: Object[];
      title: string;
      description: string;
    };
  };
};

export const selectAllGalleries = (state: State) =>
  state.galleries.all_galleries;

export const selectOneGallery = (state: State) =>
  state.galleries.selected_gallery;

export const selectPaintings = (state: State) =>
  state.galleries.selected_gallery?.paintings;

export {};
