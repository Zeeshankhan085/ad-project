import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { red, blue } from '@mui/material/colors';

import {
  Typography,
  Link,
  Card,
  CardActions,
  CardMedia,
  CardHeader,
  CardContent,
  Chip,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';

import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function AdCard({ ad }) {
  return (
    <Link underline='none' component={RouterLink} to={`/ads/${ad.id}`}>
      <Card sx={{ height: '100%', position: 'relative' }}>
        <CardHeader
          sx={{
            '& .MuiCardHeader-title': {
              fontSize: '16px',
              fontWeight: '600',
            },
          }}
          title={ad.name}
          action={
            <IconButton aria-label='settings'>
              <MoreVertIcon />
            </IconButton>
          }
        ></CardHeader>
        {ad.type === 'video' ? (
          <CardMedia
            component='img'
            height='200'
            image='https://placekitten.com/g/200/300'
          />
        ) : (
          <CardMedia component='img' height='200' image={ad.contentUrl} />
        )}
        <CardContent sx={{ marginTop: '20px', paddingBottom: '60px' }}>
          <Typography
            sx={{ fontSize: '16px' }}
            variant='subtitle'
            component='h3'
            gutterBottom
          >
            {ad.headline}
          </Typography>
          <Typography color='textSecondary' gutterBottom>
            {ad.description}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            left: 0,
            paddingLeft: '16px',
            paddingRight: '16px',
          }}
        >
          <FacebookRoundedIcon
            sx={{ color: ad.social?.includes('facebook') ? blue[900] : '' }}
          />
          <LinkedInIcon
            sx={{ color: ad.social?.includes('linkedin') ? blue[700] : '' }}
          />
          <GoogleIcon
            sx={{ color: ad.social?.includes('google') ? red[500] : '' }}
          />
          {ad?.status === 'live' && (
            <Chip
              icon={
                <FiberManualRecordIcon
                  fontSize='small'
                  style={{ color: '#1d911d' }}
                />
              }
              sx={{
                marginLeft: 'auto',
                paddingLeft: '.25rem',
                paddingRight: '.25rem',
                background: '#cdffcd',
                fontWeight: 'bold',
                fontSize: '12px',
                color: '#1d911d',
              }}
              label='Live'
            />
          )}
          {ad?.status === 'draft' && (
            <Chip
              icon={<FiberManualRecordIcon fontSize='small' />}
              sx={{
                marginLeft: 'auto',
                paddingLeft: '.25rem',
                paddingRight: '.25rem',
                fontWeight: 'bold',
                fontSize: '12px',
              }}
              label='Draft'
            />
          )}
          {ad?.status === 'paused' && (
            <Chip
              icon={
                <FiberManualRecordIcon
                  fontSize='small'
                  style={{ color: red[700] }}
                />
              }
              sx={{
                marginLeft: 'auto',
                paddingLeft: '.25rem',
                paddingRight: '.25rem',
                background: '#f4c2c2',
                fontWeight: 'bold',
                fontSize: '12px',
                color: red[700],
              }}
              label='Paused'
            />
          )}
        </CardActions>
      </Card>
    </Link>
  );
}

export default AdCard;
