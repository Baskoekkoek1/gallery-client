import React, { useEffect } from "react";
import { Jumbotron } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchOneGallery } from "../../store/galleries/actions";
import { selectOneGallery } from "../../store/galleries/selectors";

export default function Gallery() {
  const dispatch = useDispatch();

  type Params = { id: string };
  const ROUTE_PARAMS: Params = useParams();
  console.log("ROUTE_PARAMS", ROUTE_PARAMS);
  const id = ROUTE_PARAMS.id;

  useEffect(() => {
    dispatch(fetchOneGallery(parseInt(id)));
  }, [dispatch]);

  const thisGallery = useSelector(selectOneGallery);

  return (
    <div>
      <Jumbotron>
        <h1>{thisGallery?.title}</h1>
        <p>{thisGallery?.description}</p>
      </Jumbotron>
    </div>
  );
}
