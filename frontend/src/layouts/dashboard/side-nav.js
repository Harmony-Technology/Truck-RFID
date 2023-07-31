import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Divider,
  Drawer,
  Stack,
  useMediaQuery,
} from '@mui/material';
import { Logo } from 'src/components/logo';
import { Scrollbar } from 'src/components/scrollbar';
import { items } from './config';
import { SideNavItem } from './side-nav-item';
// import { useSession } from 'next-auth/react';

export const SideNav = (props) => {
  const { open, onClose } = props;
  const pathname = usePathname();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  // const { data: session } = useSession();

  const content = (
    <Scrollbar
      sx={{
        'height': '100%',
        '& .simplebar-content': {
          height: '100%',
        },
        '& .simplebar-scrollbar:before': {
          background: 'black',
        },
      }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}>
        <Box sx={{ p: 3 }}>
          <Box
            component={NextLink}
            href='/'
            sx={{
              display: 'inline-flex',
              height: 72,
              width: 200,
              justifyContent: 'center',
            }}>
            <Logo />
          </Box>
        </Box>
        <Divider sx={{ borderColor: 'neutral.700' }} />
        <Box
          component='nav'
          sx={{
            flexGrow: 1,
            px: 2,
            py: 3,
          }}>
          <Stack
            component='ul'
            spacing={1.5}
            sx={{
              listStyle: 'none',
              p: 0,
              m: 5,
              justifyContent: 'center',
            }}>
            {items.map((item) => {
              // if (session?.role === 'client' && item.title === 'Dashboard') {
              //   return null;
              // }
              const active = item.path ? pathname === item.path : false;

              return (
                <SideNavItem
                  active={active}
                  disabled={item.disabled}
                  external={item.external}
                  icon={item.icon}
                  key={item.title}
                  path={item.path}
                  title={item.title}
                />
              );
            })}
          </Stack>
        </Box>
        <Divider sx={{ borderColor: 'neutral.700' }} />
      </Box>
    </Scrollbar>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor='left'
        open
        PaperProps={{
          sx: {
            backgroundColor: '#111C43',
            color: 'common.white',
            width: 280,
          },
        }}
        variant='permanent'>
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor='left'
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: '#111C43',
          color: 'common.white',
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant='temporary'>
      {content}
    </Drawer>
  );
};

SideNav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
