
import { useEffect } from 'react'
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
                  Course Name
                </Typography>

                <img src="/assets/images/covers/cover_20.jpg"  alt="login" />
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