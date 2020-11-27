import axios from "axios";
import React, { useEffect, useState } from "react";
import { Jumbotron } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { apiUrl } from "../../config/constants";

//@ts-ignore
export default function Artwork(props) {
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
      </Jumbotron>
      {/* 
  // @ts-ignore */}
      <img src={artworkData?._links?.thumbnail.href}></img>
    </div>
  );
}
