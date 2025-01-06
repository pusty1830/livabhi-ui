import {
  faCircleXmark,
  faEnvelope,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Avatar,
  Badge,
  CssBaseline,
  Drawer,
  IconButton,
  ListItemIcon,
  useMediaQuery,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn, logout } from "../../services/axiosClient";
import { getProfile } from "../../services/services";
import color from "../utils/Colors";
import "./Layout.css";
import HomeIcon from "@mui/icons-material/Home";
import ArticleIcon from "@mui/icons-material/Article";
import SchoolIcon from "@mui/icons-material/School";
import CreateIcon from "@mui/icons-material/Create";
import WorkIcon from "@mui/icons-material/Work";
import ShopIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import { MovieCreation } from "@mui/icons-material";
interface Location {
  display_name: string;
  lat: number;
  lon: number;
}
export const Header: React.FC = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:900px)");
  const [location, setlocation] = useState<Location | any>(null);
  const [cartCount, setCartCount] = useState<number>(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (Array.isArray(cart)) {
      setCartCount(cart.length);
    }

    const handleStorageChange = () => {
      const updatedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(updatedCart.length);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // React.useEffect(() => {
  //   getCurrentLocation().then((loc: any) => {
  //     getPlaceDetails(loc.latitude, loc.longitude).then((place: any) => {
  //       setlocation({
  //         display_name: place?.city,
  //         lat: loc.latitude,
  //         lon: loc.longitude,
  //       });
  //     });
  //   });
  // }, []);

  const [user, setUser] = useState<any>({});

  useEffect(() => {
    const fetchUser = async () => {
      if (isLoggedIn()) {
        try {
          const response = await getProfile();
          setUser(response?.data?.data);
          setUser(response?.data?.data);
        } catch (error) {
          console.error("Error fetching artist data:", error);
        }
      }
    };

    fetchUser();
  }, []);

  const menuItems = [
    {
      label: "Home",
      path: user.role === "Admin" ? "/admin-dashboard" : "/",
      icon: <HomeIcon />
    },
    { label: "Blog", path: "/news&blogs", icon: <ArticleIcon /> },
    { label: "Movies", path: "/movies", icon: <MovieCreation /> },
    { label: "My Course", path: "/my-courses", roles: ["User"], userRole: user.role, icon: <SchoolIcon /> },
    { label: "Create Course", path: "/course-upload", roles: ["Artist"], userRole: user.role, icon: <CreateIcon /> },
    { label: "My Courses", path: "/artist-courses", roles: ["Artist",], userRole: user.role, icon: <SchoolIcon /> },
    { label: "Portfolio", path: "/portfolio", roles: ["Artist"], userRole: user.role, icon: <PeopleIcon /> },
    { label: "Shop", path: "/shop", icon: <ShopIcon /> },
    { label: "Artist", path: "/artists", icon: <PeopleIcon /> },
    { label: "Career", path: "/career", icon: <WorkIcon /> },
    { label: "Add News and Blogs", path: "/addnewsandblogs", roles: ["Admin"], userRole: user.role, icon: <WorkIcon /> },

  ];

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer =
    (open: boolean | ((prevState: boolean) => boolean)) => () => {
      setIsDrawerOpen(open);
    };

  return (
    <>
      <CssBaseline />

      <AppBar
        position="static"
        sx={{
          height: "30px",
          display: { xs: "none", md: "block" },
          background: "transparent",
          "&:hover": {
            bgcolor: "black",
            boxShadow:
              "-15px -15px 40px rgba(255, 255, 255, 0.1) inset,0 0px 30px rgba(0, 0, 0, 0.6)",
          },
        }}
      >
        <Toolbar
          style={{
            minHeight: "30px",
            zIndex: 1100,
            padding: "0px",
            background: "inherit",
            color: "white",
          }}
        >
          <Box
            sx={{
              width: "100%",
              px: 2,
              display: "flex",
              alignItems: "center",
              height: "30px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                width: "50%",
                fontSize: "12px",
              }}
            >
              <Box
                id="flex-center"
                className="header_btn"
                sx={{ mr: 2, px: 0.5 }}
              >
                <a
                  href="tel:+91109238657"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <FontAwesomeIcon
                    style={{ marginTop: "-3px", marginRight: "5px" }}
                    icon={faPhone}
                  />
                  +91109238657
                </a>
              </Box>
              <Box id="flex-center" className="header_btn" sx={{ px: 0.5 }}>
                <a
                  href="mailto:adiabhi@mail.com"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <FontAwesomeIcon
                    style={{ marginTop: "-3px", marginRight: "5px" }}
                    icon={faEnvelope}
                  />
                  adiabhi@mail.com
                </a>
              </Box>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                width: "50%",
                fontSize: "12px",
              }}
            >
              {/* <Box
                id="flex-center"
                className="header_btn"
                sx={{ mr: 2, px: 0.5 }}
              >
                <FontAwesomeIcon
                  style={{ marginTop: "-3px" }}
                  icon={faLocationDot}
                />
                {location ? (
                  <span>{location.display_name}</span>
                ) : (
                  <span> Location</span>
                )}
              </Box> */}
              {isLoggedIn() ? (
                <Box id="flex-center">
                  <Box onClick={() => navigate("/account")}>
                    <Avatar
                      sx={{
                        bgcolor: color.firstColor,
                        fontSize: "14px",
                        width: 24,
                        height: 24,
                      }}
                      src={user?.profileImage}
                      alt={user?.name || "User"}
                    ></Avatar>
                  </Box>

                  <Box className="header_btn" onClick={() => logout()}>
                    <span style={{}}>Logout </span>
                  </Box>
                  <IconButton
                    aria-label="cart"
                    color="inherit"
                    onClick={() => navigate("/cart")}
                    sx={{ ml: 2 }}
                  >
                    <Badge
                      badgeContent={cartCount}
                      color="error"
                      sx={{
                        "& .MuiBadge-badge": {
                          fontSize: "8px", // Adjust the font size
                          minWidth: "12px", // Adjust the minimum width
                          height: "12px", // Adjust the height
                          padding: "0", // Adjust padding if necessary
                        },
                      }}
                    >
                      <ShoppingCartIcon
                        style={{ height: "18px", width: "18px" }}
                      />
                    </Badge>
                  </IconButton>
                </Box>
              ) : (
                <>
                  <Box id="flex-center" sx={{ px: 0.5 }}>
                    <FontAwesomeIcon
                      style={{ marginTop: "-3px" }}
                      icon={faUser}
                    />
                    <span
                      className="header_btn"
                      onClick={() => {
                        navigate("/login");
                      }}
                    >
                      Login{" "}
                    </span>{" "}
                    |
                    <span
                      className="header_btn"
                      onClick={() => {
                        navigate("/signup");
                      }}
                    >
                      Signup{" "}
                    </span>
                  </Box>
                </>
              )}
            </div>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          position: "sticky",
          top: -1,
          zIndex: 1100,
          boxShadow: 0,
        }}
      >
        <Toolbar
          style={{
            padding: "0px",
          }}
        >
          <AppBar
            position="sticky"
            sx={{
              boxShadow: 0,
              bgcolor: "transparent",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "background-color 0.5s ease,box-shadow 0.5s ease",
              "&:hover": {
                bgcolor: "black",
                boxShadow:
                  "-15px -15px 40px rgba(255, 255, 255, 0.1) inset,0 0px 30px rgba(0, 0, 0, 0.6)",
              },
            }}
          >
            <Box sx={{ width: "100%" }}>
              <Toolbar
                variant="regular"
                sx={(theme) => ({
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexShrink: 0,
                  bgcolor:
                    theme.palette.mode === "light"
                      ? "rgba(255, 255, 255, 0.01)"
                      : "rgba(0, 0, 0, 0.4)",
                  backdropFilter: "blur(2px)",
                  maxHeight: "40px",
                  border: "1px solid ",
                  borderColor: "divider",
                  boxShadow: "0 0px 20px rgba(0, 0, 0, 0.2)",
                  p: 1,
                  pl: isSmallScreen ? 2 : 5,
                  pr: isSmallScreen ? 2 : 5,
                })}
              >
                <Box
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: { xs: 2, md: 1 },
                    justifyContent: "space-between",
                    fontSize: "1.8rem",
                    fontWeight: "bolder",
                    color: "white",
                  }}
                >
                  <img
                    onClick={() => {
                      navigate("/");
                    }}
                    src="/assets/logo.png"
                    alt="Logo"
                    // style={{border:'solid 1px red'}}
                    width={isSmallScreen ? "60" : "65"}
                  />

                  <>
                    <Box
                      sx={{
                        display: { xs: "none", md: "flex" },
                        gap: "20px",
                        color: "white",
                        width: "fit-content",
                      }}
                    >
                      {menuItems.map((item, index) =>
                        item.roles?.includes(item.userRole) || !item.roles ? (
                          <MenuItem
                            key={index}
                            className="header_btn"
                            sx={{ py: "5px", px: "6px" }}
                          >
                            <Typography
                              variant="body2"
                              onClick={() => navigate(item.path)}
                            >
                              {item.label}
                            </Typography>
                          </MenuItem>
                        ) : null
                      )}
                    </Box>
                  </>
                </Box>

                <Box
                  sx={{
                    display: { xs: "flex", md: "none" },
                    flexDirection: "row",
                    // width: "200px",
                    alignItems: "center",
                    ml: 2,
                    justifyContent: "center",
                  }}
                >
                  <Button
                    onClick={toggleDrawer(true)}
                    variant="text"
                    aria-label="menu"
                    sx={{
                      minWidth: "30px",
                      ml: 2,
                      color: color.textColor2,
                      p: "4px",
                    }}
                  >
                    Menu <MenuIcon sx={{ ml: 1 }} />
                  </Button>
                </Box>

                <Drawer
                  anchor="right"
                  open={isDrawerOpen}
                  onClose={toggleDrawer(false)}
                >
                  <Box
                    sx={{
                      background: color.secondColor,
                      width: 250,
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      p: 2,
                      height: '100%'
                    }}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        padding: "0px 15px",
                        color: "white",
                      }}
                    >
                      <div>
                        <Avatar
                          onClick={() => navigate("/account")}
                          sx={{
                            bgcolor: color.firstColor,
                            fontSize: "14px",
                            width: 34,
                            height: 34,
                            mb: 1
                          }}
                          src={user?.profileImage}
                          alt={user?.name || "User"}
                        ></Avatar>
                        <Typography>{user?.name || "User"}</Typography>
                        <Typography sx={{ fontSize: '14px', fontFamily: 'custom-regular' }}>{user?.role || "User"}</Typography>
                      </div>

                      <FontAwesomeIcon
                        style={{ marginTop: '13px' }}
                        onClick={toggleDrawer(false)}
                        icon={faCircleXmark}
                      ></FontAwesomeIcon>
                    </div>

                    {menuItems.map((item, index) =>
                      item.roles?.includes(item.userRole) || !item.roles ? (
                        <MenuItem
                          key={index}
                          className="header_btn"
                          onClick={() => navigate(item.path)}
                          sx={{ py: "10px", px: "15px", color: "white" }}
                        >
                          <ListItemIcon sx={{ minWidth: "36px", color: "white" }}>{item.icon}</ListItemIcon>
                          <Typography variant="body1">{item.label}</Typography>
                        </MenuItem>
                      ) : null
                    )}
                  </Box>
                </Drawer>
              </Toolbar>
            </Box>
          </AppBar>
        </Toolbar>
      </Box>
    </>
  );
};

export default Header;
