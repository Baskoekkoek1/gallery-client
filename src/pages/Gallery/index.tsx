import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardDeck, Jumbotron } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchOneGallery } from "../../store/galleries/actions";
import {
  selectOneGallery,
  selectPaintings,
} from "../../store/galleries/selectors";
import { apiUrl } from "../../config/constants";
import { Artwork } from "../../store/galleries/types";
import { Painting } from "../../store/user/types";

export default function Gallery() {
  const dispatch = useDispatch();
  const [artworks, setArtworks] = useState<Artwork[]>([]);

  const thisGallery = useSelector(selectOneGallery);
  const all_artworks: Painting[] = useSelector(selectPaintings);

  type Params = { id: string };
  const ROUTE_PARAMS: Params = useParams();
  const id = ROUTE_PARAMS.id;
  const useEffectDepend = all_artworks?.[0]?.id;

  useEffect(() => {
    dispatch(fetchOneGallery(parseInt(id)));
    async function dataFetch() {
      await getArtworks();
    }
    dataFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, useEffectDepend]);

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
          );
        })}
      </CardDeck>
    </div>
  );
}
