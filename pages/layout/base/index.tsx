import React from "react";
import Navbar from "../../components/navbar";

export const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="max-w-7xl m-auto">{children}</div>
    </>
  );
};
