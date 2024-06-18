import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home/Home";
// import About from "./pages/About/About";
// import Contact from "./pages/Contact/Contact.jsx";
import AdminPanel from "./Admin/AdminPanel/AdminPanel.jsx";
import UpcomingProjects from "./Admin/AdminInnerPages/UpcomingProjects/UpcomingProjects.jsx";

import PageHeading from "./Admin/AdminInnerPages/UpcomingProjects/PageHeading.jsx";
import BannerImages from "./Admin/AdminInnerPages/UpcomingProjects/BannerImages.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          key="adminpanel"
          path="adminpanel"
          element={<AdminPanel />}
        >
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
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
