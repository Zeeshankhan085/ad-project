import React from 'react';
import { Container } from '@mui/material';
import AdForm from './AdForm';

function AdEdit() {
  return (
    <Container sx={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      <AdForm />
    </Container>
  );
}

export default AdEdit;
