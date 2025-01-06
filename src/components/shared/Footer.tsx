import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";
import { Link } from "react-router-dom";
// import FooterLogo from "../../assets/g2i-logo.svg";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import { IconButton } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        padding: "40px 20px",
        boxShadow: "-25px -25px 60px rgba(255, 255, 255, 0.1) inset",

        backgroundColor: "black",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={6} md={3}>
          <Typography
            variant="h5"
            sx={{ marginBottom: "20px", fontWeight: "bold" }}
          >
            Explore
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <Link
              className="hover-text"
              to="/"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              Home
            </Link>
            <Link
              className="hover-text"
              to="/contact-us"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              Contact Us
            </Link>
            <Link
              className="hover-text"
              to="/about-us"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              About Us
            </Link>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography
            variant="h5"
            sx={{ marginBottom: "20px", fontWeight: "bold" }}
          >
            Courses
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <Link
              className="hover-text"
              to="/categories?filters=/Songs"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              Songs
            </Link>
            <Link
              className="hover-text"
              to="/categories?filters=/Film"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              Film
            </Link>
            <Link
              className="hover-text"
              to="/categories?filters=/Documentary"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              Documentary
            </Link>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography
            variant="h5"
            sx={{ marginBottom: "20px", fontWeight: "bold" }}
          >
            Company
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <Link
              className="hover-text"
              to="/career"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              Careers
            </Link>
            <Link
              className="hover-text"
              to="/news&blogs"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              Blog
            </Link>
            <Link
              className="hover-text"
              to="/shop"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              Store
            </Link>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography
            variant="h5"
            sx={{ marginBottom: "20px", fontWeight: "bold" }}
          >
            Follow Us
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            <IconButton
              className="hover-text"
              color="inherit"
              component="a"
              href="https://facebook.com"
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              className="hover-text"
              color="inherit"
              component="a"
              href="https://twitter.com"
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              className="hover-text"
              color="inherit"
              component="a"
              href="https://linkedin.com"
            >
              <LinkedInIcon />
            </IconButton>
            <IconButton
              className="hover-text"
              color="inherit"
              component="a"
              href="https://www.instagram.com/livabhiproductions/profilecard/?igsh=ZmRmZTRjZWhkdWZ0"
            >
              <InstagramIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "50px",
          marginTop: "20px",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box>
          <img src="/assets/logo.png" alt="Logo" style={{ width: "100px" }} />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
            marginTop: { xs: "20px", md: "0" },
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Typography
            className="hover-text"
            sx={{ marginBottom: { xs: "10px", md: "0" } }}
          >
            <Link
              to="/privacy-policy"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Privacy Policy
            </Link>
          </Typography>
          <Typography
            className="hover-text"
            sx={{ marginBottom: { xs: "10px", md: "0" } }}
          >
            <Link
              to="/terms-conditions"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Terms & Conditions
            </Link>
          </Typography>
          {/* <Typography>
            <Link
              to="/copyright-notification"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              Copyright Notification
            </Link>
          </Typography> */}
        </Box>
      </Box>

      <Typography
        variant="body2"
        sx={{ marginTop: "20px", fontSize: "0.875rem" }}
      >
        &copy;{new Date().getFullYear()} Liv Abhi Productions. All rights
        reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
