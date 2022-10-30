import React,{ useEffect, useState } from 'react'

import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link, useNavigate} from "react-router-dom";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Label from '../components/label/Label';
import url from '../utils/weburl';


function Profile() {
  const [amount, setAmount] = useState();
  const [open, setOpen] = useState(false);
    const [Username,setUsername] = useState("");
    const [Email,setEmail] = useState("");
    const [Balance,setBalance] = useState("");
    const [courseData,setCourseData] = useState([]);
  const navigate = useNavigate();
  const Getprofile=(initState = [])=>{
    
    
    // const [Data, setData] = useState(initState);
    
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
  
      let RequestBody = "";
      if(sessionStorage.getItem('usertype') === 'Student'){
        const id = sessionStorage.getItem("userid");
  
        RequestBody = {
          query:`query{
                  studentInformation(studentId: ${id}){
                      id
                      user_name
                      user_email
                      balance
                      url
                      enrolledCourses{
                        id
                        course_name
                        teacher{
                          user_name
                        }
                        price
                    }
                }}`,
        };
      }else if (sessionStorage.getItem('usertype') === 'Teacher'){
        const id = sessionStorage.getItem("userid");
  
        RequestBody = {
          query:`query{
                  teacherInformation(teacherId: ${id}){
                      id
                      user_name
                      user_email
                      balance
                      url
                      createdCourses{
                        id
                        course_name
                        price
                    }
                }}`,
        };
      }
      
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(RequestBody),
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
          if(sessionStorage.getItem('usertype') ==='Student'){
            setUsername(resData.data.studentInformation.user_name);
            setEmail(resData.data.studentInformation.user_email);
            setBalance(resData.data.studentInformation.balance);
            setCourseData(resData.data.studentInformation.enrolledCourses);
          }else if(sessionStorage.getItem('usertype')==='Teacher'){
            setUsername(resData.data.teacherInformation.user_name);
            setEmail(resData.data.teacherInformation.user_email);
            setBalance(resData.data.teacherInformation.balance);
            setCourseData(resData.data.teacherInformation.enrolledCourses);
          }
          console.log(Username);
          console.log(Email);
          console.log(Balance);
          console.log(courseData);
        })
        .catch((err) => {
          console.log(err);
        });
  
    }, [])
  
    const Data ={
      name: Username,
      email: Email,
      balance: Balance,
      courses: courseData
    };

    return Data;
  }

  // const data = Getprofile();
  
  
  const changeAmount = (event) => {
    setAmount(parseFloat(event.target.value));
    console.log(amount);
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Recharge = (event) => {
    const id = sessionStorage.getItem("userid");
    
    console.log(amount);
    const requestBody = {
      query:`
        mutation{
          recharge(studentId:${id}, amount:${amount}){
            balance
          }
        }
      `
    };
    fetch(url, {
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
        setBalance(resData.data.recharge.balance);
      })
      .catch((err) => {
        console.log(err);
      });
      setOpen(false);
  }


  return (
    <Container>
      <Typography
        variant='h3'
        color='primary'
        gutterBottom
      >
        Profile
      </Typography>
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
        
        <Label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span">
            <Link to="/dashboard/creatingavatar">Creating Avatar</Link> 
            </Button>
        </Label>

        <Label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span">
              Upload Icon
              
            </Button>
        </Label>

        
        <Button variant="outlined" onClick={handleClickOpen}>Recharge</Button>

        <div>
            <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Subscribe</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To recharge your account, please enter your card number and amount here. 
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                name="card"
                label="Card Number"
                type="text"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                margin="dense"
                id="amount"
                name="amount"
                label="Amount"
                type="number"
                fullWidth
                variant="standard"
                onChange={(e)=>changeAmount(e)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={Recharge}>Recharge</Button>
            </DialogActions>
          </Dialog>
        </div>

                <Typography variant="body1" color="text.secondary"
                    style={{
                        position: "absolute",
                        left: `400px`,
                        top: `130px`,
                      }}>
                  {Getprofile().name}
                  </Typography>
                <Typography variant="body1" color="text.secondary" style={{
                        position: "absolute",
                        left: `400px`,
                        top: `150px`,
                      }}>
                  {Getprofile().email}
                  </Typography>
                <Typography variant="body1" color="text.secondary" style={{
                        position: "absolute",
                        left: `400px`,
                        top: `170px`,
                      }}>
                  $ {Balance}
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
      
        <br/>
      
      <br/>

    </Container>
  );
}

export default Profile;