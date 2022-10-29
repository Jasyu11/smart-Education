import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, TextField,  } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { styled } from '@mui/material/styles';
import useResponsive from '../hooks/useResponsive';
import Logo from '../components/logo';
import url from '../utils/weburl';




const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 400,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));


export default function CreateDis() {

  const navigate = useNavigate();

  const backDiscussion = () => {
    navigate('/coursepage/Discussion', {replace: true});
  }

  const [details, setDetails] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    const courseid = sessionStorage.getItem("courseid");
    const type = sessionStorage.getItem("usertype");
    const userid = sessionStorage.getItem("userid")
    let studentid;
    let teacherid;
    if (type === "Student"){
      studentid = userid;
      teacherid = null;
    }else {
      studentid = null;
      teacherid = userid;
    }

    const requestBody = {
        query:`mutation{
                addDiscussion(discussionInput:{
                  studentId: ${studentid}
                  teacherId: ${teacherid}
                  content: "${details}"
                  courseId: ${courseid}
                }){
                  id
                }
              }`,
    }

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
        backDiscussion()
        console.log(details);
      })
      .catch((err) => {
        console.log(err);
      });

  }
  return (
    <>
    <Helmet>
        <title> Smart Education | Discussion </title>
      </Helmet>

      <StyledRoot>

    <Container size="sm">
      <Typography
        variant="h3" 
        component="h2"
        gutterBottom
        sx={{marginTop: 3, marginBottom: 3, display: 'block'}}
      >
        Create a New Discussion
      </Typography>
      
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField sx={{marginTop: 3, marginBottom: 3, display: 'block'}}
          onChange={(e) => setDetails(e.target.value)}
          label="Type Here"
          variant="outlined"
          color="secondary"
          multiline
          rows={15}
          fullWidth
          required
        />


        <Button
          type="submit"
          color="secondary"
          variant="contained"
          >
          Submit
        </Button>
        <Button
          sx={{marginLeft:5}}
          type="submit"
          color="secondary"
          variant="contained"
          onClick={backDiscussion}
        >
          Back
        </Button>
      </form>
    </Container>
    </StyledRoot>
    </>
  )
}