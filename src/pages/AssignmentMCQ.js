import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
// @mui
import { Container, Stack, Typography, Grid,Box,TextField } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// components
import TextCard from '../components/text-box/textCard';

import Detail from '../_mock/detail';


// ----------------------------------------------------------------------



export default function AssignmentDetailMCQ() {
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
  const [value, setValue] = React.useState('Controlled');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <Helmet>
        <title> Dashboard: Assignment Detail | Minimal UI </title>
      </Helmet>
     
      <Container>
            <Typography variant="h4" sx={{ mb: 5 }}>
            Detail
            </Typography>

            <TextCard title= 'Description' sx={{mb:5 }}>
                
            <Typography variant="body2">
                {Detail.description}
            </Typography>

            </TextCard>

            <TextCard title= 'Answer' sx={{mb:7 }}>

            <FormGroup>
           <FormControlLabel control={<Checkbox defaultChecked />} label="A" />
           <FormControlLabel control={<Checkbox />} label="B" />
           </FormGroup>
            </TextCard>
            <TextCard title= 'Result'>
            
            <Typography variant="body2">
                {Detail.result}
            </Typography>

            </TextCard>
            
      </Container>

    </>
  );
}
