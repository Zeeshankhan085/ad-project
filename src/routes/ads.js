import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import { AdProvider } from '../AdContext';
import { Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#36a3e5',
    },
  },
  text: {
    secondary: '#d6d6da',
    'dark-green': '#1d911d',
  },
});

function Ads() {
  return (
    <ThemeProvider theme={theme}>
      <AdProvider>
        <Header />
        <main>
          <Box sx={{ background: '#f9f9f9' }}>
            <Outlet />
          </Box>
        </main>
      </AdProvider>
    </ThemeProvider>
  );
}

export default Ads;
