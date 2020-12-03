import React, { useEffect } from "react";
import { Card, CardDeck, Jumbotron } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchGalleries } from "../../store/galleries/actions";
import { selectAllGalleries } from "../../store/galleries/selectors";
import "../custom.scss";

export type Gallery = {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
};

export default function Galleries() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGalleries());
  }, [dispatch]);

  const allGalleries = useSelector(selectAllGalleries);

  return (
    <div>
      <Jumbotron>
        <h1 className="h1">All Galleries</h1>
      </Jumbotron>
      <CardDeck>
        {allGalleries.map((gallery: any) => {
          return (
            <Link
              key={gallery.id}
              to={{ pathname: `/galleries/${gallery.id}` }}
            >
              <Card bg="dark" text="white" style={{ width: "400px" }}>
                <Card.Title className="card-title">
                  <h4>{gallery.title}</h4>
                </Card.Title>
                <Card.Body className="text">
                  <p>{gallery.description}</p>
                </Card.Body>
              </Card>
            </Link>
          );
        })}
      </CardDeck>
    </div>
  );
}
