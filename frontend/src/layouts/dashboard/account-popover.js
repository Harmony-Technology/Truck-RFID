import PropTypes from 'prop-types';
import { Box, Divider, MenuItem, MenuList, Popover } from '@mui/material';
import { signOut } from 'next-auth/react';
import JWTToken from '../../lib/token';

export const AccountPopover = (props) => {
  const { anchorEl, onClose, open } = props;
  const HandleSignout = () => {
    signOut({ redirect: false });
    JWTToken.removeToken();
  };

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom',
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}>
      <Box
        sx={{
          py: 0.5,
          px: 1,
        }}></Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          'p': '8px',
          '& > *': {
            borderRadius: 1,
          },
        }}>
        <MenuItem onClick={HandleSignout}>Sign out</MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
};
