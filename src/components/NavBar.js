import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

export default function NavBar({ toggleModal }) {
  return (
    <Navbar bg="dark" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand href="/" className="text-warning">
          It's Movie Time
        </Navbar.Brand>
        <Button variant="dark" onClick={toggleModal}>
          Setting
        </Button>
      </Container>
    </Navbar>
  );
}
