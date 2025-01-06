// LoginPage.js
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useFormik } from "formik";
import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContentProps } from "react-toastify";
import PasswordField from "../../components/form/PasswordField";
import { Arrow } from "../../components/shared/Arrow";
import color from "../../components/utils/Colors";
import { inputSx } from "../../components/utils/CommonStyle";
import { loginSchema } from "../../components/utils/schema";
import { setCurrentAccessToken } from "../../services/axiosClient";
import { login } from "../../services/services";

const LoginPage = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      // Handle form submission
      // console.log(values);
      const payLoad = {
        email: values.email,
        password: values.password
      }
      login(payLoad).then((res: { data: { msg: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | ((props: ToastContentProps<unknown>) => ReactNode) | null | undefined; data: { accessToken: any; role: any; }; }; }) => {
        toast(res?.data?.msg);
        if (res?.data?.data?.accessToken) {
          setCurrentAccessToken(res?.data?.data?.accessToken);
        }
        if (res?.data?.data?.role === "Admin") {
          navigate("/admin-dashboard");
        } else {
          navigate('/')
        }
      }).catch((err: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | ((props: ToastContentProps<unknown>) => ReactNode) | null | undefined) => {
        toast(err)
      })
    },
  });

  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 992);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isMobile1 = useMediaQuery("(max-width:700px)");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        backgroundImage: "url(/assets/head1.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        minHeight: { xs: "90vh", md: "130vh" },
        display: "flex",
        mt: { xs: "-54px", md: "-94px" },
        alignItems: "center",
        "&::before": {
          content: '""',
          height: { xs: "90vh", md: "130vh" },
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6))",
          zIndex: 1,
          backdropFilter: "blur(1px)",
        },
      }}
    >
      <div
        style={{
          zIndex: 2,
          // marginTop: "130px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: isMobile1 ? "column" : "row",
          margin: "auto",
          marginTop: isMobile1 ? "0%" : "10%",
          marginBottom: "5%",
          width: isMobile1 ? "70vw" : isMobile ? "90vw" : "70vw",
          height: isMobile ? "45vh" : "500px",
        }}
      >
        {/* <Box
          sx={{
            borderRadius: "8px 0px 0px 8px",
            color: color.textColor1,
            height: "auto",
            width: "100%",
            marginBottom: "2%",
            display: isMobile1 ? "flex" : "none",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            style={{
              textAlign: "center",
              textShadow: "0px 0px 20px rgba(255,255,255,0.5)",
              fontWeight: "bold",
              marginTop: "0%",
              marginBottom: "0%",
              lineHeight: 1,
              fontSize: "20px",
            }}
          >
            <span style={{ fontWeight: "normal" }}>Hello!</span>
            <br />
            Welcome To
          </Typography>

          <Box
            sx={{
              borderRadius: "8px",
              backgroundImage: `url('/assets/logo.svg')`,
              backgroundSize: "100%",
              boxShadow: "0px 0px 20px rgba(255,255,255,0.5)",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundColor: "white",
              height: "70px",
              width: "120px",
              marginTop: "10px",
            }}
          ></Box>
        </Box> */}

        <Box
          sx={{
            borderRadius: "8px 0px 0px 8px",
            background: color.textColor1,

            backdropFilter: "blur(5px)",
            height: "100%",
            width: "45%",
            display: isMobile1 ? "none" : "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: "solid 0px #0079c1",
          }}
        >
          <Typography
            style={{
              textAlign: "center",
              color: "white",
              textShadow: "0px 0px 20px rgba(255,255,255,0.5)",
              fontWeight: "bold",
              marginTop: "2%",
              marginBottom: "10%",
              lineHeight: 1,
              fontSize: "20px",
            }}
          >
            <span style={{ fontWeight: "normal" }}>Hello!</span>
            <br />
            Welcome To
          </Typography>

          <Box
            sx={{
              borderRadius: "8px",
              backgroundImage: `url('/assets/logo.png')`,
              backgroundSize: "90%",
              boxShadow: "0px 0px 20px rgba(255,255,255,0.5)",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundColor: "white",
              height: "70px",
              width: "120px",
            }}
          ></Box>

          <Typography
            style={{
              textAlign: "justify",
              hyphens: "auto",
              color: "white",
              lineHeight: 1,
              padding: "0px 10%",
              marginTop: "15%",
              marginBottom: "15%",
              fontSize: "12px",
              textShadow: "0px 0px 20px rgba(255,255,255,0.5)",
            }}
          >
            Crafting cinematic journeys that captivate and inspire. Turning
            imagination into breathtaking visuals. Where storytelling meets
            creativity, every step of the way.
          </Typography>

          <Typography
            style={{
              textAlign: "center",
              color: "white",
              lineHeight: 1,
              padding: "0%",
              fontWeight: "bold",
              fontSize: "12px",
              marginBottom: "10px",
            }}
          >
            <Typography
              style={{
                textAlign: "center",
                color: "white",
                fontWeight: "bold",
                marginBottom: "10px",
                fontSize: "12px",
              }}
            >
              Visit
            </Typography>
            <span
              onClick={() => {
                navigate("/blog");
              }}
              style={{
                color: color.textColor1,
                borderRadius: "2px",
                background: "white",
                padding: "2px 10px",
                textDecoration: "none",
                boxShadow: "0px 0px 20px rgba(255,255,255,0.5)",
              }}
            >
              Blog
            </span>{" "}
            &nbsp;|&nbsp;&nbsp;
            <span
              onClick={() => {
                navigate("/shop");
              }}
              style={{
                color: color.textColor1,
                borderRadius: "2px",
                background: "white",
                padding: "2px 10px",
                textDecoration: "none",
                boxShadow: "0px 0px 20px rgba(255,255,255,0.5)",
              }}
            >
              Shop
            </span>{" "}
          </Typography>
        </Box>

        <Box
          sx={{
            pt: "2%",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#ffffff",
            backdropFilter: "blur(5px)",

            width: "100%",
            borderRadius: isMobile1 ? "8px" : "0px 8px 8px 0px",
            height: "100%",
            boxShadow: isMobile1
              ? "0px 0px 10px rgba(0,0,0,0.2)"
              : "-6px 0px 20px rgba(0,0,0,0.2)",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            sx={{
              fontWeight: "bold",
              mb: "6%",
              mt: "8%",
              color: color.textColor1,
            }}
          >
            Sign In
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{
              mt: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "80%",
            }}
          >
            <TextField
              sx={inputSx}
              fullWidth
              // className="input-root"
              id="email"
              name="email"
              placeholder="Email Address"
              margin="normal"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            <PasswordField
              id="password"
              name="password"
              placeholder="Create Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={!!(formik.touched.password && formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              showPassword={showPassword}
              togglePasswordVisibility={togglePasswordVisibility}
              inputSx={inputSx}
            />
            <Typography
              style={{
                textAlign: "right",
                color: color.textColor1,
                fontSize: "14px",
                width: "100%",
              }}
            >
              <a
                style={{ textDecoration: "none", color: "inherit" }}
                href="/forgot-password"
              >
                Forgot Password?
              </a>{" "}
            </Typography>
            <Button
              type="submit"
              variant="contained"
              style={{
                margin: "auto",
                marginTop: "30px",
                background: color.textColor1,
                marginBottom: 2,
                height: "40px",
                padding: "8px 30%",
                fontWeight: "bold",
                textTransform: "none",
                borderRadius: "8px",
                width: "fit-content",
              }}
            >
              Sign In <Arrow></Arrow>
            </Button>

            <Typography
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                textAlign: "center",
                marginTop: "10%",
              }}
            >
              Don't have an account yet?
              <a
                href="/signup"
                style={{
                  color: color.textColor1,
                  boxShadow: "0px 0px 20px rgba(255,255,255,0.5)",
                  borderRadius: "0px",
                  background: "white",
                  padding: "2px 10px",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                Sign Up
              </a>
            </Typography>
          </Box>
        </Box>
      </div>
    </Box>
  );
};

export default LoginPage;
