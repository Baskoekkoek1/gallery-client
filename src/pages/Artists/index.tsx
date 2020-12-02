import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { apiUrl } from "../../config/constants";
import { Card, CardDeck } from "react-bootstrap";
import { Link } from "react-router-dom";

export type Result = {
  type: string;
};

export default function Artists() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  function submit(event: React.MouseEvent<HTMLInputElement>) {
    async function fetchData() {
      const response = await axios.get(`${apiUrl}/artists`, {
        params: { searchTerm: searchTerm },
      });
      //   console.log("response", response.data._embedded.results);
      const results = response?.data._embedded.results;
      //   console.log(results);
      const filteredResults = results.filter(
        (res: Result) => res.type === "artist"
      );
      console.log(filteredResults);
      setResults(filteredResults);
    }
    fetchData();
    event.preventDefault();
  }

  return (
    <div>
      <Container>
        <Form>
          <Form.Group controlId="formBasicSearch">
            <Form.Label>Search for artist:</Form.Label>
            <Form.Control
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              type="searchTerm"
              required
            />
            <Button variant="primary" type="submit" onClick={submit}>
              Search
            </Button>
          </Form.Group>
        </Form>
      </Container>
      <CardDeck style={{ display: "flex", flexDirection: "row" }}>
        {results.map((res: any, index) => {
          return (
            <Link
              key={index}
              to={{
                pathname: `/artists/${res.title}`,
                search: `?apiArtistLink=${res._links.self.href}`,
              }}
            >
              <Card
                bg="dark"
                text="white"
                style={{ width: "200px", height: "330px" }}
              >
                <Card.Img variant="top" src={res._links.thumbnail.href} />
                <Card.Body>
                  <Card.Title>{res.title}</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          );
        })}
      </CardDeck>
    </div>
  );
}
