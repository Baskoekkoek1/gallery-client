import React, { useEffect } from "react";
import { Card, CardDeck, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchGalleries } from "../../store/galleries/actions";
import { selectAllGalleries } from "../../store/galleries/selectors";

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
      <h1>All Galleries</h1>
      <CardDeck>
        {allGalleries.map((gallery: any) => {
          return (
            <Link
              key={gallery.id}
              to={{ pathname: `/galleries/${gallery.id}` }}
            >
              <Card bg="dark" text="white" style={{ width: "400px" }}>
                <Card.Title>
                  <h4>{gallery.title}</h4>
                </Card.Title>
                <Card.Body>
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
