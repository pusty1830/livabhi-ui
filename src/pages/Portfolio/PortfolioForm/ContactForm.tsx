import { Button, TextField } from '@mui/material';
import { Form, Formik } from 'formik';
import React from 'react';
import { portfolioContactSchema } from '../../../components/utils/schema';
import { insertPortfolioContact } from '../../../services/services';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface ContactTabProps {
  onSubmit: (values: any) => void;
  profileId: string;
}

const ContactTab: React.FC<ContactTabProps> = ({ onSubmit, profileId }) => {
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        email: '',
        phoneNumber: '',
      }}
      validationSchema={portfolioContactSchema}
      onSubmit={(values) => {
        console.log(values);
        const payLoad = {
          email: values.email,
          phoneNumber: values.phoneNumber,
          portfolioId: profileId,
        };

        insertPortfolioContact(payLoad)
          .then((res:any) => {
            toast(res?.data?.msg);
            onSubmit(values);
            navigate('/login');
          })
          .catch((err:any) => {
            toast.error(err);
          });
      }}
    >
      {({ values, setFieldValue, errors, touched }) => (
        <Form>
          <label>Contact</label>
          <div>
            <TextField
              name="email"
              label="Email"
              fullWidth
              margin="normal"
              value={values.email}
              onChange={(e) => setFieldValue('email', e.target.value)}
              error={touched.email && !!errors.email}
              helperText={touched.email && errors.email}
            />
          </div>
          <div>
            <TextField
              name="phoneNumber"
              label="Phone Number"
              fullWidth
              margin="normal"
              value={values.phoneNumber}
              onChange={(e) => setFieldValue('phoneNumber', e.target.value)}
              error={touched.phoneNumber && !!errors.phoneNumber}
              helperText={touched.phoneNumber && errors.phoneNumber}
            />
          </div>
          <Button type="submit" variant="contained" color="primary">
            Next
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactTab;
