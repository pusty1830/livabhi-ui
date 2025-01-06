import { Box, Button, TextField, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { inputSx } from "../../components/utils/CommonStyle";
import { createMovies, docsUpload } from "../../services/services";
import { getUserId } from "../../services/axiosClient";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// const inputSx = { marginBottom: "16px", width: "100%" };

const validationSchema = Yup.object({
    poster: Yup.mixed().required("Poster is required"),
    title: Yup.string().required("Title is required"),
    year: Yup.number()
        .typeError("Year must be a number")
        .min(1888, "Enter a valid year")
        .max(new Date().getFullYear(), "Enter a valid year")
        .required("Year is required"),
    duration: Yup.string().required("Duration is required"),
    rating: Yup.number()
        .typeError("Rating must be a number")
        .min(0, "Rating must be at least 0")
        .max(10, "Rating cannot exceed 10")
        .required("Rating is required"),
    age: Yup.string().required("Age is required"),
    overview: Yup.string().required("Overview is required"),
    plot: Yup.string().required("Plot is required"),
    // starring: Yup.array().of(Yup.string().required("Actor name is required")),
    // creators: Yup.array().of(Yup.string().required("Creator name is required")),
    // directors: Yup.array().of(Yup.string().required("Director name is required")),
    // writers: Yup.array().of(Yup.string().required("Writer name is required")),
    // producers: Yup.array().of(Yup.string().required("Producer name is required")),
    // dop: Yup..of(Yup.string().required("DOP name is required")),
    // music: Yup.array().of(Yup.string().required("Music composer is required")),
    // genre: Yup.array().of(Yup.string().required("Genre is required")),
    trailer: Yup.string()
        .url("Enter a valid YouTube link")
        .required("Trailer link is required"),
    images: Yup.string().required("At least one image is required"),

});

const AddMovie = () => {
    const [posterPreview, setPosterPreview] = useState<string | null>(null);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    const initialValues = {
        poster: null,
        title: "",
        year: "",
        duration: "",
        rating: "",
        age: "",
        overview: "",
        plot: "",
        starring: "",
        creators: "",
        directors: "",
        writers: "",
        producers: "",
        dop: "",
        music: "",
        genre: "",
        trailer: "",
        images: "",
    };

    const handleFileUpload = async (
        event: React.ChangeEvent<HTMLInputElement>,
        setFieldValue: (field: string, value: any) => void,
        fieldName: string
    ): Promise<void> => {
        const file = event.target.files?.[0];
        if (!file) {
            alert("Please select a valid file.");
            return;
        }

        const formData = new FormData();
        formData.append("files", file);

        try {
            const res = await docsUpload(formData);
            const uploadedUrl = res?.data?.data?.doc0;
            if (uploadedUrl) {
                console.log(`Uploaded ${fieldName} URL:`, uploadedUrl);
                setFieldValue(fieldName, uploadedUrl);
                if (fieldName === "poster") {
                    setPosterPreview(uploadedUrl);
                } else if (fieldName === "images") {
                    setImagePreviews((prev) => [...prev, uploadedUrl]);
                }
            } else {
                alert("File uploaded, but no URL was returned.");
            }
        } catch (error) {
            console.error(`Error uploading ${fieldName}:`, error);
            alert("An error occurred during file upload. Please try again.");
        }
    };


    const navigate = useNavigate();
    const handleSubmit = (values: {
        poster: null;
        title: string;
        year: string;
        duration: string;
        rating: string;
        age: string;
        overview: string;
        plot: string;
        starring: string;
        creators: string;
        directors: string;
        writers: string;
        producers: string;
        dop: string;
        music: string;
        genre: string;
        trailer: string;
        images: string;
    }) => {
        const payLoad = {
            ...values,
            userId: getUserId()
        }
        createMovies(payLoad).then((res) => {
            toast(res?.data?.msg);
            navigate("/admin-dashboard")
        }).catch((err) => {
            console.log(err)
        })
    };

    const extractYouTubeId = (url: string) => {
        const match = url.match(
            /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
        );
        return match ? match[1] : null;
    };

    return (
        <Box
            sx={{ padding: "1rem", backgroundColor: "#ffffff", minHeight: "100vh" }}
        >
            <Box
                sx={{
                    maxWidth: 600,
                    mx: "auto",
                    mt: 5,
                    p: 3,
                    boxShadow: 3,
                    backgroundColor: "#ffffff",
                }}
            >
                <Typography variant="h4" gutterBottom align="center">
                    Movie Details Form
                </Typography>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        values.trailer = extractYouTubeId(values.trailer) || "";
                        handleSubmit(values);
                    }}
                >
                    {({ errors, touched, setFieldValue }) => (
                        <Form>
                            <Box sx={{ maxWidth: "500px", margin: "auto", display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {/* Poster Upload */}
                                <label>Poster:</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        handleFileUpload(e, setFieldValue, "poster")
                                    }
                                    style={{ display: "block", marginBottom: "16px" }}
                                />
                                {posterPreview && (
                                    <img
                                        src={posterPreview}
                                        alt="Poster Preview"
                                        style={{ width: "100%", marginBottom: "16px" }}
                                    />
                                )}
                                {touched.poster && errors.poster && (
                                    <div style={{ color: "red" }}>{errors.poster}</div>
                                )}

                                {/* Title */}
                                <Field
                                    name="title"
                                    as={TextField}
                                    label="Title"
                                    sx={inputSx}
                                    error={touched.title && Boolean(errors.title)}
                                    helperText={touched.title && errors.title}
                                />

                                {/* Year */}
                                <Field
                                    name="year"
                                    as={TextField}
                                    label="Year"
                                    type="number"
                                    sx={inputSx}
                                    error={touched.year && Boolean(errors.year)}
                                    helperText={touched.year && errors.year}
                                />

                                {/* Duration */}
                                <Field
                                    name="duration"
                                    as={TextField}
                                    label="Duration"
                                    sx={inputSx}
                                    error={touched.duration && Boolean(errors.duration)}
                                    helperText={touched.duration && errors.duration}
                                />

                                {/* Rating */}
                                <Field
                                    name="rating"
                                    as={TextField}
                                    label="Rating"
                                    type="number"
                                    sx={inputSx}
                                    error={touched.rating && Boolean(errors.rating)}
                                    helperText={touched.rating && errors.rating}
                                />

                                {/* Age Restriction */}
                                <Field
                                    name="age"
                                    as={TextField}
                                    label="Age Restriction"
                                    sx={inputSx}
                                    error={touched.age && Boolean(errors.age)}
                                    helperText={touched.age && errors.age}
                                />

                                {/* Overview */}
                                <Field
                                    name="overview"
                                    as={TextField}
                                    label="Overview"
                                    multiline
                                    rows={2}
                                    sx={{
                                        ...inputSx,
                                        "& .MuiInputBase-root": {
                                            resize: "vertical",
                                            minHeight: "40px",
                                            marginTop: "10px",
                                        },
                                        "& textarea": {
                                            resize: "vertical",
                                            minHeight: "40px",
                                        },
                                    }}
                                    error={touched.overview && Boolean(errors.overview)}
                                    helperText={touched.overview && errors.overview}
                                />
                                <Field
                                    name="starring"
                                    as={TextField}
                                    label="Starring"
                                    sx={inputSx}
                                    error={touched.starring && Boolean(errors.starring)}
                                    helperText={touched.starring && errors.starring}
                                />
                                <Field
                                    name="creators"
                                    as={TextField}
                                    label="Creators"
                                    sx={inputSx}
                                    error={touched.creators && Boolean(errors.creators)}
                                    helperText={touched.creators && errors.creators}
                                />

                                {/* Directors */}
                                <Field
                                    name="directors"
                                    as={TextField}
                                    label="Directors"
                                    sx={inputSx}
                                    error={touched.directors && Boolean(errors.directors)}
                                    helperText={touched.directors && errors.directors}
                                />

                                {/* Writers */}
                                <Field
                                    name="writers"
                                    as={TextField}
                                    label="Writers"
                                    sx={inputSx}
                                    error={touched.writers && Boolean(errors.writers)}
                                    helperText={touched.writers && errors.writers}
                                />

                                {/* Producers */}
                                <Field
                                    name="producers"
                                    as={TextField}
                                    label="Producers"
                                    sx={inputSx}
                                    error={touched.producers && Boolean(errors.producers)}
                                    helperText={touched.producers && errors.producers}
                                />

                                {/* DOP */}
                                <Field
                                    name="dop"
                                    as={TextField}
                                    label="DOP"
                                    sx={inputSx}
                                    error={touched.dop && Boolean(errors.dop)}
                                    helperText={touched.dop && errors.dop}
                                />

                                {/* Music */}
                                <Field
                                    name="music"
                                    as={TextField}
                                    label="Music"
                                    sx={inputSx}
                                    error={touched.music && Boolean(errors.music)}
                                    helperText={touched.music && errors.music}
                                />

                                {/* Genre */}
                                <Field
                                    name="genre"
                                    as={TextField}
                                    label="Genre"
                                    sx={inputSx}
                                    error={touched.genre && Boolean(errors.genre)}
                                    helperText={touched.genre && errors.genre}
                                />

                                {/* Plot */}
                                <Field
                                    name="plot"
                                    as={TextField}
                                    label="Plot"
                                    multiline
                                    rows={2}
                                    sx={{
                                        ...inputSx,
                                        "& .MuiInputBase-root": {
                                            resize: "vertical",
                                            minHeight: "40px",
                                            marginTop: "10px",
                                        },
                                        "& textarea": {
                                            resize: "vertical",
                                            minHeight: "40px",
                                        },
                                    }}

                                    error={touched.plot && Boolean(errors.plot)}
                                    helperText={touched.plot && errors.plot}
                                />

                                {/* Trailer */}
                                <Field
                                    name="trailer"
                                    as={TextField}
                                    label="Trailer YouTube Link"
                                    sx={inputSx}
                                    error={touched.trailer && Boolean(errors.trailer)}
                                    helperText={touched.trailer && errors.trailer}
                                />

                                {/* Images Upload */}
                                <label>Images:</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={(e) =>
                                        handleFileUpload(e, setFieldValue, "images")
                                    }
                                    style={{ display: "block", marginBottom: "16px" }}
                                />
                                <Box>
                                    {imagePreviews.map((src, index) => (
                                        <img
                                            key={index}
                                            src={src}
                                            alt={`Preview ${index + 1}`}
                                            style={{ width: "100%", marginBottom: "16px" }}
                                        />
                                    ))}
                                </Box>
                                {touched.images && errors.images && (
                                    <div style={{ color: "red" }}>{errors.images}</div>
                                )}

                                <Button
                                    type="submit"
                                    variant="contained"
                                    id="custom-button"
                                    style={{
                                        borderColor: "black",
                                        borderWidth: "4px",
                                        color: "black",
                                        fontSize: "16px",
                                        padding: "10px 20px",
                                        margin: 0,
                                        marginTop: "20px",
                                        width: "100%",
                                        boxShadow: "none",
                                    }}
                                >
                                    Submit
                                </Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Box>
    );
};

export default AddMovie;