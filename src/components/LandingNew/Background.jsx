import { useEffect, useState } from "react";
import bg0 from "../../assets/imgs/bg0.jpg";
import bg1 from "../../assets/imgs/bg1.jpg";
import bg2 from "../../assets/imgs/bg2.jpg";
import bg3 from "../../assets/imgs/bg3.jpg";
import bg4 from "../../assets/imgs/bg4.jpg";
import bg5 from "../../assets/imgs/bg5.jpg";
import bg6 from "../../assets/imgs/bg6.jpg";
import "../Landing/Cards.scss";
import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/swiper.min.css";
// import "swiper/modules/pagination/pagination.scss"; // Pagination module
// import "swiper/css";
// import "swiper/css/pagination";
import SwiperCore, { Autoplay, Pagination } from "swiper";
import Header from "../Utils/header";
import Cards from "../Landing/Cards";
import CoolText from "./CoolText";
SwiperCore.use([Autoplay, Pagination]);

export default function Background(params) {
  const [index, setIndex] = useState(0);
  const [cls, setCls] = useState("");
  const imgs = [bg0, bg1, bg2, bg3, bg4, bg5, bg6];
  const content = [
    {
      title: "Agriculture",
      desc: "provides the best Software solutions that you require to boost your business.",
    },
    {
      title: "Climate and Weather",
      desc: "features swiftly made, easily edited, beautifully deployed apps",
    },
    {
      title: "Natural Resources",
      desc: "provides for a simple, magical way to connect with people",
    },
    {
      title: "Spatial Planning",
      desc: "make apps that feel good to use and bring joy to those you’re offering them to",
    },
    {
      title: "Disaster",
      desc: "make apps that feel good to use and bring joy to those you’re offering them to",
    },
    {
      title: "General Data",
      desc: "make apps that feel good to use and bring joy to those you’re offering them to",
    },
  ];
  useEffect(() => {
    setInterval(() => {
      setCls("fadeOut");
    }, 10000);
  }, []);

  useEffect(() => {
    if (cls !== "") {
      if (index + 1 === imgs.length) {
        setTimeout(() => {
          setIndex(0);
          setCls("");
        }, 1000);
      } else {
        setTimeout(() => {
          setIndex(index + 1);
          setCls("");
        }, 1000);
      }
    }
  }, [cls]);

  return (
    <div style={{ backgroundImage: imgs[index + 1] }} className="bg">
      <img className={cls} src={imgs[index]} alt="" />
      <div className="nhero">
        <Swiper
          autoplay={{
            delay: 10000,
            disableOnInteraction: false,
          }}
          loop={true}
          grabCursor={true}
          pagination={true}
          modules={[Pagination]}
          className="mySwiper"
        >
          {content.map((item, i) => {
            return (
              <SwiperSlide key={i}>
                <MySlider item={item} />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className="themes">
          {content.map((item, index) => {
            return (
              <p
                onClick={() => {
                  window.location.href = "/categories/" + item.title;
                }}
              >
                {item.title}
              </p>
            );
          })}
        </div>

        <div className="coffee-medium__smoke coffee-medium__smoke-one"></div>
        <div className="coffee-medium__smoke coffee-medium__smoke-two"></div>
        <div className="coffee-medium__smoke coffee-medium__smoke-three"></div>
        <div className="coffee-medium__smoke coffee-medium__smoke-for"></div>
        <div className="coffee-medium__cup"></div>
      </div>
    </div>
  );
}

const MySlider = (props) => {
  const images = [bg0, bg1, bg2, bg3, bg4, bg5];

  return (
    <div className="s_hero">
      <div data-aos="fade-up" className="left">
        <h1>{props.item.title}</h1>
        <div>
          <h4>
            Explore the Geoportal <br></br> Data Hub
          </h4>
        </div>

        <button
          onClick={() => {
            window.location.href = "/categories/" + props.item.title;
          }}
        >
          Explore Data
        </button>
      </div>
      <CoolText />
    </div>
  );
};
