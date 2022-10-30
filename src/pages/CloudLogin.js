import { Helmet } from 'react-helmet-async';
import { Link, Container, Typography } from '@mui/material';
import React from "react";
import * as THREE from "three";
import CLOUDS from "vanta/dist/vanta.clouds.min";
import { styled } from '@mui/material/styles';
// components
import Logo from '../components/logo';
import Iconify from '../components/iconify';
// sections
import { LoginForm } from '../sections/auth/login';


const StyledRoot = styled('div')(({ theme }) => ({
[theme.breakpoints.up('md')]: {
  display: 'flex',
},
}));
  
  
const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));
  
  
  
class Clouds extends React.Component {
  constructor() {
    super();
    this.vantaRef = React.createRef();
  }

  componentDidMount() {
    this.vantaEffect = CLOUDS({
      el: this.vantaRef.current,
      THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 0xfff33f
    });
  }

  componentWillUnmount() {
    if (this.vantaEffect) {
      this.vantaEffect.destroy();
    }
  }
 
  render() {
  
    return (
      
    <div style={{ height: "100vh", width: "100%" }} ref={this.vantaRef}>
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


        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Sign in to Smart Education
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              Don't have an account? {''}
              <Link variant="subtitle2" href='./register'>Get started</Link>
            </Typography>
        
            <LoginForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </div>
        
    );
  }
}
export default Clouds;