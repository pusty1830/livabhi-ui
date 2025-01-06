import React from "react";
import {
    Box,
    TextField,
    Button,
    MenuItem,
    Typography,
    Select,
    FormControl,
    InputLabel,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { createNewsandBlogs, docsUpload } from "../../../services/services";
import { getUserId } from "../../../services/axiosClient";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Validation schema using Yup
const validationSchema = Yup.object({
    thumbnail: Yup.mixed().required("Thumbnail is required"),
    title: Yup.string().required("Title is required"),
    author: Yup.string().required("Author name is required"),
    type: Yup.string().required("Type is required"),
    newsType: Yup.string().required("News Type is required"),
    description: Yup.string().required("Description is required"),
    // photoUrl: Yup.mixed().when("type", {
    //     is: "photo",
    //     then: Yup.mixed().required("Photo is required"),
    //     otherwise: Yup.mixed(),
    // }),
});

const AddNewsandBlogsPage: React.FC = () => {
    const initialValues = {
        thumbnail: null,
        title: "",
        author: "",
        type: "",
        newsType: "",
        videoUrl: "",
        description: "",
        photoUrl: null, // For photo URL
    };

    const navigate = useNavigate();

    const handleSubmit = (values: typeof initialValues) => {
        // console.log("Form Data:", values);
        // alert("Form Submitted! Check the console for details.");
        const payLoad = {
            ...values,
            userId: getUserId(),
        }
        createNewsandBlogs(payLoad).then((res) => {
            toast(res?.data?.msg);
            navigate('/admin-dashboard')
        }).catch((err) => {
            toast.error(err);
        })
    };

    async function handleFileUpload(
        event: React.ChangeEvent<HTMLInputElement>,
        setFieldValue: (field: string, value: any) => void,
        fieldName: string
    ): Promise<void> {
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
                setFieldValue(fieldName, uploadedUrl); // Update the respective field with the URL
            } else {
                alert("File uploaded, but no URL was returned.");
            }
        } catch (error) {
            console.error(`Error uploading ${fieldName}:`, error);
            alert("An error occurred during file upload. Please try again.");
        }
    }

    return (
        <Box
            sx={{
                backgroundColor: "#fff",
                minHeight: "100vh",
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    padding: "24px",
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: "bold",
                        marginBottom: 3,
                        color: "#333",
                    }}
                >
                    Add News & Blogs
                </Typography>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, errors, touched, handleChange, setFieldValue }) => (
                        <Form>
                            {/* Thumbnail */}
                            <FormControl fullWidth margin="normal">
                                <Typography
                                    variant="subtitle1"
                                    sx={{
                                        mb: 1,
                                        fontWeight: "bold",
                                    }}
                                >
                                    Thumbnail
                                </Typography>
                                <input
                                    id="thumbnail"
                                    name="thumbnail"
                                    type="file"
                                    accept="image/*"
                                    onChange={(event) =>
                                        handleFileUpload(event, setFieldValue, "thumbnail")
                                    }
                                    style={{
                                        marginBottom: "16px",
                                        display: "block",
                                    }}
                                />
                                {touched.thumbnail && errors.thumbnail && (
                                    <Typography variant="caption" color="error">
                                        {errors.thumbnail}
                                    </Typography>
                                )}
                            </FormControl>

                            {/* Date */}
                            <TextField
                                fullWidth
                                margin="normal"
                                name="title"
                                label="Title"
                                type="text" // Regular text input for date
                                placeholder="Title"
                                value={values.title}
                                onChange={handleChange}
                                error={touched.title && Boolean(errors.title)}
                                helperText={touched.title && errors.title}
                            />

                            {/* Author */}
                            <TextField
                                fullWidth
                                margin="normal"
                                name="author"
                                label="Author"
                                value={values.author}
                                onChange={handleChange}
                                error={touched.author && Boolean(errors.author)}
                                helperText={touched.author && errors.author}
                            />

                            {/* Type (Dropdown) */}
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Type</InputLabel>
                                <Select
                                    name="type"
                                    value={values.type}
                                    onChange={handleChange}
                                    error={touched.type && Boolean(errors.type)}
                                >
                                    <MenuItem value="photo">Photo</MenuItem>
                                    <MenuItem value="video">Video</MenuItem>
                                </Select>

                            </FormControl>

                            {/* Photo File Uploader (Conditional Field) */}
                            {values.type === "photo" && (
                                <FormControl fullWidth margin="normal">
                                    <Typography
                                        variant="subtitle1"
                                        sx={{
                                            mb: 1,
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Photo
                                    </Typography>
                                    <input
                                        id="photoUrl"
                                        name="photoUrl"
                                        type="file"
                                        accept="image/*"
                                        onChange={(event) =>
                                            handleFileUpload(event, setFieldValue, "photoUrl")
                                        }
                                        style={{
                                            marginBottom: "16px",
                                            display: "block",
                                        }}
                                    />

                                </FormControl>
                            )}

                            {/* News Type (Dropdown) */}
                            <FormControl fullWidth margin="normal">
                                <InputLabel>News Type</InputLabel>
                                <Select
                                    name="newsType"
                                    value={values.newsType}
                                    onChange={handleChange}
                                    error={touched.newsType && Boolean(errors.newsType)}
                                >
                                    <MenuItem value="Hero Section">Hero Section</MenuItem>
                                    <MenuItem value="Trending News">Trending News</MenuItem>
                                    <MenuItem value="News & Blogs">News & Blogs</MenuItem>
                                    <MenuItem value="Featured Post">Featured Post</MenuItem>
                                    <MenuItem value="Recent Posts">Recent Posts</MenuItem>
                                    <MenuItem value="Trending News Video">Trending News Video</MenuItem>
                                </Select>
                                {touched.newsType && errors.newsType && (
                                    <Typography variant="caption" color="error">
                                        {errors.newsType}
                                    </Typography>
                                )}
                            </FormControl>

                            {/* Video URL (Conditional Field) */}
                            {values.type === "video" && (
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    name="videoUrl"
                                    label="Video URL"
                                    value={values.videoUrl}
                                    onChange={handleChange}

                                />
                            )}

                            {/* Description */}
                            <TextField
                                fullWidth
                                margin="normal"
                                name="description"
                                label="Description"
                                multiline
                                rows={4}
                                value={values.description}
                                onChange={handleChange}
                                error={touched.description && Boolean(errors.description)}
                                helperText={touched.description && errors.description}
                            />

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{
                                    mt: 3,
                                    py: 1.5,
                                    fontWeight: "bold",
                                    fontSize: "16px",
                                }}
                            >
                                Add News/Blog
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Box>
    );
};

export default AddNewsandBlogsPage;
