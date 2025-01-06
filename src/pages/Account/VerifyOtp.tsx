import {
    Box,
    Button,
    Container,
    TextField,
    Typography
} from "@mui/material";
import { useFormik } from "formik";

import { Arrow } from "../../components/shared/Arrow";
import color from "../../components/utils/Colors";

import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContentProps } from "react-toastify";
import { resetPwdSchema } from "../../components/utils/schema";
import { verifyOTP } from "../../services/services";


const VerifyOtp = () => {
    const location = useLocation();
    const email = location?.state;
    const formik = useFormik({
        initialValues: {
            VerifyOtp: "",

        },
        validationSchema: resetPwdSchema,
        onSubmit: (values) => {
            // Handle form submission
            console.log(values);
            const payLoad = {
                email: email,
                otp: values.VerifyOtp
            }
            verifyOTP(payLoad).then((res: { data: { msg: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | ((props: ToastContentProps<unknown>) => ReactNode) | null | undefined; data: { role: string; id: any; firstName: any; lastName: any; }; }; }) => {
                console.log(res)
                toast(res?.data?.msg);
                if (res?.data?.data?.role === 'Artist') {
                    navigate("/portfolio-form", {
                        state: {
                            id: res?.data?.data?.id,
                            firstName: res?.data?.data?.firstName,
                            lastName: res?.data?.data?.lastName
                        }
                    });
                } else if (res?.data?.data?.role === "Business") {
                    navigate("/job-post", { state: res?.data?.data?.id })
                } else {
                    navigate("/login");
                }
            }).catch((err: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | ((props: ToastContentProps<unknown>) => ReactNode) | null | undefined) => {
                toast(err)
            })
        },
    });

    const navigate = useNavigate()




    return (
        <Box
            sx={{
                backgroundImage: "url(/assets/head1.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100%",
                minHeight: "160vh",
                display: "flex",
                mt: { xs: "-54px", md: "-94px" },
                alignItems: "center",
                "&::before": {
                    content: '""',
                    height: "160vh",
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
            <Container
                maxWidth="sm"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 2,
                }}
            >
                <Box
                    sx={{
                        borderRadius: "8px",
                        backgroundImage: `url('/images/ADESO LOGO RGB.png')`,
                        backgroundSize: "100%",
                        boxShadow: "0px 0px 20px rgba(255,255,255,0.5)",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundColor: "white",
                        height: "70px",
                        width: "120px",
                        margin: "20px 0px",
                    }}
                ></Box>
                <Box
                    display="flex"
                    flexDirection="column"
                    sx={{
                        padding: 4,
                        pb: 6,
                        boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
                        borderRadius: "8px",
                        mb: 6,
                        border: "solid 2px ",
                        zIndex: 2,
                        borderColor: color.textColor1,
                        background: 'white'
                    }}
                    alignItems="center"
                    mt={0}
                >
                    <Typography
                        variant="h5"
                        sx={{ fontWeight: "bold", mb: "5%", color: color.textColor1 }}
                        gutterBottom
                    >
                        Verify OTP
                    </Typography>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            id="verifyOtp"
                            name="VerifyOtp"
                            placeholder="Verify OTP"
                            value={formik.values.VerifyOtp}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={!!(formik.touched.VerifyOtp && formik.errors.VerifyOtp)}
                            helperText={formik.touched.VerifyOtp && formik.errors.VerifyOtp}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            style={{
                                margin: "auto",
                                marginTop: "20px",
                                marginBottom: 2,
                                background: color.textColor1,
                                height: "40px",
                                width: "100%",
                                fontWeight: "bold",
                                textTransform: "none",
                                borderRadius: "8px",
                            }}
                        >
                            <Button
                                style={{ textDecoration: "none", color: "inherit" }}

                            >
                                {" "}
                                Submit{" "}
                            </Button>
                            <Arrow></Arrow>
                        </Button>
                    </form>
                </Box>
            </Container>
        </Box>
    );
};

export default VerifyOtp;
