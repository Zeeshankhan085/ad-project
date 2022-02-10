import { Typography, Container } from '@mui/material';

function Header() {
  return (
    <header
      style={{
        paddingTop: '1.5rem',
        paddingBottom: '1.5rem',
        borderTop: '4px',
        borderColor: '#e5e5e5',
      }}
    >
      <Container maxWidth='lg'>
        <Typography sx={{ fontWeight: 'bold' }} variant='h5' component='h1'>
          Ad Manager
        </Typography>
      </Container>
    </header>
  );
}

export default Header;
