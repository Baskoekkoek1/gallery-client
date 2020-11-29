import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectUser } from "./selectors";

export type UserWithToken = {
  createdAt: string;
  email: string;
  id: number;
  name: string;
  token: string;
  updatedAt: string;
};
export type Painting = { apiID: string };

const loginSuccess = (userWithToken: UserWithToken) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: userWithToken,
  };
};

const addPaintingSucces = (data: Painting) => {
  return {
    type: "ADD_PAINTING_SUCCES",
    payload: data,
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

const signUp = (name: string, email: string, password: string) => {
  return async (dispatch: Function, getState: Function) => {
    try {
      const response = await axios.post(`${apiUrl}/signup`, {
        name,
        email,
        password,
      });
      dispatch(loginSuccess(response.data));
    } catch (error) {
      console.log(error.message);
    }
  };
};

const userLogOut = () => ({ type: "LOG_OUT" });

export function addPainting(apiID: string) {
  return async function thunk(dispatch: Function, getState: Function) {
    const { gallery, token } = selectUser(getState());

    const response = await axios.post(
      `${apiUrl}/galleries/${gallery.id}/add-artwork`,
      {
        apiID,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log("Add painting:", response.data);
    dispatch(addPaintingSucces(response.data.painting));
  };
}

export { userLogin, userLogOut, signUp };
