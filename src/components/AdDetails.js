import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Link } from '@mui/material';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { getData } from '../StorageService';

function AdDetails() {
  const { id } = useParams();
  const [ad, setAd] = useState(null);
  useEffect(() => {
    const result = getData(id);
    setAd(result);
  }, [id]);

  if (ad) {
    return (
      <>
        {ad.length && null}
        {Object.keys(ad).length && (
          <Container sx={{ paddingTop: '5rem' }}>
            <Grid columns={9} container spacing={3}>
              <Grid item xs={9} sm={4} md={3}>
                <Typography gutterBottom variant='h5' component='h1'>
                  {ad.name}
                </Typography>
                {ad.type === 'video' ? (
                  <iframe
                    title='video'
                    width='300'
                    height='315'
                    src={`https://www.youtube.com/embed/${
                      ad.contentUrl.split('=')[1]
                    }`}
                  ></iframe>
                ) : (
                  <img
                    height='200'
                    width='250'
                    style={{ display: 'block', objectFit: 'cover' }}
                    src={ad.contentUrl}
                    alt=''
                  />
                )}
              </Grid>
              <Grid sx={{ alignSelf: 'center' }} item xs={9} sm={4} md={3}>
                <Typography gutterBottom variant='h6' component='h3'>
                  {ad.headline}
                </Typography>
                <Typography gutterBottom>{ad.description}</Typography>
                <Link target='_blank' href={ad.destinationUrl} underline='none'>
                  {ad.destinationUrl}
                </Link>
              </Grid>
              <Grid item xs={9} sm={1} md={2}>
                <Link
                  to={`/ads/${id}/edit`}
                  underline='none'
                  variant='button'
                  component={RouterLink}
                >
                  Edit
                </Link>
              </Grid>
            </Grid>
          </Container>
        )}
      </>
    );
  }
  return null;
}

export default AdDetails;
