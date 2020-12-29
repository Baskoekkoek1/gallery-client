export type State = {
  appState: {
    loading: boolean;
  };
};

export const selectAppLoading = (state: State) => state.appState.loading;
