import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardDeck, Container, Jumbotron } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchOneGallery } from "../../store/galleries/actions";
import {
  selectOneGallery,
  selectPaintings,
} from "../../store/galleries/selectors";
import { apiUrl } from "../../config/constants";
import Artwork from "../artworkPage";

export type Artwork = {
  id: string;
  _links: {
    thumbnail: {
      href: string;
    };
    self: {
      href: string;
    };
  };
};

export default function Gallery() {
  const dispatch = useDispatch();
  const [artworks, setArtworks] = useState([]);

  const thisGallery = useSelector(selectOneGallery);
  const all_artworks: Object[] = useSelector(selectPaintings);

  type Params = { id: string };
  const ROUTE_PARAMS: Params = useParams();
  //   console.log("ROUTE_PARAMS", ROUTE_PARAMS);
  const id = ROUTE_PARAMS.id;

  useEffect(() => {
    dispatch(fetchOneGallery(parseInt(id)));
    async function dataFetch() {
      await getArtworks();
    }
    dataFetch();
    //@ts-ignore
  }, [dispatch, all_artworks?.[0].id]);

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
  // console.log("artworks", artworks);
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