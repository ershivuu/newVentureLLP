import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Headers from "../../components/Headers/Headers";
import "./Home.css";

function Home() {
  return (
    <>
      <Headers></Headers>
      <div className="wrapper home-page">
        <div className="box"></div>
      </div>
    </>
  );
}

export default Home;
