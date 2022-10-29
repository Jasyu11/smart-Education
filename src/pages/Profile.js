import React,{ useEffect, useState } from 'react'
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
import { Controller } from 'react-hook-form';
import {Link} from "react-router-dom";
import Label from '../components/label/Label';
import url from '../utils/weburl';

function Profile() {
  const Getprofile=(initState = [])=>{
    // var Data ={
    //   name: '',
    //   email: '',
    //   balance: '',
    //   courseData: []
    // };
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const theme = createTheme();
    const [Username,setUsername] = useState("");
    const [Email,setEmail] = useState("");
    const [Balance,setBalance] = useState("");
    const [courseData,setCourseData] = useState(initState);
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

  const data = Getprofile();

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

        
        <Button href="./EditProfile">Update Profile</Button>
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
                  $ {Getprofile().balance}
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