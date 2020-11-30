import axios from "axios";
import React, { MouseEvent, useEffect, useState } from "react";
import { Jumbotron } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { apiUrl } from "../../config/constants";
import { addPainting, deletePainting } from "../../store/user/actions";
import { selectUser } from "../../store/user/selectors";

//@ts-ignore
export default function Artwork(props) {
  const dispatch = useDispatch();
  const apiArtworkLink = props.location.props.link;
  console.log(apiArtworkLink);
  const route_params = useParams();
  const [artworkData, setArtworkData] = useState({});
  const user = useSelector(selectUser);
  const galleryId = user.gallery.id;

  async function fetchData() {
    const response = await axios.get(
      //@ts-ignore
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

  const addToGallery = (apiID: string) => {
    dispatch(addPainting(apiID));
  };

  const removeFromGallery = (apiID: string) => {
    dispatch(deletePainting(apiID, galleryId));
  };

  console.log("artworkData", artworkData);
  return (
    <div>
      <Jumbotron>
        {/* 
  // @ts-ignore */}
        <h1>{artworkData?.title}</h1>
        <h3>
          {/* 
  // @ts-ignore */}
          <em>{artworkData?.collecting_institution}</em>
        </h3>
        {/* 
  // @ts-ignore */}
        <button onClick={() => addToGallery(artworkData.id)}>
          Add to My Gallery
        </button>
        {/* 
  // @ts-ignore */}
        <button onClick={() => removeFromGallery(artworkData.id)}>
          Remove from My Gallery
        </button>
      </Jumbotron>
      {/* 
  // @ts-ignore */}
      <img src={artworkData?._links?.thumbnail.href}></img>
    </div>
  );
}
