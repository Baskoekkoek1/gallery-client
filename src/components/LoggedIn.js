import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogOut } from "../store/user/actions";
import Button from "react-bootstrap/Button";
import { selectUser } from "../store/user/selectors";
import Nav from "react-bootstrap/Nav";
import NavbarItem from "./NavbarItem";
import { Person } from "react-bootstrap-icons";

export default function LoggedIn() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  return (
    <>
      <NavbarItem path="/artists" linkText="Artists" />
      <NavbarItem path="/galleries" linkText="Galleries" />
      <NavbarItem path="/mygallery" linkText="My Gallery" />
      <Nav.Item style={{ padding: ".5rem 1rem" }} className="name">
        <Person /> {user.email}
      </Nav.Item>
      <Button onClick={() => dispatch(userLogOut())}>Logout</Button>
    </>
  );
}
