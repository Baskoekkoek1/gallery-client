import React from "react";
import NavbarItem from "./NavbarItem";

export default function LoggedOut() {
  return (
    <>
      <NavbarItem path="/artists" linkText="Artists" />
      <NavbarItem path="/login" linkText="Login" />
      <NavbarItem path="/signup" linkText="Sign up" />
    </>
  );
}
