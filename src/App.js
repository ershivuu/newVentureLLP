import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Test from "../src/admin/Test.jsx"

import EditHome from "./admin/AdminInnerPages/EditHome/EditHome.jsx";
import HomeSection1 from "./admin/AdminInnerPages/EditHome/HomeSection1.jsx";
import HomeSection2 from "./admin/AdminInnerPages/EditHome/HomeSection2.jsx";
import HomeSection3 from "./admin/AdminInnerPages/EditHome/HomeSection3.jsx";
import AboutBanner from "./admin/AdminInnerPages/EditAboutUs/AboutBanner.jsx";
import AboutSection1 from "./admin/AdminInnerPages/EditAboutUs/AboutSection1.jsx";
import AboutSection2 from "./admin/AdminInnerPages/EditAboutUs/AboutSection2.jsx";
import NriBanner from "./admin/AdminInnerPages/EditNriCorner/NriBanner.jsx";
import ContactDetails from "./admin/AdminInnerPages/EditNriCorner/ContactDetails.jsx";
import EditContactUs from "./admin/AdminInnerPages/EditContactUs/EditContactUs.jsx";
import EditFooter from "./admin/AdminInnerPages/EditFooter/EditFooter.jsx";


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
const ProjectSlider = lazy(() =>
  import("./admin/AdminInnerPages/UpcomingProjects/ProjectSlider.jsx")
);
const SliderContent = lazy(() =>
  import("./admin/AdminInnerPages/UpcomingProjects/SliderContent.jsx")
);
const Projects = lazy(() => import("./pages/upcommingProject/Projects.jsx"));
const Home = lazy(() => import("./pages/Home/Home.jsx"));
const About = lazy(() => import("./pages/About/About.jsx"));
const NriCorner = lazy(() => import("./pages/NRI/NriCorner.jsx"));
const Gallery = lazy(() => import("./pages/Gallery/Gallery.jsx"));
const Contact = lazy(() => import("./pages/Contact/Contact.jsx"));
const CharCounter = lazy(() => import("./pages/CharCounter/Counter.jsx"));
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
            <Route
              key="edithome"
              path="edithome"
              element={<EditHome />}
            />
            <Route
              key="homesection1"
              path="homesection1"
              element={<HomeSection1 />}
            />
            <Route
              key="homesection2"
              path="homesection2"
              element={<HomeSection2 />}
            />
       
            <Route
              key="homesection3"
              path="homesection3"
              element={<HomeSection3 />}
            />
       
            <Route
              key="aboutbanner"
              path="aboutbanner"
              element={<AboutBanner />}
            />
            <Route
              key="aboutsection1"
              path="aboutsection1"
              element={<AboutSection1 />}
            />
            <Route
              key="aboutsection2"
              path="aboutsection2"
              element={<AboutSection2 />}
            />
            <Route
              key="nribanner"
              path="nribanner"
              element={<NriBanner />}
            />
            <Route
              key="contactdetails"
              path="contactdetails"
              element={<ContactDetails />}
            />
       
            <Route
              key="editcontactus"
              path="editcontactus"
              element={<EditContactUs />}
            />
       
            <Route
              key="editfooter"
              path="editfooter"
              element={<EditFooter />}
            />
       
          </Route>

          <Route key="Projects" path="/projects" element={<Projects />} />
          <Route key="Home" path="/" element={<Home />} />
          <Route key="About" path="/about" element={<About />} />
          <Route key="NriCorner" path="/nri-corner" element={<NriCorner />} />
          <Route key="Gallery" path="/gallery" element={<Gallery />} />
          <Route key="Contact" path="/contact-us" element={<Contact />} />
          <Route key="test" path="/test" element={< Test/>} />
          <Route key="counter" path="/counter" element={<CharCounter />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
