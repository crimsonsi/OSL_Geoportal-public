import "../Styles/landing.scss";
import React, { useState } from "react";
import Header from "../components/Utils/header";
// Styles must use direct files imports
// import "swiper/swiper.scss"; // core Swiper
// import "swiper/modules/effect-cards/effect-cards.scss"; // Navigation module
// import "swiper/modules/pagination/pagination.scss"; // Pagination module
// import Swiper core and required modules
// import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
import Background from "../components/LandingNew/Background";

// SwiperCore.use([Autoplay, Pagination, Navigation]);

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
