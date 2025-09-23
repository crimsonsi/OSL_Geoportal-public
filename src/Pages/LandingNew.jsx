import "../Styles/landing.scss";
import React, { useState } from "react";
import Header from "../components/Utils/header";
import Background from "../components/LandingNew/Background";

export default function LandingPage(props) {
  const [toggleRegister, setToggleRegister] = useState(false);

  return (
    <div className="landingnew">
      <Header
        isAuthenticated={props.isAuthenticated}
        setIsAuthenticated={props.setIsAuthenticated}
        currentUser={props.currentUser}
        setCurrentUser={props.setCurrentUser}
        toggleRegisterfromLanding={toggleRegister}
        landing={false}
        parent='landing'
      />
      <Background />
    </div>
  );
}
