import axios from "axios";
import React, { MouseEvent, useEffect, useState } from "react";
import { Jumbotron } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { apiUrl } from "../../config/constants";
import { addPainting } from "../../store/user/actions";

//@ts-ignore
export default function Artwork(props) {
  const dispatch = useDispatch();
  const apiArtworkLink = props.location.props.link;
  console.log(apiArtworkLink);
  const route_params = useParams();
  const [artworkData, setArtworkData] = useState({});

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

  const addToGallery = (event: MouseEvent<HTMLButtonElement>) => {
    //@ts-ignore
    dispatch(addPainting(event.target.value));
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
        <button onClick={addToGallery} value={artworkData.id}>
          Add to My Gallery
        </button>
      </Jumbotron>
      {/* 
  // @ts-ignore */}
      <img src={artworkData?._links?.thumbnail.href}></img>
    </div>
  );
}
