import Header from "../components/Utils/header";
import Footer from "../components/Utils/footer";
import { React, useEffect, useState } from "react";
import "../Styles/storymaps.scss";

export default function StoryMapPage(props) {
  const [data, setData] = useState();
    const pathname = window.location.pathname.split("/")[3];

let contentClass = "";

    if (data) {
  switch (data.Content) {
    case "h1":
    case "h2":
    case "h4":
    case "h5":
    case "p":
    case "a":
      contentClass = "left";
      break;
    case "img":
      contentClass = "right";
      break;
    default:
      contentClass = "default";
  }
}

    
  useEffect(() => {
    fetch(`/api/storymaps/${pathname}`)
      .then((res) => {
        if (res.ok) return res.json();
        else throw Error("");
      })
      .then((data) => {
        // setLoading(false);
        setData(data);
      })
      .catch((e) => {
        // setLoading(false);
      });
  }, []);

  return (
    <div className="data">
      <Header
        isAuthenticated={props.isAuthenticated}
        setIsAuthenticated={props.setIsAuthenticated}
        currentUser={props.currentUser}
        setCurrentUser={props.setCurrentUser}
        parent="Story Maps"
      />
      <div className="storymaps">
        <div className="innercontent">
          {data && (
            <>
              <h1>{data.Title}</h1>

              <h2 className="theme">Theme: {data.Category}</h2>

              <div className={contentClass}
                dangerouslySetInnerHTML={{ __html: data.Content?.slice(1, -1) }}
              ></div>
            </>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}
