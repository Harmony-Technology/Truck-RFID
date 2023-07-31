import {
  Box,
  Typography,
  Paper,
  Stack,
  Unstable_Grid2 as Grid,
  Pagination,
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { React, useState, useEffect } from 'react';
import { getTrucks } from '@/api/get-trucks';
import moment from 'moment';

export const TruckTableInput = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [trucks, setTrucks] = useState([]);
  const [data, setData] = useState({
    trucksCount: 0,
  });

  const fetchTrucks = async (page) => {
    const fetchedData = await getTrucks(page, itemsPerPage);
    setData({
      trucksCount: fetchedData.truck_count,
    });
    setTrucks(fetchedData.data);
  };

  useEffect(() => {
    fetchTrucks(currentPage);
  }, [currentPage]);

  const handlePaginationChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const sortedTrucks = trucks.slice().sort((a, b) => {
    return new Date(a.in_time) - new Date(b.in_time);
  });
  return (
    <>
      <Grid item xs={12} md={12} lg={12}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}>
          <Paper elevation={1} sx={{ width: '100%', p: '20px' }}>
            <Stack
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}>
              <Typography variant='h6'>Input Data</Typography>
            </Stack>
            <TableContainer sx={{ pt: '20px' }} component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant='body1' fontWeight='bold'>
                        Tag
                      </Typography>
                    </TableCell>
                    <TableCell align='right'>
                      <Typography variant='body1' fontWeight='bold'>
                        Plate N
                      </Typography>
                    </TableCell>
                    <TableCell align='right'>
                      <Typography variant='body1' fontWeight='bold'>
                        In Time
                      </Typography>
                    </TableCell>
                    <TableCell align='right'></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {trucks?.length > 0 ? (
                    trucks.map((row) => ( */}
                  {sortedTrucks?.length > 0 ? (
                    sortedTrucks.map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}>
                        <TableCell component='th' scope='row'>
                          {row.tag}
                        </TableCell>
                        <TableCell align='right'>{row.plate_number}</TableCell>
                        <TableCell align='right'>
                          {moment(row.in_time).format('DD/MM/YYYY HH:mm A')}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align='center'>
                        <Typography variant='body1'>
                          No data available
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <Pagination
              sx={{ pt: '20px' }}
              count={Math.ceil(data?.trucksCount / itemsPerPage)}
              page={currentPage}
              onChange={handlePaginationChange}
            />
          </Paper>
        </Box>
      </Grid>
    </>
  );
};
