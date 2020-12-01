import axios from "axios";
import React, { MouseEvent, useEffect, useState } from "react";
import { Jumbotron } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RouteProps, useParams } from "react-router-dom";
import { apiUrl } from "../../config/constants";
import {
  addPainting,
  deletePainting,
  Painting,
} from "../../store/user/actions";
import { selectUser } from "../../store/user/selectors";
import { RouteParams } from "../../pages/artistPage/index";

export type ArtworkData = {
  title: string;
  collecting_institution: string;
  id: string;
  _links: {
    thumbnail: {
      href: string;
    };
  };
};

export type User = {
  gallery: {
    id: number;
    paintings: Painting[];
  };
};

// export type Props = {
//   location: {
//     props: {
//       link: string;
//     };
//   };
// };

export default function Artwork(props: RouteProps) {
  const dispatch = useDispatch();
  const params = new URLSearchParams(props?.location?.search);
  const apiArtworkLink = params.get("apiArtworkLink");

  const route_params: RouteParams = useParams();
  const [artworkData, setArtworkData] = useState<Partial<ArtworkData>>({});
  const user: User = useSelector(selectUser);
  const galleryId = user.gallery.id;

  async function fetchData() {
    const response = await axios.get(
      `${apiUrl}/artists/artwork/${route_params.id}`,
      {
        params: { apiArtworkUrl: apiArtworkLink },
      }
    );
    setArtworkData(response.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const togglePainting = (apiID: string) => {
    if (
      user.gallery.paintings.some((painting: any) => painting.apiID === apiID)
    ) {
      dispatch(deletePainting(apiID, galleryId));
    } else {
      dispatch(addPainting(apiID));
    }
  };

  console.log("artworkData", artworkData);
  return (
    <div>
      <Jumbotron>
        <h1>{artworkData?.title}</h1>
        <h3>
          <em>{artworkData?.collecting_institution}</em>
        </h3>
        {/* @ts-ignore */}
        <button onClick={() => togglePainting(artworkData.id)}>
          {user.gallery.paintings.some(
            (painting: any) => painting.apiID === artworkData.id
          )
            ? "Remove from my gallery"
            : "Add to my gallery"}
        </button>
      </Jumbotron>
      <img src={artworkData?._links?.thumbnail.href}></img>
    </div>
  );
}
