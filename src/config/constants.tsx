export const DEFAULT_MESSAGE_TIMEOUT = 3000;
export const apiUrl =
  process.env.NODE_ENV === "production"
    ? "https://gallery-bas-koekkoek.herokuapp.com"
    : "http://localhost:4000";
