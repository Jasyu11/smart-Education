import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import { styled } from '@mui/material/styles';
import useResponsive from '../hooks/useResponsive';
import Iconify from '../components/iconify';
import Logo from '../components/logo';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';
// mock
import POSTS from '../_mock/blog';
import url from '../utils/weburl';
import DiscussionCard from '../sections/@dashboard/DiscussionCard';



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

  const navigate = useNavigate();

  const addDiscussion = () => {
    navigate('/coursepage/addDiscussion', {replace: true});
  }

  const getDiscussion = (initState = []) =>{
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [discussionData,setDiscussionsData] = useState(initState);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {

      const courseid = sessionStorage.getItem("courseid")

      const RequestBody = {
        query:`query{
                showDiscussion(courseId:${courseid}){
                  student{
                    user_name
                  }
                  teacher{
                    user_name
                  }
                  content
                }
              }`,
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
          setDiscussionsData(resData.data.showDiscussion);
          console.log(discussionData);
        })
        .catch((err) => {
          console.log(err);
        });

    }, [])

    return discussionData;
  }


  return (
    
    <>
      <Helmet>
        <title> Smart Education | Discussion </title>
      </Helmet>
      <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Discussion
          </Typography>
        </Stack>
        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={addDiscussion}>
            Add Discussion
          </Button>
        </Stack>

        <Grid container spacing={3}>
          {getDiscussion().map((discussion, index) => (
            <DiscussionCard key={index} name={discussion.student !== null ? discussion.student.user_name : discussion.teacher.user_name} content={discussion.content} />
          ))}
        </Grid>
        
      </Container>
      
    </>
  );
}



