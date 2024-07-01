import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Lazy load the components
const AdminPanel = lazy(() => import("./Admin/AdminPanel/AdminPanel.jsx"));
const UpcomingProjects = lazy(() =>
  import("./Admin/AdminInnerPages/UpcomingProjects/UpcomingProjects.jsx")
);
const PageHeading = lazy(() =>
  import("./Admin/AdminInnerPages/UpcomingProjects/PageHeading.jsx")
);
const BannerImages = lazy(() =>
  import("./Admin/AdminInnerPages/UpcomingProjects/BannerImages.jsx")
);
const ProjectSlider = lazy(() =>
  import("./Admin/AdminInnerPages/UpcomingProjects/ProjectSlider.jsx")
);
const SliderContent = lazy(() =>
  import("./Admin/AdminInnerPages/UpcomingProjects/SliderContent.jsx")
);
const Projects = lazy(() => import("./pages/upcommingProject/Projects.jsx"));
const Home = lazy(() => import("./pages/Home/Home.jsx"));
const About = lazy(() => import("./pages/About/About.jsx"));
const NriCorner = lazy(() => import("./pages/NRI/NriCorner.jsx"));
const Gallery = lazy(() => import("./pages/Gallery/Gallery.jsx"));
const Contact = lazy(() => import("./pages/Contact/Contact.jsx"));
const CharCounter = lazy(() => import("./pages/CharCounter/Counter.jsx"));
const EditHome = lazy(() =>
  import("./Admin/AdminInnerPages/EditHome/EditHome.jsx")
);
const HomeSection1 = lazy(() =>
  import("./Admin/AdminInnerPages/EditHome/HomeSection1.jsx")
);
const HomeSection2 = lazy(() =>
  import("./Admin/AdminInnerPages/EditHome/HomeSection2.jsx")
);
const HomeSection3 = lazy(() =>
  import("./Admin/AdminInnerPages/EditHome/HomeSection3.jsx")
);
const AboutBanner = lazy(() =>
  import("./Admin/AdminInnerPages/EditAboutUs/AboutBanner.jsx")
);
const AboutSection1 = lazy(() =>
  import("./Admin/AdminInnerPages/EditAboutUs/AboutSection1.jsx")
);
const AboutSection2 = lazy(() =>
  import("./Admin/AdminInnerPages/EditAboutUs/AboutSection2.jsx")
);
const NriBanner = lazy(() =>
  import("./Admin/AdminInnerPages/EditNriCorner/NriBanner.jsx")
);
const ContactDetails = lazy(() =>
  import("./Admin/AdminInnerPages/EditNriCorner/ContactDetails.jsx")
);
const EditContactUs = lazy(() =>
  import("./Admin/AdminInnerPages/EditContactUs/EditContactUs.jsx")
);
const EditFooter = lazy(() =>
  import("./Admin/AdminInnerPages/EditFooter/EditFooter.jsx")
);
const FooterData = lazy(() =>
  import("./Admin/AdminInnerPages/EditFooter/FooterData.jsx")
);
const NotFoundPage = lazy(() =>
  import("./pages/PageNotFound/NotFoundPage.jsx")
);
const EditGalleryHeading = lazy(() =>
  import("./Admin/AdminInnerPages/EditGallery/EditGalleryHeading.jsx")
);
const EditGalleryContainer1 = lazy(() =>
  import("./Admin/AdminInnerPages/EditGallery/EditGalleryContainer1.jsx")
);
const EditGalleryContainer2 = lazy(() =>
  import("./Admin/AdminInnerPages/EditGallery/EditGalleryContainer2.jsx")
);
const EditGalleryBanner = lazy(() =>
  import("./Admin/AdminInnerPages/EditGallery/EditGalleryBanner.jsx")
);
const GalleryData = lazy(() =>
  import("./Admin/AdminInnerPages/EditGallery/GalleryData.jsx")
);
const ContactForm = lazy(() =>
  import("./Admin/AdminInnerPages/EditContactUs/ContactForm.jsx")
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
            <Route path="contactform" element={<ContactForm />} />
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
