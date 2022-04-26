import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

const Home: NextPage = () => {
  const router = useRouter();
  React.useEffect(() => {
    router.replace("/register");
  });

  return <h1>Home</h1>;
};

export default Home;
