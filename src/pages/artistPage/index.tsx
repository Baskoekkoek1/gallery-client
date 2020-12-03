import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, CardDeck, Jumbotron } from "react-bootstrap";
import { Link, RouteProps, useParams } from "react-router-dom";
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

  useEffect(() => {
    async function dataToFetch() {
      await fetchData();
    }
    dataToFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchData() {
    const response = await axios.get(`${apiUrl}/artists/${route_params.name}`, {
      params: { apiArtistUrl: apiArtistLink },
    });
    setArtistData(response.data);
    const apiArtworksLink = response.data?._links?.artworks.href;
    const apiArtworksLinkMore = apiArtworksLink.concat("&size=1000");
    await fetchArtworks(apiArtworksLinkMore);
  }
  async function fetchArtworks(link: string) {
    const response = await axios.get(
      `${apiUrl}/artists/${route_params.name}/artworks`,
      {
        params: { apiArtworksUrl: link },
      }
    );
    setArtworks(response.data._embedded.artworks);
  }

  return (
    <div>
      <Jumbotron>
        <h1>
          {artistData?.name} {artistData?.birthday} - {artistData?.deathday}
        </h1>
        <img src={artistData?._links?.thumbnail?.href} alt="artist thumbnail" />
        <div>
          <p>{artistData?.biography}</p>
        </div>
      </Jumbotron>
      <CardDeck>
        {artworks.length > 1 ? (
          artworks.map((artwork: Artwork) => {
            return (
              <Link
                key={artwork.id}
                to={{
                  pathname: `/artwork/${artwork.id}`,
                  search: `?apiArtworkLink=${artwork._links.self.href}`,
                }}
              >
                <Card
                  bg="dark"
                  text="white"
                  style={{ width: "200px", height: "330px" }}
                >
                  <Card.Img
                    src={artwork._links.thumbnail.href}
                    variant="top"
                    className="img-fluid"
                    style={{ width: "200px", maxHeight: "220px" }}
                  />
                  <Card.Body>
                    <Card.Title>{artwork.title}</Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            );
          })
        ) : (
          <Card>
            <Card.Title>
              Sorry, we do not have any artworks of this artist yet.
            </Card.Title>
          </Card>
        )}
      </CardDeck>
    </div>
  );
}
