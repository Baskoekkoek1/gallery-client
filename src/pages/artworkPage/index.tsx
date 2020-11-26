import axios from "axios";
import React, { useEffect, useState } from "react";
import { Jumbotron } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { apiUrl } from "../../config/constants";

//@ts-ignore
export default function Artwork(props) {
  const apiArtworkLink = props.location.props.link;
  const route_params = useParams();
  const [artworkData, setArtworkData] = useState({});

  async function fetchData() {
    //@ts-ignore
    const response = await axios.get(`${apiUrl}/artists/${route_params.id}`, {
      params: { apiArtworkUrl: apiArtworkLink },
    });
    console.log("response", response);
  }

  useEffect(() => {
    fetchData();
  });

  return (
    <div>
      <Jumbotron>
        <h1>Artwork</h1>
      </Jumbotron>
    </div>
  );
}
