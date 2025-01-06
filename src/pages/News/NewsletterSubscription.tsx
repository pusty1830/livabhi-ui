import { faArrowRight, faBullhorn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, CardMedia, TextField, Typography, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles((theme: { spacing: (arg0: number) => any }) => ({
  container: {
    color: "white",
    borderRadius: "8px",
    padding: theme.spacing(4),
    textAlign: "center",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    alignItems: "center",
  },
  title: {
    marginBottom: theme.spacing(2),
    fontWeight: "bold",
  },
  inputField: {
    marginBottom: theme.spacing(2),
    width: "100%",
    background: "white",
  },
}));

const NewsletterSubscription = () => {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      toast.success("Subscribed successfully!");
      resetForm(); // Clear the form after submission
    },
  });

  return (
    <>
      <ToastContainer position="top-center" />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", md: "row" },
          background: "black",
          gap: "20px",
          justifyContent: "space-around",
          alignItems: "center",
          pb: 6,
        }}
      >
        <Box className={classes.container}>
          <Typography
            sx={{
              fontSize: "34px",
            }}
            className={classes.title}
          >
            Subscribe to Our Newsletter
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "inherit", fontSize: "18px" }}
            style={{
              fontFamily: "Rosttel",
            }}
            gutterBottom
          >
            <FontAwesomeIcon
              style={{ color: "red" }}
              id="custom-button-icon"
              icon={faBullhorn}
            />{" "}
            Stay updated with the latest news and exclusive offers.
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              className={classes.inputField}
              variant="outlined"
              placeholder="Enter your email address"
              type="email"
              fullWidth
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

         

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
             style={{ marginLeft: 0, cursor: "pointer", textTransform:'none', fontSize:'24px',marginTop:'10px' }}
              id="custom-button"
            >
              Subscribe{" "}
              <FontAwesomeIcon
                id="custom-button-icon"
                icon={faArrowRight}
                style={{ marginLeft: "8px" }}
              />
            </Button>
          </form>
        </Box>

        <CardMedia
          component="img"
          height="350px"
          image="/assets/newsletter.png"
          sx={{
            width: "300px",
            objectFit: "contain",
            filter: "drop-shadow(0px 0px 30px rgba(255, 255, 255, 0.377))",
          }}
        />
      </Box>
    </>
  );
};

export default NewsletterSubscription;
