import { useState, React } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Box, Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';


// ----------------------------------------------------------------------


export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    // navigate('/dashboard', {replace: true});
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    submitHandler(data.get('email'), data.get('password'));
  };

  const submitHandler = (email, password) => {

    if (email.trim().length === 0 || password.trim().length === 0) {

      return;
    }


    const requestBody = {
      query: `
            query{
                studentLogin(loginInput:{
                  email: "${email}",
                  password: "${password}"
                }){
                  id
                  token
                }
              }
            `,
    };

    fetch('http://localhost:8080/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
      },

    })
      .then(
        (res) => {
          if (res.status !== 200 && res.status !== 201) {
            throw new Error('Failed!!');
          }
          return res.json();
        },
      )
      .then((resData) => {
        console.log(resData);
      })
      .catch((err) => {
        console.log(err);
      });

  };

  return (
    <>
      <Stack spacing={3}>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField name='email' required autoFocus
                     margin='normal'
                     fullWidth label='Email address'  />

          <TextField
            name='password'
            label='Password'
            type={showPassword ? 'text' : 'password'}
            margin='normal'
            required
            fullWidth
            autoFocus
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge='end'>
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{ my: 2 }}>
            <Checkbox name='remember' label='Remember me' />
            <Link variant='subtitle2' underline='hover'>
              Forgot password?
            </Link>
          </Stack>

          <LoadingButton fullWidth size='large' type='submit' variant='contained' >
            Login
          </LoadingButton>
        </Box>

      </Stack>


    </>
  );
}


