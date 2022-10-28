import { useState, React } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Box, Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import Iconify from '../../../components/iconify';
// ---------------------------------------------------------------------


export default function LoginForm() {
  const [identity, setIdentity] = useState('');

  const handleChange = (event) => {
    setIdentity(event.target.value);
  };
  
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    // navigate('/dashboard', {replace: true});
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    submitHandler(data.get('email'), data.get('password'),data.get('identity'));
    
  };

  let requestBody = '';
  const submitHandler = (email, password, identity) => {
    console.log(identity);
    if (email.trim().length === 0 || password.trim().length === 0) {

      return;
    }
    if (identity ==='Student'){
       requestBody = {
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
    }else{
      requestBody = {
        query: `
              query{
                  teacherLogin(loginInput:{
                    email: "${email}",
                    password: "${password}"
                  }){
                    id
                    token
                  }
                }
              `,
      };
    }

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
        sessionStorage.setItem("usertype", identity)
        if(identity === 'Student'){
          sessionStorage.setItem("userid", resData.data.studentLogin.id);
        }else if(identity === 'Teacher'){
          sessionStorage.setItem("userid", resData.data.teacherLogin.id);
        }
        
        navigate('/dashboard', {replace: true});
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
              <br/>
              <br/>
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

          <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{ my: 2 }}>
          <FormGroup>
            <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" />
          </FormGroup>
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


