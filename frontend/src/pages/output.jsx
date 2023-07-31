import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import {
  Box,
  Typography,
  Button,
  Stack,
  Modal,
  Unstable_Grid2 as Grid,
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { TruckScreen } from '@/sections/input/truck-screen';
import RsvpIcon from '@mui/icons-material/Rsvp';
import PinIcon from '@mui/icons-material/Pin';
import { getLatestTruckOut } from '@/api/get-latest-truck-out';
import moment from 'moment';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 360,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const GetLatestTruck = () => {
  const [latestTruck, setLatestTruck] = useState(null);

  const fetchLatestTruck = async () => {
    try {
      const fetchedData = await getLatestTruckOut();
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

  const BasicModal = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
      <div>
        <Button
          onClick={handleOpen}
          variant='contained'
          size='large'
          sx={{
            'width': '100px',
            'height': '100%',
            'ml': 10,
            'backgroundColor': '#12A727',
            'borderTopLeftRadius': '0px',
            'borderBottomLeftRadius': '0px',
            'p': 2.2,
            ':hover': {
              backgroundColor: '#12A727',
            },
          }}>
          Check
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'>
          <Box sx={style}>
            <Box sx={{ mb: 5 }}>
              {latestTruck?.statut === 'checked' ? (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='70'
                  height='70'
                  viewBox='0 0 70 70'
                  fill='none'>
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M5.17597 35C5.17605 40.8987 6.9253 46.6649 10.2025 51.5695C13.4797 56.474 18.1377 60.2966 23.5874 62.5539C29.0371 64.8112 35.0338 65.4018 40.8192 64.2509C46.6045 63.1001 51.9187 60.2596 56.0897 56.0885C60.2607 51.9175 63.1011 46.6033 64.2519 40.8179C65.4026 35.0325 64.812 29.0358 62.5546 23.5861C60.2973 18.1365 56.4746 13.4785 51.57 10.2014C46.6654 6.92427 40.8992 5.17511 35.0004 5.17511C27.0932 5.18401 19.5123 8.32914 13.921 13.9205C8.32978 19.5118 5.18476 27.0927 5.17597 35ZM70 35C70 28.0776 67.9473 21.3107 64.1014 15.555C60.2556 9.79928 54.7893 5.31324 48.3938 2.66419C41.9984 0.0151364 34.961 -0.677955 28.1717 0.672562C21.3823 2.02308 15.1459 5.35655 10.2511 10.2514C5.35631 15.1463 2.02291 21.3827 0.672478 28.1721C-0.677956 34.9615 0.0152229 41.9988 2.66436 48.3942C5.31349 54.7896 9.79959 60.2559 15.5554 64.1016C21.3111 67.9474 28.0781 70.0001 35.0004 70C44.2798 69.9895 53.176 66.2986 59.7374 59.7371C66.2989 53.1756 69.9896 44.2793 70 35Z'
                    fill='#26B501'
                  />
                  <path
                    d='M31.5035 48.118L54.2187 25.4032C54.6875 24.9146 54.946 24.2617 54.9388 23.5847C54.9317 22.9076 54.6595 22.2604 54.1806 21.7817C53.7017 21.3031 53.0542 21.0313 52.3772 21.0245C51.7001 21.0178 51.0474 21.2767 50.5591 21.7457L29.6737 42.6294L19.3037 32.2585C19.0634 32.0182 18.7781 31.8275 18.4641 31.6974C18.1502 31.5674 17.8137 31.5004 17.4738 31.5004C17.134 31.5004 16.7974 31.5673 16.4834 31.6973C16.1695 31.8274 15.8841 32.018 15.6438 32.2583C15.4035 32.4986 15.2129 32.7838 15.0828 33.0978C14.9527 33.4118 14.8858 33.7483 14.8857 34.0882C14.8857 34.428 14.9526 34.7645 15.0827 35.0785C15.2127 35.3925 15.4033 35.6778 15.6436 35.9181L27.8435 48.118C28.0837 48.3584 28.369 48.549 28.683 48.6791C28.9971 48.8093 29.3336 48.8762 29.6735 48.8762C30.0134 48.8762 30.3499 48.8093 30.664 48.6791C30.978 48.549 31.2633 48.3584 31.5035 48.118Z'
                    fill='#26B501'
                  />
                </svg>
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='70'
                  height='70'
                  viewBox='0 0 70 70'
                  fill='none'>
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M35.0004 38.6597L24.6037 49.0569C24.1184 49.5421 23.4602 49.8148 22.7739 49.8148C22.0875 49.8148 21.4293 49.5421 20.944 49.0569C20.4587 48.5715 20.1861 47.9133 20.1861 47.227C20.1861 46.5407 20.4587 45.8825 20.944 45.3972L31.3404 35L20.944 24.6067C20.4587 24.1214 20.1861 23.4632 20.1861 22.7769C20.1861 22.0906 20.4587 21.4324 20.944 20.9471C21.4293 20.4618 22.0875 20.1891 22.7739 20.1891C23.4602 20.1891 24.1184 20.4618 24.6037 20.9471L35.0004 31.3404L45.3968 20.9471C45.6371 20.7068 45.9223 20.5162 46.2363 20.3862C46.5502 20.2562 46.8867 20.1892 47.2265 20.1893C47.5663 20.1893 47.9028 20.2562 48.2167 20.3863C48.5307 20.5164 48.8159 20.707 49.0562 20.9473C49.2965 21.1876 49.487 21.4728 49.6171 21.7868C49.7471 22.1007 49.814 22.4372 49.814 22.777C49.814 23.1168 49.747 23.4533 49.617 23.7673C49.4869 24.0812 49.2963 24.3664 49.056 24.6067L38.6597 35L49.056 45.3972C49.2963 45.6375 49.4869 45.9227 49.617 46.2366C49.747 46.5506 49.814 46.8871 49.814 47.2269C49.814 47.5667 49.7471 47.9032 49.6171 48.2171C49.487 48.5311 49.2965 48.8163 49.0562 49.0566C48.8159 49.2969 48.5307 49.4875 48.2167 49.6176C47.9028 49.7477 47.5663 49.8146 47.2265 49.8146C46.8867 49.8147 46.5502 49.7477 46.2363 49.6177C45.9223 49.4877 45.6371 49.2971 45.3968 49.0569L35.0004 38.6597ZM5.17597 35C5.17605 40.8987 6.9253 46.6649 10.2025 51.5695C13.4797 56.474 18.1377 60.2966 23.5874 62.5539C29.0371 64.8112 35.0338 65.4018 40.8192 64.2509C46.6045 63.1001 51.9187 60.2596 56.0897 56.0885C60.2607 51.9175 63.1011 46.6033 64.2519 40.8179C65.4026 35.0325 64.812 29.0358 62.5546 23.5861C60.2973 18.1365 56.4746 13.4785 51.57 10.2014C46.6654 6.92427 40.8991 5.17511 35.0004 5.17511C27.0932 5.18401 19.5123 8.32914 13.921 13.9205C8.32977 19.5118 5.18476 27.0927 5.17597 35ZM70 35C70 28.0776 67.9473 21.3107 64.1014 15.555C60.2555 9.79928 54.7893 5.31324 48.3938 2.66419C41.9984 0.0151363 34.961 -0.677955 28.1717 0.672562C21.3823 2.02308 15.1459 5.35655 10.2511 10.2514C5.3563 15.1463 2.02291 21.3828 0.672478 28.1721C-0.677956 34.9615 0.0152229 41.9988 2.66436 48.3942C5.31349 54.7896 9.79959 60.2559 15.5554 64.1017C21.3111 67.9474 28.0781 70.0001 35.0004 70C44.2797 69.9895 53.176 66.2986 59.7374 59.7371C66.2988 53.1756 69.9896 44.2793 70 35Z'
                    fill='#E31100'
                  />
                </svg>
              )}
            </Box>
            <Typography sx={{ fontSize: '18px' }}>Entrée Remorque</Typography>
            <Typography variant='h6' sx={{ fontSize: '18px' }}>
              {latestTruck?.plate_number || 'No plate number found'}
            </Typography>
            <Typography
              sx={{
                fontSize: '18px',
                mt: 4,
              }}>
              avec l’identifiant
            </Typography>
            <Typography variant='h6' sx={{ fontSize: '18px' }}>
              {latestTruck?.tag || 'No tag found'}
            </Typography>
          </Box>
        </Modal>
      </div>
    );
  };

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
                  Tag
                </Typography>
                <Typography sx={{ fontSize: '13px' }} variant='h6'>
                  {latestTruck?.tag || 'No tag'}
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
                  {latestTruck?.out_time
                    ? moment(latestTruck.out_time).format('lll')
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
                  {latestTruck?.out_time ? (
                    moment(latestTruck.out_time).format('LT')
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
            sx={{ height: '12vh', width: '100%' }}
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
                    justifyContent: 'space-between',
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    alignItems: 'center',
                  }}>
                  <Typography sx={{ fontSize: '13px', ml: 2 }} variant='h6'>
                    {latestTruck?.plate_number || 'No plate number found'}
                  </Typography>
                  <BasicModal />
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
                    justifyContent: 'space-between',
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                  }}>
                  <Typography sx={{ fontSize: '14px', ml: 2 }} variant='h6'>
                    {latestTruck?.tag || 'No tag found'}
                  </Typography>
                  <BasicModal />
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
      <title>Out put</title>
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
