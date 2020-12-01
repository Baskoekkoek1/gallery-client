import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, CardDeck, Jumbotron } from "react-bootstrap";
import { Link, Route, RouteProps, useParams } from "react-router-dom";
import { apiUrl } from "../../config/constants";

export type Props = {
  location: {
    props: {
      link: string;
    };
  };
};

export type ArtistData = {
  name: string;
  birthday: string;
  deathday: string;
  biography: string;
  _links: {
    artworks: {
      href: string;
    };
    thumbnail: {
      href: string;
    };
  };
};

export type RouteParams = {
  name: string;
  id: string;
};

export type Artwork = {
  id: number;
  title: string;
  _links: {
    thumbnail: {
      href: string;
    };
    self: {
      href: string;
    };
  };
};

export default function ArtistPage(props: RouteProps) {
  const params = new URLSearchParams(props?.location?.search);
  const apiArtistLink = params.get("apiArtistLink");
  const route_params: RouteParams = useParams();

  const [artistData, setArtistData] = useState<Partial<ArtistData>>({});
  const [artworks, setArtworks] = useState([]);
  const apiArtworksLink = artistData?._links?.artworks.href;

  useEffect(() => {
    async function dataToFetch() {
      await fetchData();
    }
    dataToFetch();
  }, []);

  async function fetchData() {
    const response = await axios.get(`${apiUrl}/artists/${route_params.name}`, {
      params: { apiArtistUrl: apiArtistLink },
    });
    console.log("ARTISTdata", response.data);
    setArtistData(response.data);
    const apiArtworksLink = response.data?._links?.artworks.href;
    await fetchArtworks(apiArtworksLink);
  }
  async function fetchArtworks(link: string) {
    const response = await axios.get(
      `${apiUrl}/artists/${route_params.name}/artworks`,
      {
        params: { apiArtworksUrl: link },
      }
    );
    setArtworks(response.data._embedded.artworks);
    // console.log("responseARTWORKS", response.data._embedded.artworks);
  }

  // console.log("artistData", artistData);
  // console.log("artworks", artworks);

  return (
    <div>
      <Jumbotron>
        <h1>
          {artistData?.name} {artistData?.birthday} - {artistData?.deathday}
        </h1>
        <img src={artistData?._links?.thumbnail?.href} />
        <div>
          <p>{artistData?.biography}</p>
        </div>
      </Jumbotron>
      <CardDeck>
        {artworks?.map((artwork: Artwork) => {
          return (
            <Link
              key={artwork.id}
              to={{
                pathname: `/artwork/${artwork.id}`,
                search: `?apiArtworkLink=${artwork._links.self.href}`,
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
