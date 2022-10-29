import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography, Button } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const StyledIcon = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

AppWidgetSummary.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  total: PropTypes.string.isRequired,
  sx: PropTypes.object,
};

export default function AppWidgetSummary({id, title, name, color = 'primary', sx, ...other }) {
    const navigate = useNavigate();

    const jumpToCoursePage = () => {
      sessionStorage.setItem("courseid", id);
      navigate('/coursepage', {replace: true});

    }
  return (
    <Card
      sx={{
        py: 5,
        boxShadow: 0,
        textAlign: 'center',
        color: (theme) => theme.palette[color].darker,
        bgcolor: (theme) => theme.palette[color].lighter,
        ...sx,
      }}
      {...other}
    >
      <Button onClick={jumpToCoursePage}>{title}</Button>

      <Typography variant="subtitle2" sx={{ opacity: 0.72 }} >
        {name}
      </Typography>

    </Card>
  );
}
