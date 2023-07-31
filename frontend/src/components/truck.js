import { useTheme } from '@mui/material/styles';

export const Truck = ({ image }) => {
  // Accept truckImage as a prop
  const theme = useTheme();
  const fillColor = theme.palette.primary.main;

  return (
    <div
      style={{
        width: '50px',
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}></div>
  );
};
