import React, { useEffect } from "react";
import { Card, CardDeck } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchGalleries } from "../../store/galleries/actions";
import { selectAllGalleries } from "../../store/galleries/selectors";

export default function Galleries() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGalleries());
  }, [dispatch]);

  const allGalleries = useSelector(selectAllGalleries);

  type Gallery = {
    id: number;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    userId: number;
  };

  return (
    <div>
      <h1>All Galleries will be here!</h1>
      {allGalleries.map((gallery: Gallery) => {
        return (
          <CardDeck key={gallery.id}>
            <Link
              key={gallery.id}
              to={{ pathname: `/galleries/${gallery.id}` }}
            >
              <Card>
                <h4>{gallery.title}</h4>
                <p>{gallery.description}</p>
              </Card>
            </Link>
          </CardDeck>
        );
      })}
    </div>
  );
}
