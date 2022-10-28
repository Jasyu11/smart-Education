import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider ,styled} from '@mui/material/styles';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Logo from '../components/logo';





const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));


const theme = createTheme();

function Register() {
  const [identity, setIdentity] = React.useState('');
  const navigate = useNavigate();
  const handleChange = (event) => {
    setIdentity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
      username: data.get('username'),
      repassword: data.get('repassword'),
      identity: data.get('identity'),
    });
    submitHandler(data.get('email'), data.get('password'),data.get('username'),data.get('repassword'),data.get('identity'))
  };

  const submitHandler = (email, password, username, repassword, identity) => {
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

    let requestBody = '';
    if(identity === 'Student'){
      requestBody = {
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
    }else if (identity === 'Teacher'){
      requestBody = {
        query: `mutation{
                  createTeacher(userInput:{
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
    }
     

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
      console.log(email);
      console.log(password);
      console.log(resData);
      console.log(identity);
      if(identity === 'Teacher'){
        sessionStorage.setItem('usertype', 'Teacher');
        sessionStorage.setItem('userid', resData.data.createStudent.id);
      }else if(identity === 'Student'){
        sessionStorage.setItem('usertype', 'Student');
        sessionStorage.setItem('userid', resData.data.createTeacher.id);
      }
      
      navigate('/dashboard', {replace: true});
    }).catch((err) => {
      console.log(err);
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
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h4">
            Register
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="repassword"
              label="Re-enter Password"
              type="password"
              id="repassword"
              autoComplete="repassword"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="username"
              label="Username"
              type="username"
              id="username"
              autoComplete="username"
            />
            <br />
            <br />
            <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Identity</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name='identity'
                      value={identity}
                      label="Identity"
                      onChange={handleChange}
                      required
                    >
                      <MenuItem value={'Student'}>Student</MenuItem>
                      <MenuItem value={'Teacher'}>Teacher</MenuItem>

                    </Select>
                  </FormControl>
                </Box>
            <br />
            <br />
            <Button fullWidth size="large" type="submit" variant="contained">
              Register
            </Button>
          </Box>
        </Box>

                
      </Container>
    </ThemeProvider>
  );
}

export default Register;
