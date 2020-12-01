export type Artwork = {
  id: number;
  title: string;
  _links: {
    thumbnail: {
      href: string;
    };
    self: {
      href: string;
    };
  };
};
