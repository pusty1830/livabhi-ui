import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { Button, Box, Grid, IconButton, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { docsUpload, insertPortfolioPhotos } from '../../../services/services';
import { toast } from 'react-toastify';

interface PhotosTabProps {
  onSubmit: (values: any) => void;
  profileId: string;
}

const PhotosTab: React.FC<PhotosTabProps> = ({ onSubmit, profileId }) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null); // To hold a single image
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const selectedFile = e.target.files?.[0]; // Get the first selected file
    if (selectedFile) {
      const formData = new FormData();
      formData.append('files', selectedFile);

      setUploading(true);
      try {
        const res = await docsUpload(formData);
        const uploadedUrl = res?.data?.data?.doc0;

        if (uploadedUrl) {
          setPreviewImage(uploadedUrl); // Set the preview for the single photo
          setFieldValue('photos', uploadedUrl); // Set the single URL in Formik state
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <Formik
      initialValues={{
        photos: "",
      }}
      onSubmit={(values) => {
        console.log(values);
        const payLoad = {
          portfolioId: profileId,
          url: values.photos,

        };
        console.log(payLoad);
        insertPortfolioPhotos(payLoad).then((res:any) => {
          // 
          toast(res?.data?.msg);
          onSubmit(values);
        }).catch((err:any) => {
          toast(err)
        })

      }}
    >
      {({ setFieldValue, values }) => (
        <Form>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label>Upload Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, setFieldValue)}
              disabled={uploading}
            />
          </div>

          {uploading && (
            <Box mt={2}>
              <CircularProgress />
            </Box>
          )}

          {previewImage && (
            <Box mt={2}>
              <Grid container spacing={2}>
                <Grid item xs={4} style={{ position: 'relative' }}>
                  <img
                    src={previewImage}
                    alt="Preview"
                    style={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: '8px',
                    }}
                  />
                  <IconButton
                    onClick={() => {
                      setPreviewImage(null); // Clear the preview
                      setFieldValue('photos', ""); // Reset the Formik value
                    }}
                    style={{
                      position: 'absolute',
                      top: 5,
                      right: 5,
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    }}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                </Grid>
              </Grid>
            </Box>
          )}

          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Next
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default PhotosTab;
