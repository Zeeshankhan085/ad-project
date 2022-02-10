import React, { useContext } from 'react';
import { Grid, Card, Box, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import AdCard from './AdCard';
import { AdContext } from '../AdContext';
import AddIcon from '@mui/icons-material/Add';
function AdList() {
  const { ads } = useContext(AdContext);
  return (
    <>
      <Grid container spacing={2} sx={{ paddingTop: '3rem' }}>
        <Grid sx={{ minHeight: '350px' }} item xs={12} sm={6} md={4} lg={3}>
          <Link underline='none' component={RouterLink} to='/ads/new'>
            <Card
              sx={{
                height: '100%',
                boxSizing: 'border-box',
                padding: '16px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  border: '2px dotted #36a3e5',
                  borderRadius: '4px',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <AddIcon></AddIcon>
                <Typography>Create ad</Typography>{' '}
              </Box>
            </Card>
          </Link>
        </Grid>
        {ads.length > 0 &&
          ads.map((ad) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <AdCard ad={ad} />
              </Grid>
            );
          })}
      </Grid>
    </>
  );
}

export default AdList;
