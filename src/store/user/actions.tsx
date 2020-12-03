import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken, selectUser } from "./selectors";
import { UserWithToken, Painting, GalleryResponse } from "./types";

const loginSuccess = (userWithToken: UserWithToken) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: userWithToken,
  };
};

const tokenStillValid = (userWithoutToken: any) => ({
  type: "TOKEN_STILL_VALID",
  payload: userWithoutToken,
});

const addPaintingSuccess = (data: Painting) => {
  return {
    type: "ADD_PAINTING_SUCCESS",
    payload: data,
  };
};

const deletePaintingSuccess = (data: Painting) => {
  return {
    type: "DELETE_PAINTING_SUCCESS",
    payload: data,
  };
};

const galleryUpdated = (gallery: GalleryResponse) => {
  return {
    type: "GALLERY_UPDATED",
    payload: gallery,
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

export function addPainting(apiID: string | undefined) {
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
    dispatch(addPaintingSuccess(response.data.painting));
  };
}

export const getUserWithStoredToken = () => {
  return async (dispatch: Function, getState: Function) => {
    const token = selectToken(getState());

    if (token === null) return;

    try {
      const response = await axios.get(`${apiUrl}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(tokenStillValid(response.data));
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      dispatch(userLogOut());
    }
  };
};

export function deletePainting(
  paintingId: string | undefined,
  galleryId: number
) {
  return async function thunk(dispatch: Function, getState: Function) {
    const { token } = selectUser(getState());
    try {
      const response = await axios.delete(
        `${apiUrl}/galleries/${galleryId}/${paintingId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const responsePainting = response.data.thisPainting;
      dispatch(deletePaintingSuccess(responsePainting));
    } catch (error) {}
  };
}

export function updateMyGallery(title: string, description: string) {
  return async (dispatch: Function, getState: Function) => {
    const { gallery, token } = selectUser(getState());

    const response = await axios.patch(
      `${apiUrl}/galleries/${gallery.id}`,
      {
        title,
        description,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(galleryUpdated(response.data.gallery));
  };
}

export { userLogin, userLogOut, signUp };
