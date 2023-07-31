import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Box, Typography, Stack, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { TruckScreen } from '@/sections/input/truck-screen';
import RsvpIcon from '@mui/icons-material/Rsvp';
import PinIcon from '@mui/icons-material/Pin';
import { getLatestTruckIn } from '@/api/get-latest-truck-in';
import moment from 'moment';

const GetLatestTruck = () => {
  const [latestTruck, setLatestTruck] = useState(null);

  const fetchLatestTruck = async () => {
    try {
      const fetchedData = await getLatestTruckIn();
      console.log('Latest truck:', fetchedData);
      setLatestTruck(fetchedData);
    } catch (error) {
      console.error('Error fetching the latest truck:', error);
    }
  };

  useEffect(() => {
    fetchLatestTruck();
    const interval = setInterval(() => {
      fetchLatestTruck();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Grid container spacing={3} sx={{ width: '80%', ml: 10, mt: 3 }}>
        <Grid container item xs={12} md={12} lg={12} spacing={2}>
          <Grid item xs={12} md={6} lg={6}>
            <Stack
              direction='column'
              sx={{ height: '30vh', mt: 2, mb: 2 }}
              spacing={2}
              justifyContent='space-between'>
              <Box
                sx={{
                  height: '100%',
                  bgcolor: 'white',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  borderRadius: '10px',
                }}>
                <Typography sx={{ my: 2 }} variant='h6'>
                  TAG
                </Typography>
                <Typography sx={{ fontSize: '13px' }} variant='h6'>
                  {' '}
                  {latestTruck?.tag || 'No tag found'}
                </Typography>
              </Box>
              <Box
                sx={{
                  height: '100%',
                  bgcolor: 'white',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  borderRadius: '10px',
                }}>
                <Typography sx={{ my: 2 }} variant='h6'>
                  Date
                </Typography>
                <Typography variant='h6'>
                  {latestTruck?.in_time
                    ? moment(latestTruck.in_time).format('lll')
                    : '--/--/----'}
                </Typography>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Stack
              direction='column'
              sx={{ height: '30vh', mt: 2, mb: 2 }}
              spacing={2}>
              <Box
                sx={{
                  height: '100%',
                  bgcolor: 'white',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  borderRadius: '10px',
                }}>
                <Typography sx={{ my: 2 }} variant='h6'>
                  Plate Number
                </Typography>
                <Typography variant='h6'>
                  {latestTruck?.plate_number || 'No plate number found'}
                </Typography>
              </Box>
              <Box
                sx={{
                  height: '100%',
                  bgcolor: 'white',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  borderRadius: '10px',
                }}>
                <Typography sx={{ my: 2 }} variant='h6'>
                  Time
                </Typography>
                <Typography variant='h6'>
                  {latestTruck?.in_time ? (
                    moment(latestTruck.in_time).format('LT')
                  ) : (
                    <Typography variant='h6'>--:--</Typography>
                  )}
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>
        <Grid
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: '#fff',
            height: '50%',
            borderRadius: '50px 0px 50px 0px',
            boxShadow: '0px 0px 10px 2px rgba(0, 0, 0, 0.06)',
          }}
          container
          item
          xs={12}
          md={12}
          lg={12}
          spacing={2}>
          <Stack
            direction='column'
            sx={{
              height: '12vh',
              width: '100%',
              justifyContent: 'center',
              display: 'flex',
              alignItems: 'center',
            }}
            spacing={5}>
            <Typography
              sx={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#000',
                mb: 2,
                mt: -10,
              }}>
              Check the plate number & Tag RFID
            </Typography>
            <Box
              sx={{
                height: '100%',
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                flexDirection: 'row',
                padding: '0 10px',
                flexDirection: 'column',
              }}>
              <Typography
                sx={{ fontSize: '13px', width: '100%' }}
                variant='body'>
                Plate N°
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  border: '1px solid #E5E5E5',
                  width: '100%',
                  alignItems: 'center',
                  borderRadius: '13px',
                }}>
                <PinIcon
                  sx={{
                    fontSize: '31px',
                    p: 1,
                    cursor: 'pointer',
                    borderTopLeftRadius: '12px',
                    borderBottomLeftRadius: '12px',
                    borderRight: '1px solid #E5E5E5',
                    height: '100%',
                    width: '10%',
                    bgcolor: '#F8F9FA',
                  }}
                />
                <Box
                  sx={{
                    justifyContent: 'center',
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    alignItems: 'center',
                  }}>
                  <Typography sx={{ fontSize: '13px', ml: 2 }} variant='h6'>
                    {latestTruck?.plate_number || 'No plate number found'}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                height: '100%',
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                flexDirection: 'row',
                padding: '0 10px',
                flexDirection: 'column',
              }}>
              <Typography
                sx={{ fontSize: '13px', width: '100%' }}
                variant='body'>
                Tag RFID
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  border: '1px solid #E5E5E5',
                  width: '100%',
                  alignItems: 'center',
                  borderRadius: '13px',
                  height: '100%',
                }}>
                <RsvpIcon
                  sx={{
                    fontSize: '31px',
                    p: 1,
                    cursor: 'pointer',
                    borderTopLeftRadius: '12px',
                    borderBottomLeftRadius: '12px',
                    borderRight: '1px solid #E5E5E5',
                    height: '100%',
                    width: '10%',
                    bgcolor: '#F8F9FA',
                  }}
                />
                <Box
                  sx={{
                    justifyContent: 'center',
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                  }}>
                  <Typography sx={{ fontSize: '14px', ml: 2 }} variant='h6'>
                    {latestTruck?.tag || 'No tag found'}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

const Page = () => (
  <>
    <Head>
      <title>In put</title>
    </Head>
    <Box
      sx={{
        p: 2,
        px: 10,
        py: 5,
        display: 'flex',
        justifyContent: 'space-around',
        bgcolor: '#F0F1F6',
        height: '100%',
        width: '100%',
        overflowY: 'hidden',
      }}>
      <Grid container item xs={12} md={12} lg={12}>
        <TruckScreen />
      </Grid>
      <GetLatestTruck />
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
