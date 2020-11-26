import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, CardDeck, Jumbotron } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { clearLine } from "readline";
import { apiUrl } from "../../config/constants";
//@ts-ignore
export default function ArtistPage(props) {
  const apiArtistLink = props.location.props.link;
  const route_params = useParams();
  //@ts-ignore
  //   console.log("route", route_params.name);

  const [artistData, setArtistData] = useState({});
  const [artworks, setArtworks] = useState([]);
  //@ts-ignore
  const apiArtworksLink = artistData?._links?.artworks.href;

  useEffect(() => {
    async function dataToFetch() {
      await fetchData();
    }
    dataToFetch();
  }, []);

  async function fetchData() {
    //@ts-ignore
    const response = await axios.get(`${apiUrl}/artists/${route_params.name}`, {
      params: { apiArtistUrl: apiArtistLink },
    });
    // console.log("response", response.data);
    setArtistData(response.data);
    const apiArtworksLink = response.data?._links?.artworks.href;
    await fetchArtworks(apiArtworksLink);
  }
  //@ts-ignore
  async function fetchArtworks(link) {
    console.log("I GOT CALLED");
    const response = await axios.get(
      //@ts-ignore
      `${apiUrl}/artists/${route_params.name}/artworks`,
      {
        params: { apiArtworksUrl: link },
      }
    );
    setArtworks(response.data._embedded.artworks);
    console.log("responseARTWORKS", response.data._embedded.artworks);
  }

  console.log("artistData", artistData);
  console.log("artworks", artworks);

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
      <CardDeck>
        {artworks?.map((artwork: any) => {
          return (
            <Link
              key={artwork.id}
              to={{
                pathname: `/artwork/${artwork.id}`,
                //@ts-ignore
                props: {
                  link: artwork._links.self.href,
                },
              }}
            >
              <Card style={{ width: "200px", height: "330px" }}>
                <Card.Img
                  src={artwork._links.thumbnail.href}
                  variant="top"
                  style={{ width: "200px" }}
                />
                <Card.Body>
                  <Card.Title>{artwork.title}</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          );
        })}
      </CardDeck>
    </div>
  );
}
