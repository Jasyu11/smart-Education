import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { Helmet } from 'react-helmet-async';
import { LoadingButton } from '@mui/lab';
import Logo from '../components/logo';


const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));


const theme = createTheme();

function Register() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    submitHandler(data.get('email'), data.get('password'),data.get('username'),data.get('repassword'))
  };

  const submitHandler = (email, password, username, repassword) => {
    console.log(email);
    console.log(password);
    if (email.trim().length === 0 || password.trim().length === 0
      || username.trim().length === 0 || repassword.trim().length === 0) {
      return;
    }
    if (password !== repassword) {
      console.log('The password you input twice are different!');
      return;
    }
    const requestBody = {
      query: `mutation{
                createStudent(userInput:{
                  user_email: "${email}"
                  user_name: "${username}"
                  password: "${password}"
                }){
                  id
                  user_email
                  user_name
                  balance
                  }
             }`,
    };

    fetch(
      'http://localhost:8080/graphql', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(
      (res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!!');
        }
        return res.json();
      },
    ).then((resData) => {
      console.log(resData.data.studentLogin.id);
    }).catch((err) => {
    })

  };

  return (
    <ThemeProvider theme={theme}>
      <Helmet>
        <title> Login | Smart Education </title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />
      </StyledRoot>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component='h1' variant='h4'>
            Register
          </Typography>
          <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='repassword'
              label='Re-enter Password'
              type='password'
              id='repassword'
              autoComplete='repassword'
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='username'
              label='Username'
              type='username'
              id='username'
              autoComplete='username'
            />
            <br />
            <br />
            <LoadingButton fullWidth size='large' type='submit' variant='contained'>
              Register
            </LoadingButton>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Register;