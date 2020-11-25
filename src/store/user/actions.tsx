import { apiUrl } from "../../config/constants";
import axios from "axios";

export type UserWithToken = {
  createdAt: string;
  email: string;
  id: number;
  name: string;
  token: string;
  updatedAt: string;
};

const loginSuccess = (userWithToken: UserWithToken) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: userWithToken,
  };
};

const userLogin = (email: string, password: string) => {
  return async (dispatch: Function, getState: Function) => {
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        email,
        password,
      });
      dispatch(loginSuccess(response.data));
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log(error.message);
      }
    }
  };
};

const userLogOut = () => ({ type: "LOG_OUT" });

export { userLogin, userLogOut };
