import React from 'react';
import PropTypes from 'prop-types';
import { Box, Stack, useMediaQuery } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Typography } from '@mui/material';

const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;

export const BottomNav = (props) => {
  return (
    <>
      <Box
        component='header'
        sx={{
          backdropFilter: 'blur(6px)',
          backgroundColor: (theme) =>
            alpha(theme.palette.background.default, 0.8),
          position: 'sticky',
          left: {
            lg: `${SIDE_NAV_WIDTH}px`,
          },
          top: 0,
          width: {
            lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`,
          },
          zIndex: (theme) => theme.zIndex.appBar,
        }}>
        <Stack
          alignItems='center'
          direction='row'
          justifyContent='center'
          spacing={2}
          sx={{
            minHeight: TOP_NAV_HEIGHT,
            px: 2,
          }}>
          <Typography
            sx={{
              fontSize: '13px',
              letterSpacing: '1px',
            }}
            color='textPrimary'>
            Copyright © 2023 . Designed by{' '}
            <span style={{ color: 'orange' }}>Harmony</span> All rights reserved
          </Typography>
        </Stack>
      </Box>
    </>
  );
};

BottomNav.propTypes = {
  onNavOpen: PropTypes.func,
};
