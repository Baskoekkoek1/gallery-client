import React, { useEffect, useState } from "react";
import axios from "axios";
import { Jumbotron } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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
  }, [dispatch]);

  async function getArtworks() {
    console.log("CALLED");
    all_artworks?.map((artwork) => {
      async function fetchArtwork() {
        const response = await axios.get(`${apiUrl}/galleries/${id}/artwork`, {
          params: {
            //@ts-ignore
            apiArtworkUrl: `https://api.artsy.net/api/artworks/${artwork.apiID}`,
          },
        });
        console.log("response", response);
        //@ts-ignore
        setArtworks(response.data);
      }
      fetchArtwork();
    });
  }
  console.log("artworks", artworks);

  console.log("artworks", artworks);
  return (
    <div>
      <Jumbotron>
        <h1>{thisGallery?.title}</h1>
        <p>{thisGallery?.description}</p>
      </Jumbotron>
      {!artworks ? (
        <h1>LOADING</h1>
      ) : (
        artworks.map((artwork: Artwork) => {
          return (
            <img key={artwork.id} src={artwork._links.thumbnail.href}></img>
          );
        })
      )}
    </div>
  );
}
