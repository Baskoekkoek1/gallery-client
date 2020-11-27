//@ts-ignore
export const selectAllGalleries = (state) => state.galleries.all_galleries;
//@ts-ignore
export const selectOneGallery = (state) => state.galleries.selected_gallery;
//@ts-ignore
export const selectPaintings = (state) =>
  state.galleries.selected_gallery?.paintings;

export {};
