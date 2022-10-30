import { Helmet } from 'react-helmet-async';
import React, { Component,useEffect } from 'react';
// import { Player } from 'video-react';
import ReactPlayer from "react-player";
// import { Form, FormGroup, Label, Input } from 'reactstrap';

// @mui
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import Showme from '../components/showme/showme';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Divider from '@mui/material/Divider';
import useResponsive from '../hooks/useResponsive';
import Iconify from '../components/iconify';
// import Logo from '../components/logo';
// import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';
// import POSTS from '../_mock/blog';
import url from '../utils/weburl';



// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------
const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 600,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));



export default function BlogPage() {
  const mdUp = useResponsive('up', 'md');
  const [expanded, setExpanded] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState();
  const [URL, setURL] = React.useState();
  const courseId = sessionStorage.getItem("courseid");
  const [materialList, setMaterialList] = React.useState([]);
  function Getmaterial(){
    const RequestBody = {
      query: `
        query{
          materials(courseId:${courseId}){
            id
            url
            title
          }
        }
    `
    };
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
        console.log(resData);
        setMaterialList(resData.data.materials);

      })
      .catch((err) => {
        console.log(err);
      });

  }
  useEffect(() => {
    Getmaterial();
        // const RequestBody = {
        //   query: `
        //     query{
        //       materials(courseId:${courseId}){
        //         id
        //         url
        //         title
        //       }
        //     }
        // `
        // };
        // fetch(url, {
        //   method: 'POST',
        //   body: JSON.stringify(RequestBody),
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
  
        // })
        //   .then(
        //     (res) => {
        //       if (res.status !== 200 && res.status !== 201) {
        //         throw new Error('Failed!!');
        //       }
        //       return res.json();
        //     },
        //   )
        //   .then((resData) => {
        //     console.log(resData);
        //     setMaterialList(resData.data.materials);
  
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });
  
      },[])

  const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
  };

  const changeTitle = (event) => {
    setTitle(event.target.value);
  }

  const changeURL = (event) => {
    setURL(event.target.value);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const CreateMaterial = () =>{
    const requestBody = {
      query: `
        mutation{
          createMaterial(learningMaterialInput:{
            url: "${URL}"
            title: "${title}"
            courseId: ${courseId}
          }){
            id
            url
            title
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
        Getmaterial();
      })
      .catch((err) => {
        console.log(err);
      });

      setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    
    <>
      <Helmet>
        <title> Smart Education | Learning </title>
      </Helmet>

      <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h4" gutterBottom>
            Learning Material
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" /> } onClick={handleClickOpen}>
            New Video
          </Button>
        </Stack>

       <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Upload</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To upload your Learning Video, please enter your video address here. 
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            name='title'
            label="Title"
            type="name"
            fullWidth
            variant="standard"
            onChange={changeTitle}
          />
          <TextField
            autoFocus
            margin="dense"
            id="url"
            name='url'
            label="URL"
            type="url"
            fullWidth
            variant="standard"
            onChange={changeURL}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={CreateMaterial}>Upload</Button>
        </DialogActions>
      </Dialog>

        <Grid container spacing={2}>
        {materialList.map(item =>{
            return <div style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
                      <Accordion expanded={expanded === item.id} onChange={handleChange(item.id)}>
                        <AccordionSummary
                          // expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1bh-content"
                          id="panel1bh-header"
                        >
                          <Typography sx={{ width: '33%', flexShrink: 0 }}>
                          {item.title}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ReactPlayer 
                              controls 
                              url = {item.url}
                              onReady={() => console.log("onReady callback")}
                              onStart={() => console.log("onStart callback")}
                              onPause={() => console.log("onPause callback")}
                              onEnded={() => console.log("onEnded callback")}
                              onError={() => console.log("onError callback")}
                            />
                        </AccordionDetails>
                      </Accordion>
                      <Divider />
            
        </div>
        
          })}
        {/* <div style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
            <ReactPlayer 
              controls 
              url = "https://www.youtube.com/watch?v=7sDY4m8KNLc"
              onReady={() => console.log("onReady callback")}
              onStart={() => console.log("onStart callback")}
              onPause={() => console.log("onPause callback")}
              onEnded={() => console.log("onEnded callback")}
              onError={() => console.log("onError callback")}
            />
        </div> */}
        {/* <Showme/> */}
        </Grid>
      
          
       
        
        
      </Container>
    
    </>
  );
}