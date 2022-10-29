// import React from "react";
import { useState } from 'react';
import { DatePicker, Space, Input, Divider, Card } from 'antd';
import { Button, Box, Typography} from '@mui/material';
import 'antd/dist/antd.css';
// import "./index.css";
import TextField from '@mui/material/TextField';
import Iconify from '../components/iconify';


const { RangePicker } = DatePicker;


const Assign = () => {
  const [assigntitle, setAssigntitle] = useState('');
  const [assigninfo, setAssigninfo] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const [fromDate, setFromDate] = useState('current');
  const [toDate, setToDate] = useState('current');

  const [assignmentinfolist, setassignmentinfolist] = useState([]);
  const [questionlist, setquestionlist] = useState([]);
  const [choiceQuestionList, setChoiceQuestionList] = useState([]);


  const handleChangeAssigntitle = (event) => {
    setAssigntitle(event.target.value);
  };

  const handleChangeAssigninfo = (event) => {
    setAssigninfo(event.target.value);
  };

  const onChangeDateRange = (dates, datesString) => {
    setFromDate(datesString[0]);
    setToDate(datesString[1]);

  };
  
  const deleteShortQuestion = (index) => {
    const newList = [...questionlist];
    newList.splice(index, 1);
    setquestionlist(newList);
  }

  const deleteChoiceQuestion = (index) => {
    const newList = [...choiceQuestionList];
    newList.splice(index, 1);
    setChoiceQuestionList(newList);
  }


  const handleClick = (event) => {
    setquestionlist([...questionlist, { answer, question }]);
  };
  const handleChoiceClick = (event) =>{
    setChoiceQuestionList([...choiceQuestionList,{answer,choices:["", "", "", ""], question}]);
  }
  const handleAssignmentinfolist = (event) => {

  };

  const { TextArea } = Input;

  return (
    <main>
      <Typography variant="h2" sx={{ mb: 5, marginLeft: 5 }}>
        Create Assignment
      </Typography>
      {/* <AssignmentTitle /> */}
      <div style={{ padding: '0 50px' }}>
        <TextArea
          rows={2}
          placeholder='Enter your assignment title'
          name='assignment title'
          onChange={handleChangeAssigntitle}
        />
        <br />
        <br />
        <TextArea
          rows={2}
          placeholder='Enter your assignment introduction'
          name='assignment intro'
          onChange={handleChangeAssigninfo}
        />
        <br />
        <br />

        <RangePicker showTime onChange={onChangeDateRange} />
      </div>

      <br />
      <Divider />

      <div>
        <Typography variant="h3" sx={{mb: 2, marginLeft: 5 }}>
          Short Question
        </Typography>
        {questionlist.map((item, index) => {
          return <Box sx={{paddingLeft: 10, paddingRight: 10, textAlign:'center'}} key={index}>
            <TextField id={item.question} required fullWidth label={'Question'} margin='normal' />
            <TextField id={item.answer} required fullWidth label={'Answer'} margin='normal' />
            <Button sx={{marginTop:2}}
              variant="contained" color="error" onClick={deleteShortQuestion}>Delete</Button>
            <Divider />
          </Box>;
        })}
      </div>

      <div style={{ padding: '0 50px' }}>
        <Button sx={{marginLeft: 5}}
          variant='contained' startIcon={<Iconify icon='eva:plus-fill' />} onClick={handleClick}>
          Add New Short Question
        </Button>

      </div>

      <div>
        <Typography variant="h3" sx={{mb: 2, marginLeft: 5, mt: 5}}>
          Short Question
        </Typography>
        {choiceQuestionList.map((item, index) => {
          return <Box sx={{paddingLeft: 10, paddingRight: 10, textAlign:'center'}} key={index}>
            <TextField id={item.question} required fullWidth label={'Question'} margin='normal' />
            {item.choices.map((item, index) =>{
              return <TextField sx={{marginLeft: 5, paddingRight: 10}}
                         id={item.choices} required fullWidth label={`Choices${index+1}`} margin='normal' />
            })}

            <TextField id={item.answer} required fullWidth label={'Answer'} margin='normal' />
            <Button sx={{marginTop:2}}
                    variant="contained" color="error" onClick={deleteChoiceQuestion}>Delete</Button>
            <Divider />
          </Box>;
        })}
      </div>

      <div style={{ padding: '0 50px' }}>
        <Button sx={{marginLeft: 5}}
                variant='contained' startIcon={<Iconify icon='eva:plus-fill' />} onClick={handleChoiceClick}>
          Add New Choice Question
        </Button>

      </div>


      <br />
      <br />
      <br />
      <Box sx={{textAlign: "center"}}>
        <Button
                variant='contained' onClick={handleAssignmentinfolist}>Submit
          All Questions</Button>
      </Box>

    </main>
  );
};

export default Assign;
