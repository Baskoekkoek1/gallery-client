import axios from "axios";
import React, { useEffect, useState } from "react";
import { Jumbotron } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { apiUrl } from "../../config/constants";
//@ts-ignore
export default function ArtistPage(props) {
  const apiArtistLink = props.location.props.link;
  const route_params = useParams();
  console.log(route_params);

  const [artistData, setArtistData] = useState({});

  async function fetchData() {
    const response = await axios.get(`${apiUrl}/artists/${route_params}`, {
      params: { apiArtistUrl: apiArtistLink },
    });
    // console.log("response", response.data);
    setArtistData(response.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  console.log("artistData", artistData);

  return (
    <div>
      <Jumbotron>
        <h1>
          {/* 
  // @ts-ignore */}
          {artistData?.name} {artistData?.birthday} - {artistData?.deathday}
        </h1>
        {/* 
  // @ts-ignore */}
        <img src={artistData?._links?.thumbnail.href} />
        <div>
          {/* 
  // @ts-ignore */}
          <p>{artistData?.biography}</p>
        </div>
      </Jumbotron>
    </div>
  );
}
