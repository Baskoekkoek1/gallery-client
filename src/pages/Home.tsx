import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogOut } from "../store/user/actions";
import { selectUser } from "../store/user/selectors";

export default function Home() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  return (
    <div>
      <h1>Home</h1>
      <h2>Welcome, {user.name}</h2>
      <button onClick={() => dispatch(userLogOut())}>log out</button>
    </div>
  );
}
