import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectMyGallery } from "../../store/user/selectors";
import { apiUrl } from "../../config/constants";
import { Button, Card, CardDeck, Jumbotron } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Artwork } from "../artistPage";
import EditGalleryForm from "./EditGalleryForm";

export default function MyGallery() {
  const [artworks, setArtworks] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const thisGallery = useSelector(selectMyGallery);
  const id = thisGallery.id;
  const all_artworks = thisGallery.paintings;
  const editModeHandler = () => {
    setEditMode(!editMode);
  };
  useEffect(() => {
    async function dataFetch() {
      await getArtworks();
    }
    dataFetch();
    //@ts-ignore
  }, [all_artworks?.[0].id]);

  async function getArtworks() {
    // console.log("CALLED");
    all_artworks?.map((artwork) => {
      async function fetchArtwork() {
        const response = await axios.get(`${apiUrl}/galleries/${id}/artwork`, {
          params: {
            //@ts-ignore
            apiArtworkUrl: `https://api.artsy.net/api/artworks/${artwork.apiID}`,
          },
        });
        console.log("response", response);
        const dataResponse = response.data;
        const newPaintings = [...artworks, dataResponse];
        console.log("newPaintings", newPaintings);
        //@ts-ignore

        if (artworks.includes(artwork.id)) {
          return;
        } else {
          //@ts-ignore
          setArtworks((artworks) => [...artworks, dataResponse]);
        }
      }
      fetchArtwork();
    });
  }

  console.log("editmode", editMode);
  return (
    <div>
      <Jumbotron>
        <h1>{thisGallery?.title}</h1>
        <p>{thisGallery?.description}</p>
      </Jumbotron>
      <Button onClick={editModeHandler}>
        {editMode ? "Close" : "Edit Gallery"}
      </Button>
      {editMode ? <EditGalleryForm /> : null}
      <CardDeck>
        {artworks?.map((artwork: Artwork) => {
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
                  {/* @ts-ignore */}
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