export type UserWithToken = {
  createdAt: string;
  email: string;
  id: number;
  name: string;
  token: string;
  updatedAt: string;
};
export type Painting = { apiID: string; id: number };

export type GalleryResponse = {
  id: number;
  title: string;
  desription: string;
  userId: number;
};
