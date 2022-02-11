import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import {
  Grid,
  Typography,
  CardHeader,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
  Card,
  CardContent,
} from '@mui/material';
import instance from '../axios';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { useParams, useNavigate } from 'react-router-dom';

import TextFieldWrapper from './TextFieldWrapper';
import CheckBoxWrapper from './CheckboxWrapper';

const schema = yup.object().shape({
  name: yup.string().required('Required'),
  contentUrl: yup.string().required('Required').url('Url is not valid'),
  headline: yup
    .string()
    .required('Required')
    .max(30, 'Must be 30 characters or less'),
  description: yup
    .string()
    .required('Required')
    .max(120, 'Must be 120 characters or less'),
  destinationUrl: yup.string().required('Required').url('Url is not valid'),
});

function EditForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formValues, setFormValues] = useState(null);

  useEffect(() => {
    if (id) {
      instance.get(`/ads/${id}`).then((res) => {
        const { data } = res;

        const social = {};
        social.google = data.social.includes('google') ? true : false;
        social.linkedin = data.social.includes('linkedin') ? true : false;
        social.facebook = data.social.includes('facebook') ? true : false;
        data.social = social;
        setFormValues(data);
      });
    }
  }, [id]);

  const initialValues = {
    name: '',
    type: '',
    contentUrl: '',
    headline: '',
    description: '',
    social: { google: false, linkedin: false, facebook: false },
    destinationUrl: '',
    status: '',
  };

  const onSubmit = (values) => {
    setIsSubmitting(true);

    if (id) {
      updateAd(values);
      return;
    }
    createAd(values);
  };
  const constructSocial = (social) => {
    const google = social.google ? 'google' : null;
    const facebook = social.facebook ? 'facebook' : null;
    const linkedin = social.linkedin ? 'google' : null;
    return [google, facebook, linkedin];
  };
  const createAd = (data) => {
    const createdAt = new Date();
    instance
      .post('/ads', {
        ...data,
        createdAt,
        updatedAt: null,
        social: constructSocial(data.social),
      })
      .then(() => {
        Swal.fire({
          title: 'Ad Created',
          timer: 1500,
          icon: 'success',
        });
        setTimeout(() => navigate('/'), 2000);
      })
      .catch(() => {
        Swal.fire({
          title: 'Error Occured',
          timer: 1500,
          icon: 'error',
        });
        setTimeout(() => navigate('/'), 2000);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const updateAd = (data) => {
    const updatedAt = new Date();

    instance
      .put(`/ads/${id}`, {
        ...data,
        updatedAt,
        social: constructSocial(data.social),
      })
      .then(() => {
        Swal.fire({
          title: 'Ad Updated',
          timer: 1500,
          icon: 'success',
        });
        setTimeout(() => navigate('/'), 2000);
      })
      .catch(() => {
        Swal.fire({
          title: 'Error Occured',
          timer: 1500,
          icon: 'error',
        });
        setTimeout(() => navigate('/'), 2000);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <Card sx={{ maxWidth: '550px', margin: 'auto' }}>
      <CardHeader
        sx={{
          '& .MuiCardHeader-title': {
            fontSize: '24px',
            fontWeight: '600',
            textAlign: 'center',
          },
        }}
        title='Create Ad'
      ></CardHeader>
      <CardContent>
        <Formik
          initialValues={formValues || initialValues}
          validationSchema={schema}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {({ values, setFieldValue }) => {
            return (
              <Form>
                <TextFieldWrapper name='name' label='Name' />
                <FormControl margin='normal' fullWidth>
                  <FormLabel id='demo-radio-buttons-group-label'>
                    Type
                  </FormLabel>
                  <RadioGroup
                    name='type'
                    value={values.type}
                    onChange={(event) => {
                      setFieldValue('type', event.currentTarget.value);
                    }}
                    sx={{
                      flexDirection: 'row !important',
                    }}
                    aria-labelledby='demo-radio-buttons-group-label'
                  >
                    <FormControlLabel
                      value='image'
                      control={<Radio size='small' />}
                      label='Image'
                    />
                    <FormControlLabel
                      value='video'
                      control={<Radio size='small' />}
                      label='Video'
                    />
                  </RadioGroup>
                </FormControl>

                <TextFieldWrapper name='contentUrl' label='Content Url' />
                <TextFieldWrapper name='headline' label='Headline' />
                <TextFieldWrapper name='description' label='Description' />
                <TextFieldWrapper
                  name='destinationUrl'
                  label='Destination Url'
                />
                {id && (
                  <>
                    {values.updatedAt && (
                      <TextFieldWrapper
                        disabled
                        name='updatedAt'
                        label='Updated At'
                      />
                    )}
                    {values.createdAt && (
                      <TextFieldWrapper
                        disabled
                        name='createdAt'
                        label='Created At'
                      />
                    )}
                  </>
                )}
                <FormControl margin='normal' fullWidth>
                  <FormLabel id='demo-radio-buttons-group-label'>
                    Status
                  </FormLabel>
                  <RadioGroup
                    name='status'
                    value={values.status}
                    onChange={(event) => {
                      setFieldValue('status', event.currentTarget.value);
                    }}
                    sx={{
                      flexDirection: 'row !important',
                    }}
                    aria-labelledby='demo-radio-buttons-group-label'
                  >
                    <FormControlLabel
                      value='live'
                      control={<Radio size='small' />}
                      label='Live'
                    />
                    <FormControlLabel
                      value='paused'
                      control={<Radio size='small' />}
                      label='Paused'
                    />
                    <FormControlLabel
                      value='draft'
                      control={<Radio size='small' />}
                      label='Draft'
                    />
                  </RadioGroup>
                </FormControl>
                <Typography color='textSecondary' sx={{ marginTop: '1.5rem' }}>
                  Social
                </Typography>
                <Grid container columns={9}>
                  <Grid item xs={9} sm={3}>
                    <CheckBoxWrapper name='social.google' label='Google' />
                  </Grid>
                  <Grid item xs={9} sm={3}>
                    <CheckBoxWrapper name='social.linkedin' label='LinkedIn' />
                  </Grid>
                  <Grid item xs={9} sm={3}>
                    <CheckBoxWrapper name='social.facebook' label='Facebook' />
                  </Grid>
                </Grid>
                <Button
                  disabled={isSubmitting}
                  color='primary'
                  variant='contained'
                  type='submit'
                >
                  Submit
                </Button>
              </Form>
            );
          }}
        </Formik>
      </CardContent>
    </Card>
  );
}

export default EditForm;
