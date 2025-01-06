import React, { useState } from "react";
import { FieldArray, Formik, Form } from "formik";
import { TextField, Button, IconButton, CircularProgress } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  docsUpload,
  insertPortfolioAchivements,
} from "../../../services/services";
import { toast } from "react-toastify";

interface Testimony {
  name: string;
  profileImage: string;
  testimony: string;
}

interface FormValues {
  achievements: string[];
  testimonies: Testimony[];
}

interface AchievementsTabProps {
  onSubmit: (values: any) => void;
  profileId: string;
}

const AchievementsTab: React.FC<AchievementsTabProps> = ({
  onSubmit,
  profileId,
}) => {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void,
    index: number
  ) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const formData = new FormData();
      formData.append("files", selectedFile);

      setUploading(true);
      try {
        const res = await docsUpload(formData);
        const uploadedUrl = res?.data?.data?.doc0;

        if (uploadedUrl) {
          // Update the specific testimony's profileImage field
          setFieldValue(`testimonies[${index}].profileImage`, uploadedUrl);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <Formik<FormValues>
      initialValues={{
        achievements: [],
        testimonies: [],
      }}
      onSubmit={(values) => {
        // Construct payload
        const payLoad = {
          achievements: values.achievements,
          testimonies: values.testimonies,
          // .map((testimony) => ({
          //   name: testimony.name,
          //   profileImage: testimony.profileImage,
          //   testimony: testimony.testimony,
          // })),
          portfolioId: profileId,
        };

        insertPortfolioAchivements(payLoad)
          .then((res:any) => {
            //
            toast(res?.data?.msg);
            onSubmit(values);
          })
          .catch((err: any) => {
            toast(err);
          });

        // onSubmit(payLoad);
      }}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <FieldArray name="achievements">
            {({ push, remove }) => (
              <div>
                <h4>Achievements</h4>
                {values.achievements.map((_, index) => (
                  <div key={index}>
                    <TextField
                      name={`achievements[${index}]`}
                      label="Achievement Title"
                      fullWidth
                      margin="normal"
                      value={values.achievements[index]}
                      onChange={(e) =>
                        setFieldValue(`achievements[${index}]`, e.target.value)
                      }
                    />
                    <Button onClick={() => remove(index)}>Remove</Button>
                  </div>
                ))}
                <IconButton onClick={() => push("")}>
                  <AddCircleOutlineIcon />
                </IconButton>
              </div>
            )}
          </FieldArray>
          <FieldArray name="testimonies">
            {({ push, remove }) => (
              <div>
                <h4>Testimonies</h4>
                {values.testimonies.map((_, index) => (
                  <div key={index}>
                    <TextField
                      name={`testimonies[${index}].name`}
                      label="Name"
                      fullWidth
                      margin="normal"
                      value={values.testimonies[index]?.name || ""}
                      onChange={(e) =>
                        setFieldValue(
                          `testimonies[${index}].name`,
                          e.target.value
                        )
                      }
                    />
                    <div style={{ marginBottom: "10px" }}>
                      <label>Profile Image:</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleFileChange(e, setFieldValue, index)
                        }
                      />
                      {uploading && (
                        <CircularProgress
                          size={24}
                          style={{ marginLeft: "10px" }}
                        />
                      )}
                    </div>
                    <TextField
                      name={`testimonies[${index}].testimony`}
                      label="Testimony"
                      multiline
                      fullWidth
                      margin="normal"
                      value={values.testimonies[index]?.testimony || ""}
                      onChange={(e) =>
                        setFieldValue(
                          `testimonies[${index}].testimony`,
                          e.target.value
                        )
                      }
                    />
                    <Button onClick={() => remove(index)}>Remove</Button>
                  </div>
                ))}
                <IconButton
                  onClick={() =>
                    push({ name: "", profileImage: "", testimony: "" })
                  }
                >
                  <AddCircleOutlineIcon />
                </IconButton>
              </div>
            )}
          </FieldArray>
          <Button type="submit" variant="contained" color="primary">
            Next
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default AchievementsTab;
