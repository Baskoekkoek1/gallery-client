type State = {
  user: {
    token: string;
    name: string;
    email: string;
    id: number;
    gallery: {
      id: number;
      title: string;
      userId: number;
      paintings: object[];
    };
  };
};

export const selectToken = (state: State) => state.user.token;

export const selectUser = (state: State) => state.user;

export {};
