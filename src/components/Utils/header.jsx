import React, { useEffect, useState, useRef } from "react";
import logo2 from "../../assets/imgs/osllogo.png";
import ModalHeader from "./modal_header";
import { useLocation } from "react-router-dom";
import Login from "./loginPopUp";
import RegisterPopUp from "./registerPopUp";
import UserAccount from "./userAccount";
import EditUserDetails from "./editUserDetails";
import ChangePassword from "./ChangePassword";

function NavLink(props) {
  const location = useLocation();

  return (
    <a
      className={props.url === location.pathname ? "underline" : ""}
      onClick={() => {
        window.location.href = props.url;
      }}
    >
      {props.txt}
    </a>
  );
}

export default function Header(props) {
  const [firstRenderDone, setFirstRender] = useState(false);
  useEffect(() => {
    if (firstRenderDone) changeToggle("register");
  }, [props.toggleRegisterfromLanding]);
  useEffect(() => {
    setFirstRender(true);
  });

  const [clicked, setClicked] = useState(false);
  const [toggleLogin, setToggleLogin] = useState(false);
  const [toggleRegister, setToggleRegister] = useState(false);
  // const [isAuthenticated, setIsAuthenticated] = useState(true);
  //const [currentUser, setCurrentUser] = useState();
  const [showSettings, setShowSettings] = useState(false);
  const [toggleAccount, setToggleAccount] = useState(false);
  const [toggleEditDetails, setToggleEditDetails] = useState(false);
  const [toggleChangePass, setToggleChangePass] = useState(false);
  const headerRef = useRef(null);
  const toggleMenu = () => {
    setClicked(!clicked);
  };

  useEffect(() => {
    if (!props.landing) {
      headerRef.current.style.paddingTop = "10px";
      headerRef.current.style.marginTop = "0px";
      headerRef.current.style.paddingBottom = "10px";
      headerRef.current.style.background = "#2254AA";
    }
    window.addEventListener("scroll", changeCss, false);
  }, []);

  function changeCss() {
    if (props.landing) {
      if (this.scrollY > 500) {
        headerRef.current.style.paddingTop = "10px";
        headerRef.current.style.paddingBottom = "10px";
        headerRef.current.style.backgroundColor = "#011B46";
      } else {
        headerRef.current.style.paddingTop = "2em";
        headerRef.current.style.backgroundColor = "transparent";
      }
    } else {
      headerRef.current.style.paddingTop = "10px";
      headerRef.current.style.paddingBottom = "10px";
      headerRef.current.style.backgroundColor = "#011B46";
    }
  }

  const logout = () => {
    fetch("/api/users/logout", {
      method: "get",
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        localStorage.clear();
        props.setIsAuthenticated(false);
        props.setCurrentUser(null);
      })
      .catch((err) => {});
  };

  const changeToggle = (e) => {
    if (e === "login") {
      setToggleRegister(false);
      setToggleLogin(true);
    }
    if (e === "register") {
      setToggleLogin(false);
      setToggleRegister(true);
    }
  };

  return (
    <div>
      {toggleLogin && (
        <Login
          setToggleLogin={setToggleLogin}
          setToggleRegister={setToggleRegister}
          setIsAuthenticated={props.setIsAuthenticated}
        />
      )}
      {toggleRegister && (
        <RegisterPopUp
          setToggleRegister={setToggleRegister}
          setToggleLogin={setToggleLogin}
          setIsAuthenticated={props.setIsAuthenticated}
        />
      )}
      {toggleAccount && (
        <UserAccount
          setToggleAccount={setToggleAccount}
          currentUser={props.currentUser}
        />
      )}
      {toggleEditDetails && (
        <EditUserDetails
          setToggleEditDetails={setToggleEditDetails}
          setToggleChangePass={setToggleChangePass}
          setIsAuthenticated={props.setIsAuthenticated}
          isAuthenticated={props.isAuthenticated}
          currentUser={props.currentUser}
        />
      )}
      {toggleChangePass && (
        <ChangePassword
          setToggleChangePass={setToggleChangePass}
          setIsAuthenticated={props.setIsAuthenticated}
          isAuthenticated={props.isAuthenticated}
          currentUser={props.currentUser}
        />
      )}

      <div className="header" ref={headerRef}>
        <div className="container">
          <div
            onClick={() => {
              window.location.href = "/";
            }}
            className="logo"
          >
            <img src={logo2} className="lg" alt="Oakar Services Logo" />
            <h2>Geoportal</h2>
          </div>

          <div className="nav">
            <NavLink
              className="navlink"
              txt="Home"
              url="/"
              active={props.parent}
            />
            <NavLink txt="Browse Data" url="/data" active={props.parent} />
            <NavLink
              txt="Knowledge Hub"
              url="/publications"
              active={props.parent}
            />
            <NavLink txt="About" url="/about" active={props.parent} />
            <NavLink txt="Contact Us" url="/contact" active={props.parent} />
            <div
              className="nav2"
              onMouseOver={() => setShowSettings(true)}
              onMouseOut={() => setShowSettings(false)}
            >
              {props.isAuthenticated ? (
                <div className="loginOut">
                  <div>
                    {props.currentUser && props.currentUser.Name && (
                      <h5>
                        {props.currentUser.Name}{" "}
                        <span>
                          <i className="fa fa-caret-down"></i>
                        </span>
                      </h5>
                    )}
                  </div>
                  {showSettings ? (
                    <div className="userOptions showSettings">
                      <h5
                        onClick={() => {
                          setToggleAccount(true);
                        }}
                      >
                        Account
                      </h5>
                      <h5
                        onClick={() => {
                          setToggleEditDetails(true);
                        }}
                      >
                        Edit Details
                      </h5>
                      <h5
                        onClick={() => {
                          setToggleChangePass(true);
                        }}
                      >
                        Change Password
                      </h5>
                      <h5
                        onClick={() => {
                          logout();
                        }}
                      >
                        Logout
                      </h5>
                    </div>
                  ) : (
                    <div className="userOptions">
                      <h5
                        onClick={() => {
                          {
                            setToggleAccount(true);
                          }
                        }}
                      >
                        Account
                      </h5>
                      <h5
                        onClick={() => {
                          setToggleEditDetails(true);
                        }}
                      >
                        Edit Details
                      </h5>
                      <h5
                        onClick={() => {
                          setToggleChangePass(true);
                        }}
                      >
                        Change Password
                      </h5>
                      <h5>Logout</h5>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  className="loginOut"
                  onClick={() => changeToggle("login")}
                >
                  Login
                </button>
              )}
            </div>
          </div>
          <i
            onClick={() => {
              toggleMenu();
            }}
            className="fa fa-bars"
          ></i>
        </div>
      </div>
      {clicked && (
        <ModalHeader
          active={props.active}
          logout={logout}
          isAuthenticated={props.isAuthenticated}
          toggleMenu={toggleMenu}
          setToggleLogin={setToggleLogin}
          setToggleRegister={setToggleRegister}
          setIsAuthenticated={props.setIsAuthenticated}
        />
      )}
    </div>
  );
}
