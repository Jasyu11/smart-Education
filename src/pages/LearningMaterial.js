import { Helmet } from 'react-helmet-async';
import React, { Component } from 'react';
import { Player } from 'video-react';
import ReactPlayer from "react-player";
import { Form, FormGroup, Label, Input } from 'reactstrap';

// @mui
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import { styled } from '@mui/material/styles';
import useResponsive from '../hooks/useResponsive';
import Iconify from '../components/iconify';
import Logo from '../components/logo';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';
import POSTS from '../_mock/blog';


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
  maxWidth: 400,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));



export default function BlogPage() {
  const mdUp = useResponsive('up', 'md');


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
        </Stack>

        <Grid container spacing={1}>
        <div style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
            <ReactPlayer 
              controls 
              url = "https://www.youtube.com/watch?v=7sDY4m8KNLc"
              onReady={() => console.log("onReady callback")}
              onStart={() => console.log("onStart callback")}
              onPause={() => console.log("onPause callback")}
              onEnded={() => console.log("onEnded callback")}
              onError={() => console.log("onError callback")}
            />
        </div>
        </Grid>
        
      </Container>
    
    </>
  );
}