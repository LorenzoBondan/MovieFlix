import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Login from "./Login";

type FormData = {
    username: string,
    password: string,
  };

  type LocationState = {
    from: string;
  }

const Home = () => {
    return(
        <>
            <Login/>
        </>
    );
}

export default Home;