import React from 'react';
import { Container } from '@mui/material';
import PageHeader from './PageHeader';
import AdList from './AdList';

function AdPage() {
  return (
    <>
      <Container sx={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        <PageHeader />
        <AdList />
      </Container>
    </>
  );
}

export default AdPage;
