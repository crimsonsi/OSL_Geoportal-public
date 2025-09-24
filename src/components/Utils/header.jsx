import React, { useEffect, useState, useRef } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Container,
  IconButton,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Divider,
  Box,
  Avatar,
  Chip,
} from "@mui/material";
import { Menu as MenuIcon, Person, AccountCircle } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import logo2 from "../../assets/imgs/Logo-accent.png";
import { useLocation } from "react-router-dom";
import Login from "./loginPopUp";
import RegisterPopUp from "./registerPopUp";
import UserAccount from "./userAccount";
import EditUserDetails from "./editUserDetails";
import ChangePassword from "./ChangePassword";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  borderRadius: 0,
  position: "sticky",
  top: 0,
  transition: theme.transitions.create(["background-color", "padding"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(0, 2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(0, 3),
  },
}));

const LogoSection = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  "&:hover": {
    opacity: 0.8,
  },
}));

const Logo = styled("img")(({ theme }) => ({
  height: "32px",
  marginRight: theme.spacing(1),
  [theme.breakpoints.up("sm")]: {
    height: "36px",
  },
}));

const BrandText = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "1.5rem",
  [theme.breakpoints.up("sm")]: {
    fontSize: "1.75rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2rem",
  },
}));

const NavSection = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: theme.spacing(1),
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: "inherit",
  textTransform: "none",
  fontWeight: 500,
  padding: theme.spacing(1, 2),
  borderRadius: theme.spacing(1),
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
}));

const AuthSection = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));

const LoginButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontWeight: 600,
  borderRadius: theme.spacing(3),
  padding: theme.spacing(1, 3),
  border: `2px solid ${theme.palette.common.white}`,
  color: theme.palette.common.white,
  "&:hover": {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.primary.main,
  },
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const RegisterButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontWeight: 600,
  borderRadius: theme.spacing(3),
  padding: theme.spacing(1, 3),
  backgroundColor: theme.palette.common.white,
  color: theme.palette.primary.main,
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const UserButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontWeight: 500,
  borderRadius: theme.spacing(3),
  padding: theme.spacing(0.5, 2),
  color: theme.palette.common.white,
  border: `1px solid rgba(255, 255, 255, 0.3)`,
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const MobileMenuButton = styled(IconButton)(({ theme }) => ({
  color: "inherit",
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));

const DrawerHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  minHeight: 64,
}));

const DrawerTitle = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  fontWeight: 600,
}));

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  padding: theme.spacing(1.5, 2),
  margin: theme.spacing(0.5, 1),
  borderRadius: theme.spacing(1),
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  "& .MuiListItemText-primary": {
    fontWeight: 500,
  },
}));

const LogoutListItem = styled(ListItemButton)(({ theme }) => ({
  padding: theme.spacing(1.5, 2),
  margin: theme.spacing(0.5, 1),
  borderRadius: theme.spacing(1),
  "&:hover": {
    backgroundColor: theme.palette.error.light,
    "& .MuiListItemText-primary": {
      color: theme.palette.common.white,
    },
  },
}));

const MobileAuthButtons = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
}));

const MobileLoginButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontWeight: 600,
  borderRadius: theme.spacing(3),
  padding: theme.spacing(1.5),
  border: `2px solid ${theme.palette.primary.main}`,
  color: theme.palette.primary.main,
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
}));

const MobileRegisterButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontWeight: 600,
  borderRadius: theme.spacing(3),
  padding: theme.spacing(1.5),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

