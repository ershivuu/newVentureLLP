import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Lazy load the components
const AdminPanel = lazy(() => import("./admin/AdminPanel/AdminPanel.jsx"));
const UpcomingProjects = lazy(() =>
  import("./admin/AdminInnerPages/UpcomingProjects/UpcomingProjects.jsx")
);
const PageHeading = lazy(() =>
  import("./admin/AdminInnerPages/UpcomingProjects/PageHeading.jsx")
);
const BannerImages = lazy(() =>
  import("./admin/AdminInnerPages/UpcomingProjects/BannerImages.jsx")
);
const Projects = lazy(() => import("./pages/upcommingProject/Projects.jsx"));
const Home = lazy(() => import("./pages/Home/Home.jsx"));
const About = lazy(() => import("./pages/About/About.jsx"));
const NriCorner = lazy(() => import("./pages/NRI/NriCorner.jsx"));
const Gallery = lazy(() => import("./pages/Gallery/Gallery.jsx"));
const Contact = lazy(() => import("./pages/Contact/Contact.jsx"));
const CharCounter = lazy(() => import("./pages/CharCounter/Counter.jsx"));
const ProjectSlider = lazy(() =>
  import("./admin/AdminInnerPages/UpcomingProjects/ProjectSlider.jsx")
);
const SliderContent = lazy(() =>
  import("./admin/AdminInnerPages/UpcomingProjects/SliderContent.jsx")
);

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route key="adminpanel" path="adminpanel" element={<AdminPanel />}>
            <Route
              key="upcomingprojects"
              path="upcomingprojects"
              element={<UpcomingProjects />}
            />
            <Route
              key="pageheading"
              path="pageheading"
              element={<PageHeading />}
            />
            <Route
              key="bannerimages"
              path="bannerimages"
              element={<BannerImages />}
            />
            <Route
              key="projectslider"
              path="projectslider"
              element={<ProjectSlider />}
            />
            <Route
              key="slidercontent"
              path="slidercontent"
              element={<SliderContent />}
            />
          </Route>

          <Route key="Projects" path="/projects" element={<Projects />} />
          <Route key="Home" path="/" element={<Home />} />
          <Route key="About" path="/about" element={<About />} />
          <Route key="NriCorner" path="/nri-corner" element={<NriCorner />} />
          <Route key="Gallery" path="/gallery" element={<Gallery />} />
          <Route key="Contact" path="/contact-us" element={<Contact />} />
          <Route key="counter" path="/counter" element={<CharCounter />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
