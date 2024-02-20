import "../Styles/landing.scss";
import React, { Children, useState, useEffect } from "react";
import Header from "../components/Utils/header";
import "leaflet/dist/leaflet.css";
import Footer from "../components/Utils/footer";
// Styles must use direct files imports
import "swiper/swiper.scss"; // core Swiper
import "swiper/modules/effect-cards/effect-cards.scss"; // Navigation module
import "swiper/modules/pagination/pagination.scss"; // Pagination module
// import Swiper core and required modules
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
import { myData, categoriesData } from "../assets/data/landing";
import background from "../assets/imgs/data_portal_background.jpg";
import landingShape from "../assets/imgs/landing_shape.svg";

SwiperCore.use([Autoplay, Pagination, Navigation]);

const Item = (props) => {
  return (
    <div
      className="card"
      onClick={() => {
        window.location.href = `/category/${props.cat}`;
      }}
      style={{ backgroundImage: `url(${props.img})` }}
    >
      <div className="overlay"></div>
      <div className="content">
        <h3>{props.txt}</h3>
        <p>{props.label}</p>
      </div>
    </div>
  );
};

const CategoryItem = (props) => {
  return (
    <div className="mapCategory">
      <div className="left">
        <h3>{props.title}</h3>
        <span>{props.subTitle}</span>
        <img src={props.img} alt="category image" />
      </div>
      <div className="right">
        <p>{props.description}</p>
        <a href={props.link}>View Data</a>
      </div>
    </div>
  );
};

const categories = [];

categoriesData.forEach((element) => {
  categories.push(
    <CategoryItem
      title={element.title}
      subTitle={element.subTitle}
      description={element.description}
      img={element.image}
      link={element.link}
    />
  );
});

export default function LandingPage(props) {
  const [toggleRegister, setToggleRegister] = useState(false);
  const [toggleHeaderTheme, changeHeaderTheme] = useState(false);

  useEffect(() => {
    trackScroll();
  }, []);

  function trackScroll() {
    requestAnimationFrame(trackScroll);
    const target = window.scrollY;
    if (target >= 500) changeHeaderTheme(true);
    else changeHeaderTheme(false);
  }
  return (
    <div className="landing">
      <Header
        isAuthenticated={props.isAuthenticated}
        setIsAuthenticated={props.setIsAuthenticated}
        currentUser={props.currentUser}
        setCurrentUser={props.setCurrentUser}
        toggleRegisterfromLanding={toggleRegister}
        changeHeaderTheme={toggleHeaderTheme}
        parent="landing"
      />

      <section className="section1">
        <div
          className="backgroundAbout"
          style={{ backgroundImage: `url(${background})` }}
        >
          <div className="overlay_gradient"></div>
          <img className="landing_shape" src={landingShape} alt="Shape" />
        </div>
        <div className="heroAbout">
          <h1>Oakar Services</h1>
          <h2>Geoportal</h2>
          {/* registration page or explore */}
          {props.isAuthenticated ? (
            <a href="#explore">Explore</a>
          ) : (
            <a
              onClick={() => {
                setToggleRegister(!toggleRegister);
              }}
            >
              Register
            </a>
          )}
        </div>
      </section>

      <section className="section2">
        <div className="categories">
          <h2 id="explore">Maps and Data</h2>
          <p>
            A platform to share your data and preconfigured map applications
          </p>
          <div className="container">
            <Item
              txt="Thematic Maps"
              label={myData[1].p}
              img={myData[1].imgs[0].image}
              cat="Thematic Map"
            />
            <Item
              txt="Topographic Maps"
              label={myData[2].p}
              img={myData[2].imgs[0].image}
              cat="Topo Map"
            />
            <Item
              txt="Raster Data"
              label={myData[3].p}
              img={myData[3].imgs[0].image}
              cat="Basemap"
            />
            <Item
              txt="Vector Datasets"
              label={myData[4].p}
              img={myData[4].imgs[0].image}
              cat="World Data"
            />
          </div>
        </div>
      </section>
      <section className="section3">{categories}</section>
      <Footer />
    </div>
  );
}
