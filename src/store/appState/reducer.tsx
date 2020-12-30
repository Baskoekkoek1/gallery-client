const initialState = {
  loading: false,
};

type Action = { type: "APP_LOADING" } | { type: "APP_DONE_LOADING" };

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case "APP_LOADING":
      return { ...state, loading: true };
    case "APP_DONE_LOADING":
      return { ...state, loading: false };
    default:
      return state;
  }
};
