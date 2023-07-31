import Head from 'next/head';
import {
  Box,
  Container,
  Unstable_Grid2 as Grid,
  Pagination,
  CircularProgress,
  Typography,
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { TruckCard } from 'src/sections/trucks/truck-card';
import { TruckTable } from 'src/sections/trucks/truck-table';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import SplashScreen from '@/components/splashscreen';
import { getTrucks } from '@/api/get-trucks';
import { getUsersCount } from '@/api/get-user-count';
import moment from 'moment';

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({
    inputCount: 0,
    outputCount: 0,
    trucksCount: 0,
  });

  const [trucks, setTrucks] = useState(null);
  const [usersCount, setUsersCount] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchUsersCount = async () => {
      const fetchedData = await getUsersCount();
      setUsersCount(fetchedData.count_user);
    };
    fetchUsersCount();
  }, []);

  const fetchTrucks = async (page) => {
    const fetchedData = await getTrucks(page, itemsPerPage);
    // console.log(fetchedData);

    setData({
      inputCount: fetchedData.input_count,
      outputCount: fetchedData.output_count,
      trucksCount: fetchedData.truck_count,
    });
    setTrucks(fetchedData.data);
  };

  useEffect(() => {
    fetchTrucks(currentPage).then(() => {
      setIsLoading(false); // Set loading to false once initial data is fetched
    });

    const interval = setInterval(() => {
      fetchTrucks(currentPage);
    }, 1000);
    return () => clearInterval(interval);
  }, [currentPage]);

  const handlePaginationChange = async (event, newPage) => {
    setCurrentPage(newPage);
    await fetchTrucks(newPage);
  };
  const router = useRouter();
  const { data: session, status } = useSession();
  useEffect(() => {
    const checkUserRoleAndRedirect = async () => {
      if (session?.role === 'client' && router.pathname === '/') {
        await router.push('/input');
      }
      setIsLoading(false);
    };

    if (status === 'authenticated') {
      checkUserRoleAndRedirect();
    }
  }, [session, router, status]);

  if (status === 'loading' || isLoading) {
    return <SplashScreen />;
  }

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 8,
          bgcolor: '#F0F1F6',
        }}>
        <Container maxWidth='xl'>
          <Grid container spacing={0}>
            <Container
              maxWidth='xl'
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 5,
                borderRadius: '12px',
                height: '100%',
              }}>
              <Grid
                item
                container
                spacing={2}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  borderRadius: '12px',
                  height: '100%',
                  width: '100%',
                }}>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  lg={3}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    borderRadius: '12px',
                    height: '100%',
                    width: '100%',
                  }}>
                  <TruckCard
                    sx={{ height: '100%' }}
                    name='Total Users'
                    value={usersCount}
                    image='/user.png'
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  lg={3}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    borderRadius: '12px',
                    height: '100%',
                    width: '100%',
                  }}>
                  <TruckCard
                    sx={{ height: '100%' }}
                    name='Total Trucks'
                    value={data?.trucksCount}
                    image='/truck.png'
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  lg={3}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    borderRadius: '12px',
                    height: '100%',
                    width: '100%',
                  }}>
                  <TruckCard
                    sx={{ height: '100%' }}
                    name='Inputs'
                    value={data?.inputCount}
                    image='/input.png'
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  lg={3}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    borderRadius: '12px',
                    height: '100%',
                    width: '100%',
                  }}>
                  <TruckCard
                    sx={{ height: '100%' }}
                    name='Outputs'
                    value={data?.outputCount}
                    image='/output.png'
                  />
                </Grid>
              </Grid>
            </Container>
            <Grid item xs={12} md={12} lg={12}>
              {/* {trucks !== null && ( */}
              {trucks?.length > 0 ? (
                <TruckTable
                  trucks={trucks.map((truck) => {
                    const outTime = truck.out_time
                      ? moment(truck.out_time).format('lll')
                      : '--/--/----';
                    const status =
                      truck.statut === 'checked' ? 'Checked' : 'Not Checked';

                    const plate_image = truck.plate_image
                      ? truck.plate_image
                      : '/id.png';
                    const truck_image = truck.truck_image
                      ? truck.truck_image
                      : '/truck.png';

                    return {
                      plate_number: truck.plate_number,
                      in_time: moment(truck.in_time).format('lll'),
                      outtime: outTime,
                      truck_image: truck_image,
                      plate_image: plate_image,
                      status: status,

                      tag: truck.tag,
                      waiting_time: truck.out_time
                        ? 'Done'
                        : moment(truck.in_time).fromNow(),

                      total_time: truck.out_time
                        ? moment(truck.out_time)
                            .diff(truck.in_time, 'days', true)
                            .toFixed(0) >= 1
                          ? `${moment(truck.out_time)
                              .diff(truck.in_time, 'days', true)
                              .toFixed(0)} days`
                          : moment(truck.out_time).diff(
                              truck.in_time,
                              'hours',
                              true
                            ) >= 1
                          ? `${moment(truck.out_time)
                              .diff(truck.in_time, 'hours', true)
                              .toFixed(0)} hours`
                          : `${
                              moment(truck.out_time).diff(
                                truck.in_time,
                                'minutes',
                                true
                              ) >= 1
                                ? `${moment(truck.out_time)
                                    .diff(truck.in_time, 'minutes', true)
                                    .toFixed(0)} minutes`
                                : 'Less than a minute'
                            }`
                        : 'Not out yet',
                    };
                  })}
                  sx={{ height: '100%' }}
                />
              ) : isLoading ? (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    mb: 30,
                  }}>
                  <CircularProgress />
                </Box>
              ) : (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    mb: 30,
                  }}>
                  <Typography variant='h6'>No trucks found</Typography>
                </Box>
              )}
            </Grid>
            <Pagination
              count={Math.ceil(data?.trucksCount / itemsPerPage)}
              page={currentPage}
              onChange={handlePaginationChange}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mt: 3,
              }}></Pagination>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
