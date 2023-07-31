import PropTypes from 'prop-types';
import { Card, CardContent, Stack, Typography } from '@mui/material';
import { Truck } from 'src/components/truck';
// import chart from '../../../public/chart.png';

export const TruckCard = (props) => {
  const { sx, value, name, image } = props;

  return (
    <Card
      sx={{
        backgroundColor: '#F5F5F5',
        width: '300px',
        height: '160px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <CardContent>
        <Stack direction='row' justifyContent='space-between' spacing={3}>
          <Stack spacing={1}>
            <Truck image={image} />
          </Stack>
          <Stack
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            <Typography
              sx={{
                fontSize: '17px',
              }}
              color='textSecondary'
              variant='overline'>
              {name}
            </Typography>
            <Typography
              sx={{
                fontSize: '25px',
              }}
              color='textPrimary'
              variant='h6'>
              {value}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

TruckCard.propTypes = {
  sx: PropTypes.object,
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
};
