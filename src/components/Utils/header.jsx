import React, { useEffect, useState, useRef } from "react";
import {
  AppBar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/system";
import logo2 from "../../assets/imgs/Logo-accent.png";
import { useLocation } from "react-router-dom";
import Login from "./loginPopUp";
import RegisterPopUp from "./registerPopUp";
import UserAccount from "./userAccount";
import EditUserDetails from "./editUserDetails";
import ChangePassword from "./ChangePassword";

const HeaderContainer = styled(Container)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const Logo = styled("img")({
  cursor: "pointer",
  maxHeight: "44px",
});

const NavButtons = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const MobileMenuButton = styled(IconButton)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));

const DrawerList = styled(List)({
  width: 250,
});

function NavLink(props) {
  const location = useLocation();

  return (
    <Button
      color="inherit"
      onClick={() => {
        window.location.href = props.url;
      }}
      style={{
        textDecoration: props.url === location.pathname ? "underline" : "none",
      }}
    >
      {props.txt}
    </Button>
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
  const [showSettings, setShowSettings] = useState(false);
  const [toggleAccount, setToggleAccount] = useState(false);
  const [toggleEditDetails, setToggleEditDetails] = useState(false);
  const [toggleChangePass, setToggleChangePass] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
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
      if (window.scrollY > 500) {
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
      .then((res) => res.json())
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

  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <DrawerList>
      <ListItem button onClick={() => (window.location.href = "/")}>
        <ListItemText sx={{ textTransform: "capitalize" }} primary="Home" />
      </ListItem>
      <ListItem button onClick={() => (window.location.href = "/data")}>
        <ListItemText
          sx={{ textTransform: "capitalize" }}
          primary="Browse Data"
        />
      </ListItem>
      <ListItem button onClick={() => (window.location.href = "/publications")}>
        <ListItemText
          sx={{ textTransform: "capitalize" }}
          primary="Knowledge Hub"
        />
      </ListItem>
      <ListItem button onClick={() => (window.location.href = "/about")}>
        <ListItemText sx={{ textTransform: "capitalize" }} primary="About" />
      </ListItem>
      <ListItem button onClick={() => (window.location.href = "/contact")}>
        <ListItemText
          sx={{ textTransform: "capitalize" }}
          primary="Contact Us"
        />
      </ListItem>
      {props.isAuthenticated ? (
        <>
          <ListItem button onClick={() => setToggleAccount(true)}>
            <ListItemText
              sx={{ textTransform: "capitalize" }}
              primary="Account"
            />
          </ListItem>
          <ListItem button onClick={() => setToggleEditDetails(true)}>
            <ListItemText
              sx={{ textTransform: "capitalize" }}
              primary="Edit Details"
            />
          </ListItem>
          <ListItem button onClick={() => setToggleChangePass(true)}>
            <ListItemText
              sx={{ textTransform: "capitalize" }}
              primary="Change Password"
            />
          </ListItem>
          <ListItem button onClick={logout}>
            <ListItemText
              sx={{ textTransform: "capitalize" }}
              primary="Logout"
            />
          </ListItem>
        </>
      ) : (
        <ListItem button onClick={() => changeToggle("login")}>
          <ListItemText sx={{ textTransform: "capitalize" }} primary="Login" />
        </ListItem>
      )}
    </DrawerList>
  );

  return (
    <div>
      {toggleLogin && (
        <Login
          open={toggleLogin}
          setToggleLogin={setToggleLogin}
          setToggleRegister={setToggleRegister}
          setIsAuthenticated={props.setIsAuthenticated}
        />
      )}
      {toggleRegister && (
        <RegisterPopUp
          open={toggleRegister}
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
          open={toggleEditDetails}
          setToggleEditDetails={setToggleEditDetails}
          setToggleChangePass={setToggleChangePass}
          setIsAuthenticated={props.setIsAuthenticated}
          isAuthenticated={props.isAuthenticated}
          currentUser={props.currentUser}
        />
      )}
      {toggleChangePass && (
        <ChangePassword
          open={toggleChangePass}
          setToggleChangePass={setToggleChangePass}
          setIsAuthenticated={props.setIsAuthenticated}
          isAuthenticated={props.isAuthenticated}
          currentUser={props.currentUser}
        />
      )}

      <AppBar sx={{ zIndex: 9999 }} position="static" ref={headerRef}>
        <HeaderContainer sx={{ p: 2 }}>
          <img
            src={logo2}
            height={"24px"}
            alt="Oakar Services Logo"
            onClick={() => {
              window.location.href = "/";
            }}
          />
          <Typography
            variant="h4"
            style={{ flexGrow: 1, paddingLeft: 2, cursor: "pointer" }}
            onClick={() => {
              window.location.href = "/";
            }}
          >
            Geoportal
          </Typography>
          <NavButtons>
            <NavLink txt="Home" url="/" active={props.parent} />
            <NavLink txt="Browse Data" url="/data" active={props.parent} />
            <NavLink
              txt="Knowledge Hub"
              url="/publications"
              active={props.parent}
            />
            <NavLink txt="About" url="/about" active={props.parent} />
            <NavLink txt="Contact Us" url="/contact" active={props.parent} />
            {props.isAuthenticated ? (
              <div>
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={handleMenuClick}
                >
                  {props.currentUser && props.currentUser.Name}
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem
                    onClick={() => {
                      setToggleAccount(true);
                      handleMenuClose();
                    }}
                  >
                    Account
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setToggleEditDetails(true);
                      handleMenuClose();
                    }}
                  >
                    Edit Details
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setToggleChangePass(true);
                      handleMenuClose();
                    }}
                  >
                    Change Password
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      logout();
                      handleMenuClose();
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <Button variant="primary" onClick={() => changeToggle("login")}>
                Login
              </Button>
            )}
          </NavButtons>
          <MobileMenuButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
          >
            <Menu />
          </MobileMenuButton>
        </HeaderContainer>
      </AppBar>
      <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
        {drawer}
      </Drawer>
    </div>
  );
}
