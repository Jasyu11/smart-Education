import {useEffect, useState} from 'react'
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Grid, Container, Typography, Button } from '@mui/material';
import Logo from '../components/logo';
import useResponsive from '../hooks/useResponsive';
// components
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppWidgetSummary,
} from '../sections/@dashboard/app';
import url from "../utils/weburl";

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
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

export default function CoursePage() {


  const getCourses = (initState = []) =>{
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [courseData,setCourseData] = useState(initState);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {

      const courseid = sessionStorage.getItem("courseid")

      const RequestBody = {
        query:`query{
  courseDetails(courseId: ${courseid}){
    id
    course_name
    course_description
    teacher{
      user_name
    }
    price
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
            setCourseData(resData.data.courseDetails[0]);
            console.log(courseData);
            console.log(courseData);
          })
          .catch((err) => {
            console.log(err);
          });

    }, [])

    return courseData;
  }


  const mdUp = useResponsive('up', 'md');
  const theme = useTheme();

  return (
      <>
        <Helmet>
          <title> Smart Education </title>
        </Helmet>

        <StyledRoot>
          <Logo
              sx={{
                position: 'fixed',
                top: { xs: 16, sm: 24, md: 40 },
                left: { xs: 16, sm: 24, md: 40 },
              }}
          />

          {mdUp && (
              <StyledSection >
                <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
                  Course Name: {getCourses().course_name}
                </Typography>

                <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
                  Description: {getCourses().course_description}
                </Typography>
              </StyledSection>
          )}

          <Container maxWidth="xl">
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Module
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <AppWidgetSummary title="Assignment"  icon={'ant-design:android-filled'} />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <AppWidgetSummary title="LearningMaterial"  color="info" icon={'ant-design:apple-filled'} />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <AppWidgetSummary title="Discussion"  color="warning" icon={'ant-design:windows-filled'} />
              </Grid>

            </Grid>
          </Container>
        </StyledRoot>
      </>
  );
}