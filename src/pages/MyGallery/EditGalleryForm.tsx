import React, { useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateMyGallery } from "../../store/user/actions";
import { selectMyGallery } from "../../store/user/selectors";

export default function EditGalleryForm() {
  const thisGallery = useSelector(selectMyGallery);
  const dispatch = useDispatch();

  const [title, setTitle] = useState(thisGallery.title);
  const [description, setDescription] = useState(thisGallery.description);

  function submitForm(event: React.MouseEvent<HTMLInputElement>) {
    event.preventDefault();
    dispatch(updateMyGallery(title, description));
  }

  return (
    <div>
      <Container>
        <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
          <h1 className="mt-5 mb-5">EDIT</h1>
          <Form.Group controlId="formBasicName">
            <Form.Label>Title</Form.Label>
            <Form.Control
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              type="text"
              placeholder="Enter title"
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Description</Form.Label>
            <Form.Control
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              type="text"
              placeholder="Enter your story bro!"
              required
            />
          </Form.Group>
          <Form.Group className="mt-5">
            <Button variant="primary" type="submit" onClick={submitForm}>
              Submit
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </div>
  );
}
