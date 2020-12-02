import axios from "axios";
import React, { MouseEvent, useEffect, useState } from "react";
import { Col, Container, Jumbotron, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, RouteProps, useParams } from "react-router-dom";
import { apiUrl } from "../../config/constants";
import {
  addPainting,
  deletePainting,
  Painting,
} from "../../store/user/actions";
import { selectUser } from "../../store/user/selectors";
import { RouteParams } from "../../pages/artistPage/index";
import { createBootstrapComponent } from "react-bootstrap/esm/ThemeProvider";

export type ArtworkData = {
  title: string;
  date: string;
  collecting_institution: string;
  id: string;
  image_rights: string;
  medium: string;
  dimensions: {
    cm: {
      text: string;
    };
  };
  _links: {
    image: {
      href: string;
    };
    thumbnail: {
      href: string;
    };
  };
};

export type User = {
  name: string;
  gallery: {
    id: number;
    paintings: Painting[];
  };
};

// export type Props = {
//   location: {
//     props: {
//       link: string;
//     };
//   };
// };

export default function Artwork(props: RouteProps) {
  const dispatch = useDispatch();
  const params = new URLSearchParams(props?.location?.search);
  const apiArtworkLink = params.get("apiArtworkLink");

  const route_params: RouteParams = useParams();
  const [artworkData, setArtworkData] = useState<Partial<ArtworkData>>({});
  const user: User = useSelector(selectUser);
  const galleryId = user.gallery.id;

  async function fetchData() {
    const response = await axios.get(
      `${apiUrl}/artists/artwork/${route_params.id}`,
      {
        params: { apiArtworkUrl: apiArtworkLink },
      }
    );
    setArtworkData(response.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const togglePainting = (apiID: string | undefined) => {
    if (
      user.gallery.paintings.some(
        (painting: Painting) => painting.apiID === apiID
      )
    ) {
      dispatch(deletePainting(apiID, galleryId));
    } else {
      dispatch(addPainting(apiID));
    }
  };

  const imageLink = artworkData?._links?.image.href;
  const largeImgLink = imageLink?.replace("{image_version}", "large");

  console.log("largeImgLink", largeImgLink);

  console.log("artworkData", artworkData);
  return (
    <div>
      <Jumbotron>
        <h1>{artworkData?.title}</h1>
        {user.name ? (
          <button onClick={() => togglePainting(artworkData.id)}>
            {user.gallery.paintings.some(
              (painting: any) => painting.apiID === artworkData.id
            )
              ? "Remove from my gallery"
              : "Add to my gallery"}
          </button>
        ) : (
          <Link to="/login/">
            <button>Login to add paintings to your gallery</button>
          </Link>
        )}
      </Jumbotron>
      <Container>
        <Row className="align-items-center">
          <Col></Col>
          <Col>
            <img src={largeImgLink}></img>
            <p>
              <em>
                Image:{" "}
                {artworkData.image_rights
                  ? artworkData.image_rights
                  : "unknown"}
              </em>
            </p>
          </Col>
          <Col>
            <p>
              <strong>Date:</strong> {artworkData.date} <br />
              <strong>Medium:</strong> {artworkData.medium} <br />
              <strong>Size:</strong> {artworkData.dimensions?.cm.text} <br />
            </p>
            <p>
              <em>{artworkData.collecting_institution}</em>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
