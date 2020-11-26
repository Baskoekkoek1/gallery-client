import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiUrl } from "../config/constants";
import { userLogOut } from "../store/user/actions";
import { selectUser } from "../store/user/selectors";

export default function Home() {
  const user = useSelector(selectUser);

  return (
    <div>
      <h1>Home</h1>
      <h2>Welcome, {user.name}</h2>
    </div>
  );
}
