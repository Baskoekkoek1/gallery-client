import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectMyGallery } from "../../store/user/selectors";
import { apiUrl } from "../../config/constants";
import { Button, Card, CardDeck, Jumbotron } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Artwork } from "../artistPage";
import EditGalleryForm from "./EditGalleryForm";
import { Painting } from "../../store/user/types";
import "./MyGallery.scss";

export default function MyGallery() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [editMode, setEditMode] = useState(false);
  const thisGallery = useSelector(selectMyGallery);
  const id = thisGallery.id;
  const all_artworks: Painting[] = thisGallery.paintings;
  const useEffectDepend = all_artworks?.[0]?.id;
  const editModeHandler = () => {
    setEditMode(!editMode);
  };

  useEffect(() => {
    async function dataFetch() {
      await getArtworks();
    }
    dataFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useEffectDepend]);

  async function getArtworks() {
    all_artworks?.forEach((artwork) => {
      async function fetchArtwork() {
        const response = await axios.get(`${apiUrl}/galleries/${id}/artwork`, {
          params: {
            apiArtworkUrl: `https://api.artsy.net/api/artworks/${artwork.apiID}`,
          },
        });
        const dataResponse = response.data;
        setArtworks((artworks) => [...artworks, dataResponse]);
      }
      fetchArtwork();
    });
  }

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
      <div className="gallery-container">
        <CardDeck>
          {artworks?.map((artwork: Artwork) => {
            return (
              <div key={artwork.id}>
                <Link
                  to={{
                    pathname: `/artwork/${artwork.id}`,
                    search: `?apiArtworkLink=${artwork._links.self.href}`,
                  }}
                >
                  <Card
                    bg="dark"
                    text="white"
                    style={{
                      width: "200px",
                      height: "330px",
                      marginBottom: "10px",
                    }}
                  >
                    <Card.Img
                      src={artwork._links.thumbnail.href}
                      variant="top"
                      style={{ width: "200px", maxHeight: "220px" }}
                    />
                    <Card.Body>
                      <Card.Title>{artwork.title}</Card.Title>
                    </Card.Body>
                  </Card>
                </Link>
              </div>
            );
          })}
        </CardDeck>
      </div>
    </div>
  );
}
