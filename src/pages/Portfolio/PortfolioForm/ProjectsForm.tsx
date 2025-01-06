import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Button, IconButton, TextField } from "@mui/material";
import { FieldArray, Form, Formik } from "formik";
import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  docsUpload,
  insertPortfolioProjectData,
} from "../../../services/services";

interface ProjectsTabProps {
  onSubmit: (values: any) => void;
  profileId: string;
}

const ProjectsTab: React.FC<ProjectsTabProps> = ({ onSubmit, profileId }) => {
  const [uploading, setUploading] = useState(false);

  console.log(profileId);
  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void,
    index: number
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
        setFieldValue(`projects[${index}].imageFile`, uploadedUrl);

        console.log("File uploaded successfully:", uploadedUrl);
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <Formik
      initialValues={{
        projects: [
          {
            imageFile: null,
            title: "",
            description: "",
            role: "",
            date: "",
            collaborators: "",
            location: "",
            awards: "",
            porfolioId: profileId,
          },
        ],
      }}
      onSubmit={(values) => {
        const payLoad = {
          portfolioProject: values.projects,
          portfolioId: profileId,
        };
        console.log(payLoad);
        insertPortfolioProjectData(payLoad)
          .then((res: any) => {
            toast(res?.data?.msg);
          })
          .catch((err: any) => {
            toast(err);
          });
        onSubmit(values);
      }}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <FieldArray name="projects">
            {({ push, remove }) => (
              <div>
                <h4>Projects</h4>
                {values.projects.map((_, index) => (
                  <div key={index}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      <label htmlFor={`projects[${index}].imageFile`}>
                        Upload Image:
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        id={`projects[${index}].imageFile`}
                        onChange={(event) =>
                          handleFileChange(event, setFieldValue, index)
                        }
                      />
                    </div>

                    <TextField
                      name={`projects[${index}].title`}
                      label="Title"
                      fullWidth
                      margin="normal"
                      value={values.projects[index].title}
                      onChange={(e) =>
                        setFieldValue(
                          `projects[${index}].title`,
                          e.target.value
                        )
                      }
                    />
                    <TextField
                      name={`projects[${index}].description`}
                      label="Description"
                      multiline
                      fullWidth
                      margin="normal"
                      value={values.projects[index].description}
                      onChange={(e) =>
                        setFieldValue(
                          `projects[${index}].description`,
                          e.target.value
                        )
                      }
                    />
                    <TextField
                      name={`projects[${index}].role`}
                      label="Role"
                      fullWidth
                      margin="normal"
                      value={values.projects[index].role}
                      onChange={(e) =>
                        setFieldValue(`projects[${index}].role`, e.target.value)
                      }
                    />
                    <TextField
                      name={`projects[${index}].date`}
                      label="Date"
                      fullWidth
                      margin="normal"
                      value={values.projects[index].date}
                      onChange={(e) =>
                        setFieldValue(`projects[${index}].date`, e.target.value)
                      }
                    />
                    <TextField
                      name={`projects[${index}].collaborators`}
                      label="Collaborators"
                      fullWidth
                      margin="normal"
                      value={values.projects[index].collaborators}
                      onChange={(e) =>
                        setFieldValue(
                          `projects[${index}].collaborators`,
                          e.target.value
                        )
                      }
                    />
                    <TextField
                      name={`projects[${index}].location`}
                      label="Location"
                      fullWidth
                      margin="normal"
                      value={values.projects[index].location}
                      onChange={(e) =>
                        setFieldValue(
                          `projects[${index}].location`,
                          e.target.value
                        )
                      }
                    />
                    <TextField
                      name={`projects[${index}].awards`}
                      label="Awards"
                      fullWidth
                      margin="normal"
                      value={values.projects[index].awards}
                      onChange={(e) =>
                        setFieldValue(
                          `projects[${index}].awards`,
                          e.target.value
                        )
                      }
                    />
                    <Button onClick={() => remove(index)}>Remove</Button>
                  </div>
                ))}
                <IconButton
                  onClick={() =>
                    push({
                      imageFile: null,
                      title: "",
                      description: "",
                      role: "",
                      date: "",
                      collaborators: "",
                      location: "",
                      awards: "",
                    })
                  }
                >
                  <AddCircleOutlineIcon />
                </IconButton>
              </div>
            )}
          </FieldArray>
          <Button type="submit">Next</Button>
        </Form>
      )}
    </Formik>
  );
};

export default ProjectsTab;