function NavLink(props) {
  const location = useLocation();

  return (
    <NavButton
      onClick={() => {
        window.location.href = props.url;
      }}
      sx={{
        textDecoration: props.url === location.pathname ? "underline" : "none",
        textDecorationThickness: 2,
        textUnderlineOffset: 4,
      }}
    >
      {props.txt}
    </NavButton>
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
  const [toggleLogin, setToggleLogin] = useState(false);
  const [toggleRegister, setToggleRegister] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [toggleAccount, setToggleAccount] = useState(false);
  const [toggleEditDetails, setToggleEditDetails] = useState(false);
  const [toggleChangePass, setToggleChangePass] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef(null);

  // iOS detection for better swipe experience
  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

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
    <Box sx={{ width: 280 }}>
      <DrawerHeader>
        <Logo
          src={logo2}
          alt="Oakar Services Logo"
          onClick={() => {
            window.location.href = "/";
            setMobileOpen(false);
          }}
          style={{ cursor: "pointer" }}
        />
        <DrawerTitle variant="h6">Geoportal</DrawerTitle>
      </DrawerHeader>

      <List sx={{ px: 0 }}>
        <StyledListItemButton
          onClick={() => {
            window.location.href = "/";
            setMobileOpen(false);
          }}
        >
          <StyledListItemText primary="Home" />
        </StyledListItemButton>
        <StyledListItemButton
          onClick={() => {
            window.location.href = "/data";
            setMobileOpen(false);
          }}
        >
          <StyledListItemText primary="Browse Data" />
        </StyledListItemButton>
        <StyledListItemButton
          onClick={() => {
            window.location.href = "/publications";
            setMobileOpen(false);
          }}
        >
          <StyledListItemText primary="Knowledge Hub" />
        </StyledListItemButton>
        <StyledListItemButton
          onClick={() => {
            window.location.href = "/docs";
            setMobileOpen(false);
          }}
        >
          <StyledListItemText primary="API Documentation" />
        </StyledListItemButton>
        <StyledListItemButton
          onClick={() => {
            window.location.href = "/about";
            setMobileOpen(false);
          }}
        >
          <StyledListItemText primary="About" />
        </StyledListItemButton>
        <StyledListItemButton
          onClick={() => {
            window.location.href = "/contact";
            setMobileOpen(false);
          }}
        >
          <StyledListItemText primary="Contact Us" />
        </StyledListItemButton>
      </List>

      {props.isAuthenticated ? (
        <>
          <Divider sx={{ my: 1 }} />
          <List sx={{ px: 0 }}>
            <StyledListItemButton
              onClick={() => {
                setToggleAccount(true);
                setMobileOpen(false);
              }}
            >
              <StyledListItemText primary="Account" />
            </StyledListItemButton>
            <StyledListItemButton
              onClick={() => {
                setToggleEditDetails(true);
                setMobileOpen(false);
              }}
            >
              <StyledListItemText primary="Edit Details" />
            </StyledListItemButton>
            <StyledListItemButton
              onClick={() => {
                setToggleChangePass(true);
                setMobileOpen(false);
              }}
            >
              <StyledListItemText primary="Change Password" />
            </StyledListItemButton>
            <Divider sx={{ my: 1 }} />
            <LogoutListItem
              onClick={() => {
                logout();
                setMobileOpen(false);
              }}
            >
              <StyledListItemText
                primary="Logout"
                sx={{
                  "& .MuiListItemText-primary": {
                    color: "error.main",
                    fontWeight: 600,
                  },
                }}
              />
            </LogoutListItem>
          </List>
        </>
      ) : (
        <MobileAuthButtons>
          <MobileLoginButton
            fullWidth
            onClick={() => {
              changeToggle("login");
              setMobileOpen(false);
            }}
          >
            Login
          </MobileLoginButton>
          <MobileRegisterButton
            fullWidth
            onClick={() => {
              changeToggle("register");
              setMobileOpen(false);
            }}
          >
            Register
          </MobileRegisterButton>
        </MobileAuthButtons>
      )}
    </Box>
  );

  return (
    <Box>
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

      <StyledAppBar ref={headerRef}>
        <Container maxWidth="xl">
          <StyledToolbar>
            <LogoSection
              onClick={() => {
                window.location.href = "/";
              }}
            >
              <Logo src={logo2} alt="Oakar Services Logo" />
              <BrandText variant="h4" component="div">
                Geoportal
              </BrandText>
            </LogoSection>

            <NavSection>
              <NavLink txt="Home" url="/" active={props.parent} />
              <NavLink txt="Browse Data" url="/data" active={props.parent} />
              <NavLink
                txt="Knowledge Hub"
                url="/publications"
                active={props.parent}
              />
              <NavLink txt="Docs" url="/docs" active={props.parent} />
              <NavLink txt="About" url="/about" active={props.parent} />
              <NavLink txt="Contact Us" url="/contact" active={props.parent} />
            </NavSection>

            <AuthSection>
              {props.isAuthenticated ? (
                <UserButton
                  startIcon={<AccountCircle />}
                  onClick={handleMenuClick}
                  aria-controls="user-menu"
                  aria-haspopup="true"
                >
                  {props.currentUser && props.currentUser.Name}
                </UserButton>
              ) : (
                <>
                  <LoginButton onClick={() => changeToggle("login")}>
                    Login
                  </LoginButton>
                  <RegisterButton onClick={() => changeToggle("register")}>
                    Register
                  </RegisterButton>
                </>
              )}

              <MobileMenuButton
                edge="end"
                aria-label="menu"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </MobileMenuButton>
            </AuthSection>
          </StyledToolbar>
        </Container>
      </StyledAppBar>

      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 180,
            borderRadius: 2,
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          },
        }}
      >
        <MenuItem
          onClick={() => {
            setToggleAccount(true);
            handleMenuClose();
          }}
          sx={{ py: 1.5 }}
        >
          Account
        </MenuItem>
        <MenuItem
          onClick={() => {
            setToggleEditDetails(true);
            handleMenuClose();
          }}
          sx={{ py: 1.5 }}
        >
          Edit Details
        </MenuItem>
        <MenuItem
          onClick={() => {
            setToggleChangePass(true);
            handleMenuClose();
          }}
          sx={{ py: 1.5 }}
        >
          Change Password
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            logout();
            handleMenuClose();
          }}
          sx={{
            py: 1.5,
            color: "error.main",
            "&:hover": {
              backgroundColor: "error.light",
              color: "common.white",
            },
          }}
        >
          Logout
        </MenuItem>
      </Menu>

      <SwipeableDrawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        onOpen={handleDrawerToggle}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        ModalProps={{
          keepMounted: true,
        }}
        PaperProps={{
          sx: {
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          },
        }}
      >
        {drawer}
      </SwipeableDrawer>
    </Box>
  );
}
