import React, { useState } from "react";
import Header from "../components/Utils/header";
import ComprehensiveLanding from "../components/LandingNew/ComprehensiveLanding";
import Footer from "../components/Utils/Footer";
import { Box } from "@mui/material";

export default function LandingPage(props) {
  const [toggleRegister, setToggleRegister] = useState(false);

  return (
    <Box>
      <Header
        isAuthenticated={props.isAuthenticated}
        setIsAuthenticated={props.setIsAuthenticated}
        currentUser={props.currentUser}
        setCurrentUser={props.setCurrentUser}
        toggleRegisterfromLanding={toggleRegister}
        landing={false}
        parent='landing'
      />
      <ComprehensiveLanding />
      <Footer />
    </Box>
  );
}
