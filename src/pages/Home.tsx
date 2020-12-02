import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, CardDeck, Jumbotron } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { apiUrl } from "../config/constants";
import { userLogOut } from "../store/user/actions";
import { selectUser } from "../store/user/selectors";
import { Artwork } from "./artistPage";

export default function Home() {
  const user = useSelector(selectUser);
  const [artworks, setArtworks] = useState<Artwork[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await axios.get(`${apiUrl}/artworks`, {
      params: { apiArtworksUrl: `https://api.artsy.net/api/artworks?size=12` },
    });
    setArtworks(response.data._embedded.artworks);
  }

  async function fetchMoreData() {
    const response = await axios.get(`${apiUrl}/artworks`, {
      params: {
        apiArtworksUrl: `https://api.artsy.net/api/artworks?size=12&offset=${artworks.length}`,
      },
    });
    const newArtworks = response.data._embedded.artworks;
    setArtworks(artworks.concat(newArtworks));
  }
  console.log("HOW MANY?", artworks);
  return (
    <div>
      <Jumbotron>
        <h1>Home</h1>
        <h2>Welcome, {user.name ? user.name : " stranger!"}</h2>
        <br />
        <br />
        <h6>Browse paitings or click Artists to search by artist.</h6>
      </Jumbotron>
      <CardDeck>
        {artworks?.map((artwork: Artwork) => {
          return (
            <Link
              key={artwork.id}
              to={{
                pathname: `/artwork/${artwork.id}`,
                search: `?apiArtworkLink=${artwork?._links?.self.href}`,
              }}
            >
              <Card
                bg="dark"
                text="white"
                style={{ width: "200px", height: "330px" }}
              >
                <Card.Img
                  src={artwork?._links?.thumbnail?.href}
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
        })}
      </CardDeck>
      <br />
      <br />
      <Button onClick={fetchMoreData}>Load more...</Button>
      <br />
      <br />
    </div>
  );
}
