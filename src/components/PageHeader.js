import React, { useState, useContext } from 'react';
import {
  Box,
  TextField,
  Button,
  List,
  ListItem,
  FormControl,
  FormLabel,
  RadioGroup,
  Grid,
  FormControlLabel,
  Radio,
  ListItemButton,
  Card,
  CardActions,
} from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import { AdContext } from '../AdContext';

// import TextField from '@mui/material/TextField';
// import InputAdornment from '@mui/material/InputAdornment';

function PageHeader() {
  const [filterOpened, setFilterOpened] = useState(false);
  const [sortOpened, setSortOpened] = useState(false);
  const [sortType, setSortType] = useState('');
  const [status, setStatus] = useState('');
  const [platform, setPlatform] = useState('');
  const [type, setType] = useState('');
  const { applyFilter } = useContext(AdContext);
  const { handleInput } = useContext(AdContext);
  const { sortAds } = useContext(AdContext);

  return (
    <div>
      <Grid columns={12} container spacing={3}>
        <Grid item xs={12} sm={7}>
          <TextField
            sx={{ marginBottom: '1rem', width: '60%' }}
            onInput={(e) => handleInput(e.target.value)}
            variant='outlined'
            placeholder='Search for an ad'
            InputProps={{
              startAdornment: (
                <SearchIcon color='primary' sx={{ paddingRight: '1rem' }} />
              ),
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={5}
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            marginLeft: 'auto',
          }}
        >
          <Box sx={{ position: 'relative', marginLeft: 'auto' }}>
            <Button
              onClick={() => {
                setFilterOpened(false);
                setSortOpened(!sortOpened);
              }}
              startIcon={<SortIcon />}
              variant='outlined'
            >
              Sort
            </Button>
            {sortOpened && (
              <Card
                sx={{
                  position: 'absolute',
                  right: '0',
                  background: 'white',
                  zIndex: '100',
                  width: '10rem',
                }}
              >
                <List>
                  <ListItem>
                    <ListItemButton
                      selected={sortType === 'desc'}
                      onClick={() => {
                        setSortOpened(false);
                        setSortType('desc');
                        sortAds('desc');
                      }}
                    >
                      By Updated at (desc)
                    </ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton
                      selected={sortType === 'asc'}
                      onClick={() => {
                        setSortOpened(false);
                        setSortType('asc');
                        sortAds('asc');
                      }}
                    >
                      By Updated at (asc)
                    </ListItemButton>
                  </ListItem>
                </List>
              </Card>
            )}
          </Box>
          <Box sx={{ position: 'relative', marginLeft: '.75rem' }}>
            <Button
              onClick={() => {
                setSortOpened(false);
                setFilterOpened(!filterOpened);
              }}
              startIcon={<FilterAltIcon />}
              variant='outlined'
            >
              Filter
            </Button>
            {filterOpened && (
              <Card
                sx={{
                  position: 'absolute',
                  right: '0',
                  background: 'white',
                  zIndex: '100',
                  width: '16rem',
                }}
              >
                <List>
                  <ListItem>
                    <FormControl>
                      <FormLabel id='demo-radio-buttons-group-label'>
                        Type
                      </FormLabel>
                      <RadioGroup
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        sx={{
                          flexDirection: 'row !important',
                        }}
                        aria-labelledby='demo-radio-buttons-group-label'
                        name='radio-buttons-group'
                      >
                        <FormControlLabel
                          value='video'
                          control={<Radio size='small' />}
                          label='video'
                        />
                        <FormControlLabel
                          value='image'
                          control={<Radio size='small' />}
                          label='image'
                        />
                      </RadioGroup>
                    </FormControl>
                  </ListItem>
                  <ListItem>
                    <FormControl>
                      <FormLabel id='demo-radio-buttons-group-label'>
                        Status
                      </FormLabel>
                      <RadioGroup
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        sx={{
                          flexDirection: 'row !important',
                        }}
                        aria-labelledby='demo-radio-buttons-group-label'
                        name='radio-buttons-group'
                      >
                        <FormControlLabel
                          value='draft'
                          control={<Radio size='small' />}
                          label='Draft'
                        />
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
                      </RadioGroup>
                    </FormControl>
                  </ListItem>
                  <ListItem>
                    <FormControl>
                      <FormLabel id='demo-radio-buttons-group-label'>
                        Platform
                      </FormLabel>
                      <RadioGroup
                        value={platform}
                        onChange={(e) => setPlatform(e.target.value)}
                        sx={{
                          flexDirection: 'row !important',
                        }}
                        aria-labelledby='demo-radio-buttons-group-label'
                        name='radio-buttons-group'
                      >
                        <FormControlLabel
                          value='facebook'
                          control={<Radio size='small' />}
                          label='Facebook'
                        />
                        <FormControlLabel
                          value='linkedin'
                          control={<Radio size='small' />}
                          label='LinkedIn'
                        />
                        <FormControlLabel
                          value='google'
                          control={<Radio size='small' />}
                          label='Google'
                        />
                      </RadioGroup>
                    </FormControl>
                  </ListItem>
                </List>
                <CardActions>
                  <Button
                    onClick={() => {
                      setFilterOpened(false);
                      applyFilter({
                        status: status || 'live',
                        platform: platform || 'google',
                        type: type || 'image',
                      });
                    }}
                    sx={{ whiteSpace: 'nowrap' }}
                    size='small'
                  >
                    Apply filter
                  </Button>
                </CardActions>
              </Card>
            )}
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default PageHeader;
