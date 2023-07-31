import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { Box, Unstable_Grid2 as Grid } from '@mui/material';
import Image from 'next/image';

export const Layout = (props) => {
  const { children } = props;

  return (
    <Box
      component='main'
      sx={{
        display: 'flex',
        flex: '1 1 auto',
      }}>
      <Grid container sx={{ flex: '1 1 auto' }}>
        <Grid
          xs={12}
          lg={6}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}>
          <Box
            component='header'
            sx={{
              left: 200,
              p: 3,
              position: 'fixed',
              top: 0,
              width: '100%',
            }}>
            <Box component={NextLink} href='/'>
              <Image
                src='/assets/logos/logo-harmony.svg'
                alt='logo'
                width={97}
                height={97}
              />
            </Box>
          </Box>
          {children}
        </Grid>
        <Grid
          container
          xs={12}
          lg={6}
          sx={{
            '@media (max-width: 600px)': {
              display: 'none',
            },
            'width': '100%',
            'alignItems': 'center',
            'background':
              'linear-gradient(63.11% 67.65% at 50.08% 14.43%, rgba(136, 146, 183, 0.08) 0%, rgba(17, 28, 67, 0.82) 100%)',
            'backgroundImage': `url('/assets/wallpaper1.png')`,
            'backgroundRepeat': 'no-repeat',
            'backgroundSize': 'cover',
            'display': 'flex',
            'justifyContent': 'flex-start',
            '& img': {
              position: 'relative',
              right: 120,
            },
            '@media (max-width: 1200px)': {
              display: 'none',
            },
          }}>
          <Box sx={{ p: 3 }}>
            <img
              alt=''
              src='/assets/truck001.png'
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

Layout.prototypes = {
  children: PropTypes.node,
};
