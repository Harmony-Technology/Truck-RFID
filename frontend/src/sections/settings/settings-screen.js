import {
  Box,
  Typography,
  Stack,
  Button,
  Unstable_Grid2 as Grid,
  Avatar,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { updateUser } from '@/api/update-user';
import { getUser } from '@/api/get-user';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

export const SettingsScreen = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const { data: session } = useSession();
  const id = session?.user?.user_id;

  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      const data = await getUser();
      setUser(data);
    };
    getUserData();
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      first_name: session?.user?.first_name,
      last_name: session?.user?.last_name,
      username: session?.user?.username,
      email: session?.user?.email,
      phone: session?.user?.phone,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Must be a valid email')
        .max(255)
        .required('Email field must not be empty'),
      phone: Yup.number()
        .typeError('Must be a number')
        .required('Phone number field must not be empty'),
      first_name: Yup.string().required('First name field must not be empty'),
      last_name: Yup.string().required('Last name field must not be empty'),
      username: Yup.string().required('Username field must not be empty'),
    }),
    onSubmit: async (values) => {
      try {
        await updateUser(id, values);
        Swal.fire({
          icon: 'success',
          title: 'Your profile has been updated!',
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        setErrorMessage(error.message);
      }
    },
  });

  const restoreDefaults = () => {
    formik.setValues({
      first_name: session?.user?.first_name,
      last_name: session?.user?.last_name,
      username: session?.user?.username,
      email: session?.user?.email,
      phone: session?.user?.phone,
    });
  };

  return (
    <>
      {/* <form noValidate onSubmit={formik.handleSubmit}> */}

      <Box
        sx={{
          p: 2,
          display: 'flex',
          bgcolor: '#F0F1F6',
          height: '100%',
          width: '100%',
          overflowY: 'hidden',
        }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            bgcolor: '#fff',
            borderRadius: '10px',
          }}>
          <Grid
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '97%',
              height: '97%',
              borderRadius: '10px',
              border: '1px solid #E0E0E0',
            }}>
            <Grid>
              <Typography
                sx={{
                  marginLeft: '40px',
                  marginTop: '50px',
                  fontWeight: 'bold',
                  marginBottom: '20px',
                }}>
                Photo :
              </Typography>
              <Grid xs={12} sm={6} lg={3}>
                <Stack
                  direction='row'
                  spacing={2}
                  sx={{
                    marginLeft: '40px',
                    marginBottom: '20px',
                  }}>
                  <Avatar
                    alt='Remy Sharp'
                    src={user?.image}
                    sx={{ width: 70, height: 70 }}
                  />
                  <Stack direction='row' alignItems='center'>
                    <Button
                      type='file'
                      variant='contained'
                      sx={{
                        'width': '150px',
                        'height': '40px',
                        'backgroundColor': '#111C43',
                        'color': '#fff',
                        'borderTopRightRadius': '0px',
                        'borderBottomRightRadius': '0px',
                        '&:hover': {
                          backgroundColor: '#111C43',
                          color: '#fff',
                          border: '1px solid #E0E0E0',
                        },
                      }}>
                      Upload
                    </Button>
                    <Button
                      variant='contained'
                      sx={{
                        'width': '150px',
                        'height': '40px',
                        'backgroundColor': '#F3F6F8',
                        'color': '#000',
                        'border': '1px solid #E0E0E0',
                        'borderTopLeftRadius': '0px',
                        'borderBottomLeftRadius': '0px',
                        '&:hover': {
                          backgroundColor: '#F3F6F8',
                          color: '#000',
                          border: '1px solid #E0E0E0',
                        },
                      }}>
                      Remove
                    </Button>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                margin: '50px',
                display: 'grid',
              }}>
              <Typography
                sx={{
                  fontWeight: 'bold',
                }}>
                Profile :
              </Typography>

              <Stack
                direction={'column'}
                container
                spacing={2}
                xs={12}
                sm={6}
                lg={6}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                  borderRadius: '12px',
                  height: '100%',
                  width: '100%',
                }}>
                <Grid
                  xs={12}
                  sm={6}
                  lg={6}
                  spacing={2}
                  sx={{
                    width: '100%',
                  }}>
                  <Typography
                    sx={{
                      marginTop: '10px',
                    }}>
                    <label for='fname'>First name:</label>
                  </Typography>
                  <TextField
                    name='first_name'
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.first_name}
                    helperText={
                      formik.touched.first_name && formik.errors.first_name
                    }
                    error={
                      !!(formik.touched.first_name && formik.errors.first_name)
                    }
                    id='outlined-basic'
                    variant='outlined'
                    sx={{
                      width: '800px',
                      height: '40px',
                      marginBottom: '20px',
                    }}
                  />
                </Grid>
                <Grid sx={12}>
                  <Typography
                    sx={{
                      marginTop: '10px',
                    }}>
                    <label for='fname'>Last name:</label>
                  </Typography>
                  <TextField
                    name='last_name'
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.last_name}
                    helperText={
                      formik.touched.last_name && formik.errors.last_name
                    }
                    error={
                      !!(formik.touched.last_name && formik.errors.last_name)
                    }
                    id='outlined-basic '
                    variant='outlined'
                    sx={{
                      width: '800px',
                      height: '40px',
                      marginBottom: '20px',
                    }}
                  />
                </Grid>
                <Grid sx={12}>
                  <Typography
                    sx={{
                      marginTop: '10px',
                    }}>
                    <label for='fname'>User Name</label>
                  </Typography>
                  <TextField
                    name='username'
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    helperText={
                      formik.touched.username && formik.errors.username
                    }
                    error={
                      !!(formik.touched.username && formik.errors.username)
                    }
                    id='outlined-basic '
                    variant='outlined'
                    sx={{
                      width: '800px',
                      height: '40px',
                      marginBottom: '20px',
                    }}
                  />
                </Grid>
              </Stack>
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                margin: '50px',
                display: 'grid',
              }}>
              <Typography
                sx={{
                  fontWeight: 'bold',
                }}>
                Personal information :
              </Typography>

              <Stack
                direction={'column'}
                container
                spacing={2}
                xs={12}
                sm={6}
                lg={6}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                  borderRadius: '12px',
                  height: '100%',
                  width: '100%',
                }}>
                <Grid
                  xs={12}
                  sm={6}
                  lg={6}
                  spacing={2}
                  sx={{
                    width: '100%',
                  }}>
                  <Typography
                    sx={{
                      marginTop: '10px',
                    }}>
                    <label for='fname'>Email Address :</label>
                  </Typography>
                  <TextField
                    name='email'
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    helperText={formik.touched.email && formik.errors.email}
                    error={!!(formik.touched.email && formik.errors.email)}
                    id='outlined-basic'
                    variant='outlined'
                    sx={{
                      width: '800px',
                      height: '40px',
                      marginBottom: '20px',
                    }}
                  />
                </Grid>
                <Grid sx={12}>
                  <Typography
                    sx={{
                      marginTop: '10px',
                    }}>
                    <label for='fname'>Contact Details :</label>
                  </Typography>
                  <TextField
                    name='phone'
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                    helperText={formik.touched.phone && formik.errors.phone}
                    error={!!(formik.touched.phone && formik.errors.phone)}
                    id='outlined-basic '
                    variant='outlined'
                    sx={{
                      width: '800px',
                      height: '40px',
                      marginBottom: '20px',
                    }}
                  />
                </Grid>
              </Stack>
              <Stack
                direction={'row'}
                spacing={2}
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  borderRadius: '12px',
                  height: '100%',
                  width: '100%',
                }}>
                <Button
                  onClick={restoreDefaults}
                  variant='contained'
                  sx={{
                    'width': '150px',
                    'height': '40px',
                    'backgroundColor': '#111C43',
                    'color': '#fff',
                    'border': '1px solid #E0E0E0',
                    '&:hover': {
                      backgroundColor: '#111C43',
                      color: '#fff',
                      border: '1px solid #E0E0E0',
                    },
                  }}>
                  Restore Defaults
                </Button>
                <Button
                  variant='contained'
                  sx={{
                    'width': '150px',
                    'height': '40px',
                    'backgroundColor': '#F3F6F8',
                    'color': '#000',
                    'border': '1px solid #E0E0E0',
                    '&:hover': {
                      backgroundColor: '#F3F6F8',
                      color: '#000',
                      border: '1px solid #E0E0E0',
                    },
                  }}
                  type='submit'
                  onClick={formik.handleSubmit}>
                  Save Changes
                </Button>
                {errorMessage && (
                  <Typography color='error' sx={{ mt: 3 }} variant='body2'>
                    {errorMessage}
                  </Typography>
                )}
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {/* </form> */}
    </>
  );
};
