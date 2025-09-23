import React from "react";
import "../../Styles/Cards.scss";

const Item = (props) => {
  return (
    <div className="items">
      <img src={props.item.image} alt="" />
      <h4>{props.item.txt}</h4>
    </div>
  );
};

export default function Cards(props) {
  return (
    <>
    <div>card</div>
      {/* <Swiper
        effect={"cards"}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        grabCursor={true}
        className="cardSwiper"
      >
        {props.data?.map((item, index) => {
          return (
            <SwiperSlide key={index} className="card">
              <Item item={item} />
            </SwiperSlide>
          );
        })}
      </Swiper> */}
    </>
  );
}
