import React, { useEffect } from "react";
import "../index.css";
import { CiBarcode } from "react-icons/ci";

export const Landing = () => {
  return (
    <>
      <section className="masthead d-flex align-items-center bg-text position-absolute top-50 start-50 translate-middle">
        <div className="container px-4 px-lg-5 text-center">
          <div className="name">
            <CiBarcode className="logo" />
            <h1 className="mb-0 mx-2 weight-bold">Kanban Board</h1>
          </div>
        </div>
      </section>
    </>
  );
};
