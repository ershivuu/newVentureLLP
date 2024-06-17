import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact.jsx";
import Projects from "./pages/upcommingProject/Projects.jsx";
import Headers from "./components/Headers/Headers.jsx";
import NriCorner from "./pages/NRI/NriCorner.jsx";
import Gallery from "./pages/Gallery/Gallery.jsx";

function App() {
  return (
    <BrowserRouter>
      <Headers></Headers>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/nri-corner" element={<NriCorner />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact-us" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
