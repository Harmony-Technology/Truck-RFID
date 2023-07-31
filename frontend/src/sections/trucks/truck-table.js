import {
  Box,
  Card,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Grid,
  Table,
  TableBody,
  Divider,
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { SeverityPill } from 'src/components/severity-pill';
import Image from 'next/image';
import { useState } from 'react';

export const TruckTable = (props) => {
  const { trucks = [], sx } = props;

  const [selected, setSelected] = useState({
    input: false,
    output: false,
  });

  const [showTotalTime, setShowTotalTime] = useState(true);

  const handleButtonClick = (buttonName) => {
    setSelected((prevState) => ({
      ...prevState,
      [buttonName]: !prevState[buttonName],
    }));

    // Toggle the "Total Time" cell visibility when "Input" button is clicked
    if (buttonName === 'input') {
      setShowTotalTime((prevShowTotalTime) => !prevShowTotalTime);
    }
  };

  return (
    <>
      <Grid
        container
        justifyContent='center'
        flexDirection='column'
        alignItems='center'
        display='flex'>
        <Grid
          item
          xs={12}
          sm={4}
          lg={4}
          sx={{
            width: '100%',
            borderRadius: '10px',
            bgcolor: '#fff',
            borderRadius: '10px',
            mb: 3,
          }}>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '5px',
              marginTop: '5px',
              gap: 5,
            }}>
            {/* <Button
              variant='contained'
              size='medium'
              sx={{
                'fontSize': '12px',

                'borderRadius': '10px',
                'color': '#AFAFB0',
                'bgcolor': '#F2F2F2',
                '&:hover': {
                  bgcolor: '#F9B700',
                  color: '#000',
                },
              }}>
              Filter
            </Button> */}

            <Button
              variant='contained'
              size='medium'
              sx={{
                'width': '30%',
                'margin': '5px',
                'margin': '5px',
                'height': '100%',
                'margin': '5px',
                'height': '100%',
                'borderRadius': '10px',
                'color': selected.input ? '#000' : '#AFAFB0',
                'bgcolor': selected.input ? '#F9B700' : '#F2F2F2',
                '&:hover': {
                  bgcolor: '#F9B700',
                  color: '#000',
                },
              }}
              onClick={() => handleButtonClick('input')}>
              In put
            </Button>

            <Button
              variant='contained'
              size='medium'
              sx={{
                'width': '30%',
                'margin': '5px',
                'margin': '5px',
                'height': '100%',
                'margin': '5px',
                'height': '100%',
                'borderRadius': '10px',
                'color': selected.output ? '#000' : '#AFAFB0',
                'bgcolor': selected.output ? '#F9B700' : '#F2F2F2',
                '&:hover': {
                  bgcolor: '#F9B700',
                  color: '#000',
                },
              }}
              onClick={() => handleButtonClick('output')}>
              Out put
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Card sx={sx}>
        <Scrollbar sx={{ flexGrow: 1 }}>
          <Box sx={{ minWidth: 800 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Plate Number</TableCell>
                  <TableCell>In Time</TableCell>
                  <TableCell>Out Time</TableCell>
                  <TableCell>Tag</TableCell>
                  <TableCell>Status</TableCell>
                  {selected.input && <TableCell>Waiting Time</TableCell>}
                  {selected.output && <TableCell>Total Time</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {trucks.map((truck) => {
                  return (
                    <TableRow hover key={truck.id}>
                      <TableCell
                        sx={{
                          alignItems: 'center',
                        }}>
                        <Image
                          src={truck.truck_image}
                          alt=''
                          width={80}
                          height={50}
                          style={
                            truck.status === 'Checked'
                              ? { border: '2px solid rgb(34 197 94);' }
                              : { border: '2px solid rgb(239 68 68);' }
                          }
                        />
                        <Image
                          src={truck.plate_image}
                          alt=''
                          width={80}
                          height={50}
                          style={{
                            marginLeft: '10px',
                          }}
                        />
                      </TableCell>

                      <TableCell>{truck.plate_number}</TableCell>
                      <TableCell>
                        {truck.in_time ? truck.in_time : '--/--/----'}
                      </TableCell>
                      <TableCell>
                        {truck.outtime ? truck.outtime : '--/--/----'}
                      </TableCell>
                      <TableCell>{truck.tag}</TableCell>
                      <TableCell>
                        <SeverityPill
                          color={
                            truck.status === 'Checked' ? 'success' : 'error'
                          }>
                          {truck.status}
                        </SeverityPill>
                      </TableCell>
                      {selected.input && (
                        <TableCell>{truck.waiting_time}</TableCell>
                      )}
                      {selected.output && (
                        <TableCell>{truck.total_time}</TableCell>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
        </Scrollbar>
        <Divider />
      </Card>
    </>
  );
};
