import React from 'react'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { FormControl, IconButton } from '@mui/material'
import Avatar from '@mui/material/Avatar';
import { green,red } from '@mui/material/colors';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
//import NavBar from "./NavBar";
import { Controller } from 'react-hook-form'



const theme = createTheme();



function Profile() {
  return (
    <Container>
      <Typography
        variant='h3'
        color='primary'
        gutterBottom
      >
        Profile
      </Typography>
      <NavBar />
      <div className="user_detail">
        <CardMedia
                component="img"
                height="100"
                image=" "
                alt=" "
                />
        <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        id="contained-button-file"
        />
        <FormControl>
        <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span">
              Upload Icon
            </Button>
        </label>
        </FormControl>
        <Button href="./EditProfile">Update Profile</Button>
                <Typography variant="body1" color="text.secondary"
                    style={{
                        position: "absolute",
                        left: `400px`,
                        top: `130px`,
                      }}>
                  User nickname
                  </Typography>
                <Typography variant="body1" color="text.secondary" style={{
                        position: "absolute",
                        left: `400px`,
                        top: `150px`,
                      }}>
                  Username
                  </Typography>
                <Typography variant="body1" color="text.secondary" style={{
                        position: "absolute",
                        left: `400px`,
                        top: `170px`,
                      }}>
                  Email Address
                  </Typography>
        </div>

      <Card>
          <CardContent>
          <Typography variant="body1" color="text.secondary">
          User self introduction
          </Typography>
          </CardContent>
      </Card>
      <br/>
      <Card>
        <CardHeader
          title =  'Followed Game'
          />
          <div className="game-icons">
            <CardMedia
            component="img"
            height="50"
            image=" "
            alt=" "
            />
            <CardMedia
            component="img"
            height="50"
            image=" "
            alt=" "
            />
            <CardMedia
            component="img"
            height="50"
            image=" "
            alt=" "
            />
            <CardMedia
            component="img"
            height="50"
            image=" "
            alt=" "
            />
            </div>
      </Card>
        <br/>
      
      <br/>

    </Container>
  );
}

export default Profile;