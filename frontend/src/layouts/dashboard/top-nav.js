import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import BellIcon from '@heroicons/react/24/solid/BellIcon';
import Bars3Icon from '@heroicons/react/24/solid/Bars3Icon';
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Stack,
  SvgIcon,
  Tooltip,
  useMediaQuery,
  Popover,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { alpha } from '@mui/material/styles';
import { usePopover } from 'src/hooks/use-popover';
import { AccountPopover } from './account-popover';
import { Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import { getNotifications } from '@/api/get-notifications';
import { markAsRead } from '@/api/mark-as-read';

const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;

export const TopNav = (props) => {
  const { onNavOpen } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const accountPopover = usePopover();
  const { data: session } = useSession();

  const [anchorEl, setAnchorEl] = useState(null);

  const styles = {
    popoverContainer: {
      maxWidth: 320,
      minWidth: 320,
    },
    markAsReadButton: {
      marginTop: 2,
      textTransform: 'none',
    },
  };

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setunreadCount] = useState(0);

  // let unreadCountLocal = localStorage.getItem("unreadCount");

  const handleMarkAsRead = () => {
    markAsRead();
    setunreadCount(0);
    // localStorage.setItem("unreadCount", 0);
    setNotifications([]);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  useEffect(() => {
    const interval = setInterval(async () => {
      const getUserNotifications = async () => {
        const notifications = await getNotifications();
        setNotifications(notifications.notfication);
        // localStorage.setItem("unreadCount", notifications.countNotif);
        setunreadCount(notifications.countNotif);
      };
      getUserNotifications();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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
          justifyContent='space-between'
          spacing={2}
          sx={{
            minHeight: TOP_NAV_HEIGHT,
            px: 2,
          }}>
          <Stack alignItems='center' direction='row' spacing={2}>
            {!lgUp && (
              <IconButton onClick={onNavOpen}>
                <SvgIcon fontSize='small'>
                  <Bars3Icon />
                </SvgIcon>
              </IconButton>
            )}
          </Stack>
          <Stack alignItems='center' direction='row' spacing={2}>
            <Tooltip title='Notifications'>
              <IconButton aria-describedby={id} onClick={handleClick}>
                <Badge badgeContent={unreadCount} color='error'>
                  <SvgIcon fontSize='small'>
                    <BellIcon />
                  </SvgIcon>
                </Badge>
              </IconButton>
            </Tooltip>
            <Typography color='textPrimary' variant='h6'>
              |
            </Typography>
            <Stack direction='column' spacing={0.5}>
              <Typography
                color='textPrimary'
                variant='h6'
                sx={{
                  fontSize: '14px',
                }}>
                {session?.user?.first_name + ' ' + session?.user?.last_name}
              </Typography>
              <Typography
                color='textPrimary'
                variant='subtitle1'
                sx={{
                  fontSize: '11px',
                }}>
                {session?.role}
              </Typography>
            </Stack>
            <Avatar
              onClick={accountPopover.handleOpen}
              ref={accountPopover.anchorRef}
              sx={{
                cursor: 'pointer',
                height: 40,
                width: 40,
              }}
              src={session?.user?.image}
            />
          </Stack>
        </Stack>
      </Box>
      <AccountPopover
        anchorEl={accountPopover.anchorRef.current}
        open={accountPopover.open}
        onClose={accountPopover.handleClose}
      />

      {/* Notifications popover */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}>
        <Box
          sx={{
            p: 2,
            ...styles.popoverContainer,
          }}>
          <Typography variant='h6'>Notifications</Typography>
          {unreadCount !== 0 ? (
            <List>
              {notifications.map((notification) => {
                if (notification.is_read === false) {
                  return (
                    <React.Fragment key={notification.id}>
                      <ListItem
                        primaryTypographyProps={{
                          sx: { fontSize: 14 },
                        }}>
                        <ListItemText
                          primaryTypographyProps={{ sx: { fontSize: 14 } }}
                          primary={notification.message}
                        />
                        <ListItemText
                          primaryTypographyProps={{
                            sx: {
                              fontSize: 13,
                              color: 'gray',
                              fontStyle: 'italic',
                            },
                          }}
                          // primary={
                          //   notification.ago +
                          //   ' ' +
                          //   notification.timeunit +
                          //   ' ago'
                          // }
                        />
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  );
                }
              })}
            </List>
          ) : (
            <Typography>No notifications</Typography>
          )}

          {unreadCount !== 0 && (
            <Button
              sx={...styles.markAsReadButton}
              variant='contained'
              color='primary'
              size='small'
              startIcon={<CheckIcon />}
              onClick={handleMarkAsRead}>
              Mark all as read
            </Button>
          )}
        </Box>
      </Popover>
    </>
  );
};

TopNav.propTypes = {
  onNavOpen: PropTypes.func,
};
