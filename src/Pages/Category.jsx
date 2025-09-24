import "../Styles/landing.scss";
import React, { useState } from "react";
import Header from "../components/Utils/header";
import { useEffect } from "react";

import Footer from "../components/Utils/Footer";
import MapCategory from "../components/maps/MapCategory";

export default function Category(props) {
  const [data, setData] = useState(null);
  const instanceId = window.location.pathname
    .split("/")[2]
    .replaceAll("%20", " ");

  useEffect(() => {
    fetch(`/api/data/category/${instanceId}/0`, {
      method: "get",
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) return res.json();
        else throw Error("");
      })
      .then((data) => {
        setData(data);
      })
      .catch((e) => {});
  }, []);

  return (
    <div className="InstancesPage">
      <Header
        isAuthenticated={props.isAuthenticated}
        setIsAuthenticated={props.setIsAuthenticated}
        currentUser={props.currentUser}
        setCurrentUser={props.setCurrentUser}
      />

      <div className="catdata">
        <MapCategory category={instanceId} />
      </div>
      <Footer />
    </div>
  );
}
