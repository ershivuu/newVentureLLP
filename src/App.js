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
const EditHome = lazy(() =>
  import("./admin/AdminInnerPages/EditHome/EditHome.jsx")
);
const HomeSection1 = lazy(() =>
  import("./admin/AdminInnerPages/EditHome/HomeSection1.jsx")
);
const HomeSection2 = lazy(() =>
  import("./admin/AdminInnerPages/EditHome/HomeSection2.jsx")
);
const HomeSection3 = lazy(() =>
  import("./admin/AdminInnerPages/EditHome/HomeSection3.jsx")
);
const AboutBanner = lazy(() =>
  import("./admin/AdminInnerPages/EditAboutUs/AboutBanner.jsx")
);
const AboutSection1 = lazy(() =>
  import("./admin/AdminInnerPages/EditAboutUs/AboutSection1.jsx")
);
const AboutSection2 = lazy(() =>
  import("./admin/AdminInnerPages/EditAboutUs/AboutSection2.jsx")
);
const NriBanner = lazy(() =>
  import("./admin/AdminInnerPages/EditNriCorner/NriBanner.jsx")
);
const ContactDetails = lazy(() =>
  import("./admin/AdminInnerPages/EditNriCorner/ContactDetails.jsx")
);
const EditContactUs = lazy(() =>
  import("./admin/AdminInnerPages/EditContactUs/EditContactUs.jsx")
);
const EditFooter = lazy(() =>
  import("./admin/AdminInnerPages/EditFooter/EditFooter.jsx")
);
const FooterData = lazy(() =>
  import("./admin/AdminInnerPages/EditFooter/FooterData.jsx")
);
const NotFoundPage = lazy(() =>
  import("./pages/PageNotFound/NotFoundPage.jsx")
);
const EditGalleryHeading = lazy(() =>
  import("./admin/AdminInnerPages/EditGallery/EditGalleryHeading.jsx")
);
const EditGalleryContainer1 = lazy(() =>
  import("./admin/AdminInnerPages/EditGallery/EditGalleryContainer1.jsx")
);
const EditGalleryContainer2 = lazy(() =>
  import("./admin/AdminInnerPages/EditGallery/EditGalleryContainer2.jsx")
);
const EditGalleryBanner = lazy(() =>
  import("./admin/AdminInnerPages/EditGallery/EditGalleryBanner.jsx")
);
const GalleryData = lazy(() =>
  import("./admin/AdminInnerPages/EditGallery/GalleryData.jsx")
);

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/adminpanel" element={<AdminPanel />}>
            <Route path="upcomingprojects" element={<UpcomingProjects />} />
            <Route path="pageheading" element={<PageHeading />} />
            <Route path="bannerimages" element={<BannerImages />} />
            <Route path="projectslider" element={<ProjectSlider />} />
            <Route path="slidercontent" element={<SliderContent />} />
            <Route path="edithome" element={<EditHome />} />
            <Route path="homesection1" element={<HomeSection1 />} />
            <Route path="homesection2" element={<HomeSection2 />} />
            <Route path="homesection3" element={<HomeSection3 />} />
            <Route path="aboutbanner" element={<AboutBanner />} />
            <Route path="aboutsection1" element={<AboutSection1 />} />
            <Route path="aboutsection2" element={<AboutSection2 />} />
            <Route path="nribanner" element={<NriBanner />} />
            <Route path="contactdetails" element={<ContactDetails />} />
            <Route path="editcontactus" element={<EditContactUs />} />
            <Route path="editfooter" element={<EditFooter />} />
            <Route path="footerdata" element={<FooterData />} />
            <Route path="galleryheading" element={<EditGalleryHeading />} />
            <Route
              path="gallerycontainer1"
              element={<EditGalleryContainer1 />}
            />
            <Route
              path="gallerycontainer2"
              element={<EditGalleryContainer2 />}
            />
            <Route path="gallerydata" element={<GalleryData />} />
            <Route path="gallerybanner" element={<EditGalleryBanner />} />
          </Route>
          <Route path="/projects" element={<Projects />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/nri-corner" element={<NriCorner />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/counter" element={<CharCounter />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
