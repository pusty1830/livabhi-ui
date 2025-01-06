import React, { useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  IconButton,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { ProfileSchema } from "../../../components/utils/schema";
import { docsUpload, insertPortfolioData } from "../../../services/services";
import { toast } from "react-toastify";
import { getUserId } from "../../../services/axiosClient";
import { useLocation } from "react-router-dom";
import { artCategories, artistCategoryTypes } from "../../../components/utils/data";

type PortfolioFormProps = {
  onSubmit: () => void;
  setProfileId: (id: string) => void;
};

const PortfolioForm: React.FC<PortfolioFormProps> = ({
  onSubmit,
  setProfileId,
}) => {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setUploading(true);
      let formData = new FormData();
      formData.append("files", selectedFile);

      try {
        // API call to upload file
        const res = await docsUpload(formData);
        const uploadedUrl = res?.data?.data?.doc0;

        // Update Formik value
        setFieldValue("coverPhoto", uploadedUrl);

        console.log("File uploaded successfully:", uploadedUrl);
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setUploading(false);
      }
    }
  };
  const location = useLocation();
  const userId = location.state.id;
  const firstName = location.state.firstName;
  const lastName = location.state.lastName;

  console.log(firstName);
  console.log(lastName);

  return (
    <Formik
      initialValues={{
        tagline: "",
        about: "",
        coverPhoto: null,
        experienceOverview: "",
        socialLinks: {
          instagram: "",
          x: "",
          facebook: "",
          linkedin: "",
        },
        artistCategory: "",
        experience: [
          { title: "", dateRange: { from: "", to: "" }, description: "" },
        ],
        education: [{ degree: "", instituteName: "", year: "", location: "" }],
      }}
      validationSchema={ProfileSchema}
      onSubmit={(values) => {
        console.log(values);
        const payLoad = {
          userId: userId,
          firstName: firstName,
          lastname: lastName,
          tagline: values.tagline,
          about: values.about,
          coverPhoto: values.coverPhoto,
          experienceOverview: values.experienceOverview,
          portfolioSocialLinks: values.socialLinks,
          artistCategory: values.artistCategory,

          experience: values.experience,

          // Education Fields
          education: values.education,
          // Social Links Fields
          // socialLinks:
        };
        insertPortfolioData(payLoad)
          .then((res: any) => {
            console.log(res);
            const id = res?.data?.data?.id;
            setProfileId(id);

            toast(res?.data?.msg);
            onSubmit();
          })
          .catch((err: any) => {
            toast(err);
          });
      }}
    >
      {({ values, handleChange, setFieldValue }) => (
        <Form>
          {/* <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
          <label>Upload Profile Photo</label>
          <input
            accept="image/*"
            type="file"
            onChange={(e) => {
              const files = e.target.files;
              if (files && files[0]) {
                setFieldValue("profilePhoto", files[0]);
              }
            }}
          />
          </div> */}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginTop: "20px",
            }}
          >
            <label>Upload Cover Photo</label>
            <input
              accept="image/*"
              type="file"
              onChange={(e) => handleFileChange(e, setFieldValue)}
              disabled={uploading}
            />
          </div>

          <Field
            name="tagline"
            as={TextField}
            label="Tagline"
            fullWidth
            margin="normal"
          />
          <Field
            name="about"
            as={TextField}
            label="About"
            multiline
            rows={4}
            fullWidth
            margin="normal"
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Artist Category</InputLabel>
            <Field name="artistCategory" as={Select}>
              {artistCategoryTypes.map((category) => (
                <MenuItem key={category.value} value={category.value}>
                  {category.name}
                </MenuItem>
              ))}
            </Field>
          </FormControl>

          <Field
            name="experienceOverview"
            as={TextField}
            label="About"
            multiline
            rows={4}
            fullWidth
            margin="normal"
          />

          <FieldArray name="experience">
            {({ push, remove }) => (
              <div>
                <h4>Experience</h4>
                {values.experience.map((_, index) => (
                  <div key={index} style={{ marginBottom: "20px" }}>
                    <Field
                      name={`experience[${index}].title`}
                      as={TextField}
                      label="Title"
                      fullWidth
                      margin="normal"
                    />
                    <Field
                      name={`experience[${index}].dateRange.from`}
                      as={TextField}
                      label="From (Year)"
                      type="number"
                      fullWidth
                      margin="normal"
                    />
                    <Field
                      name={`experience[${index}].dateRange.to`}
                      as={TextField}
                      label="To (Year)"
                      type="number"
                      fullWidth
                      margin="normal"
                    />
                    <Field
                      name={`experience[${index}].description`}
                      as={TextField}
                      label="Description"
                      multiline
                      rows={3}
                      fullWidth
                      margin="normal"
                    />
                    <IconButton onClick={() => remove(index)}>
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                  </div>
                ))}
                <Button
                  startIcon={<AddCircleOutlineIcon />}
                  onClick={() =>
                    push({
                      title: "",
                      dateRange: { from: "", to: "" },
                      description: "",
                    })
                  }
                >
                  Add Experience
                </Button>
              </div>
            )}
          </FieldArray>

          <FieldArray name="education">
            {({ push, remove }) => (
              <div>
                <h4>Educational Qualifications</h4>
                {values.education.map((_, index) => (
                  <div key={index} style={{ marginBottom: "20px" }}>
                    <Field
                      name={`education[${index}].degree`}
                      as={TextField}
                      label="Degree"
                      fullWidth
                      margin="normal"
                    />
                    <Field
                      name={`education[${index}].instituteName`}
                      as={TextField}
                      label="Institute Name"
                      fullWidth
                      margin="normal"
                    />
                    <Field
                      name={`education[${index}].year`}
                      as={TextField}
                      label="Year"
                      type="number"
                      fullWidth
                      margin="normal"
                    />
                    <Field
                      name={`education[${index}].location`}
                      as={TextField}
                      label="Location (City, State, Country)"
                      fullWidth
                      margin="normal"
                    />
                    <IconButton onClick={() => remove(index)}>
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                  </div>
                ))}
                <Button
                  startIcon={<AddCircleOutlineIcon />}
                  onClick={() =>
                    push({
                      degree: "",
                      instituteName: "",
                      year: "",
                      location: "",
                    })
                  }
                >
                  Add Education
                </Button>
              </div>
            )}
          </FieldArray>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: "20px" }}
          >
            Save and Next
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default PortfolioForm;
