// import React from "react";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DatePicker, Space, Input, Divider, Card } from 'antd';
import { Button, Box, Typography} from '@mui/material';
import 'antd/dist/antd.css';
// import "./index.css";
import TextField from '@mui/material/TextField';
import Iconify from '../components/iconify';
import url from '../utils/weburl';



const { RangePicker } = DatePicker;


const Assign = () => {
  const [assigntitle, setAssigntitle] = useState('');
  const [assigninfo, setAssigninfo] = useState('');
  const [assignweight, setAssignweight] = useState(0)
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [mark, setMark] = useState('');
  const [assignmentid, setAssignmentid] = useState(0);

  const [fromDate, setFromDate] = useState('current');
  const [toDate, setToDate] = useState('current');

  const [assignmentinfolist, setassignmentinfolist] = useState([]);
  const [questionlist, setquestionlist] = useState([]);
  const [choiceQuestionList, setChoiceQuestionList] = useState([]);


  let assignmentSubmitid = 0;
  const handleChangeAssigntitle = (event) => {
    setAssigntitle(event.target.value);
  };

  const handleChangeAssigninfo = (event) => {
    setAssigninfo(event.target.value);
  };

  const handleChangeAssignmentWeight = (event) => {
    setAssignweight(event.target.value);
  }

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

  const onChangeShortQuestion = (event,index) => {
    const newList = [...questionlist];
    newList[index].question = event.target.value;
    setquestionlist(newList);
  }

  const onChangeShortAnswer = (event,index) => {
    const newList = [...questionlist];
    newList[index].answer = event.target.value;
    setquestionlist(newList);
  }

  const onChangeShortMark = (event,index) => {
    const newList = [...questionlist];
    newList[index].mark = event.target.value;
    setquestionlist(newList);
  }

  const onChangeChoiceQuestion = (event,index) => {
    const newList = [...choiceQuestionList];
    newList[index].question = event.target.value;
    setChoiceQuestionList(newList);
  }

  const onChangeChoiceAnswer = (event,index) => {
    const newList = [...choiceQuestionList];
    newList[index].answer = event.target.value;
    setChoiceQuestionList(newList);
  }

  const onChangeChoiceMark = (event,index) => {
    const newList = [...choiceQuestionList];
    newList[index].mark = event.target.value;
    setChoiceQuestionList(newList);
  }

  const onChangeChoiceChoice = (event,index,cindex) => {
    const newList = [...choiceQuestionList];
    newList[index].choices[cindex] = event.target.value;
    setChoiceQuestionList(newList);
  }

  const navigate = useNavigate();

  const handleClick = (event) => {
    setquestionlist([...questionlist, { answer, question, mark }]);
  };
  const handleChoiceClick = (event) =>{
    setChoiceQuestionList([...choiceQuestionList,{answer,choices:["", "", "", ""], question, mark}]);
  }

  const handleAssignmentinfolist = (event) => {
    createAssignment();
    console.log(questionlist);
    setTimeout(subQuestionsInfo,4000)
  };

  const subQuestionsInfo = () => {
    questionlist.map((shortQuestion, index) => {
      return createShortQuestion(shortQuestion);
    });
    choiceQuestionList.map((choiceQuestion, index) =>{
      return createChoiceQuestion(choiceQuestion);
    });
    navigate('/coursepage/Assignment', {replace: true});
  }

  const setFunction = () =>{
    console.log(assignmentid)
  };

  const createAssignment = () =>{
    const courseid = sessionStorage.getItem("courseid")
    const requestBody = {
      query:`mutation{
              createAssignment(assignmentInput:{
                assignmentName: "${assigntitle}"
                assignmentScore: ${parseFloat(assignweight)}
                weight:${parseFloat(assignweight)}
                startTime: "${fromDate.toString()}"
                endTime: "${toDate.toString()}"
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
        console.log(resData.data.createAssignment.id);
        setAssignmentid(resData.data.createAssignment.id)
        assignmentSubmitid = resData.data.createAssignment.id;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createShortQuestion = (shortQuestion) =>{
    const courseid = sessionStorage.getItem("courseid")
    const requestBody = {
      query:`mutation{
              createShortQuestion(shortQuestionInput:{
                questionContent: "${shortQuestion.question}"
                questionScore: ${parseFloat(shortQuestion.mark)}
                sampleAnswer: ["${shortQuestion.answer}"]
                assignmentId: ${parseInt(assignmentSubmitid,10)}
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
        console.log(resData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createChoiceQuestion = (choiceQuestion) =>{
    const courseid = sessionStorage.getItem("courseid")
    console.log(choiceQuestion.choices);
    const requestBody = {
      query:`mutation{
              createChoiceQuestion(choiceQuestionInput:{
                questionContent: "${choiceQuestion.question}"
                questionScore: ${parseFloat(choiceQuestion.mark)}
                sampleAnswer: ["${choiceQuestion.answer}"]
                assignmentId: ${parseInt(assignmentSubmitid,10)}
                choiceAnswers: ["${choiceQuestion.choices[0]}","${choiceQuestion.choices[1]}"
                "${choiceQuestion.choices[2]}","${choiceQuestion.choices[3]}"]
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
        console.log(resData);
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
        <br />
        <br />
        <TextArea
          rows={1}
          placeholder='Enter the weight of the assignment'
          name='assignment weight'
          onChange={handleChangeAssignmentWeight}
        />
      </div>

      <br />
      <Divider />

      <div>
        <Typography variant="h2" sx={{mb: 2, marginLeft: 5 }}>
          Short Question
        </Typography>

        {questionlist.map((item, index) => {
          return <Box sx={{paddingLeft: 10, paddingRight: 10, textAlign:'center'}} key={index}>
            <TextField id={item.question} required fullWidth label={'Question'} onChange={(e) => onChangeShortQuestion(e,index)} margin='normal' />
            <TextField id={item.answer} required fullWidth label={'Answer'} onChange={(e)=>onChangeShortAnswer(e,index)} margin='normal' />
            <TextField id={item.mark} required label={'Mark'} onChange={(e)=>onChangeShortMark(e,index)} margin='normal' />
            <Button sx={{marginTop:3, marginLeft:5}}
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
          Choice Question
        </Typography>
        {choiceQuestionList.map((item, index) => {
          return <Box sx={{paddingLeft: 10, paddingRight: 10, textAlign:'center'}} key={index}>
            <TextField id={item.question} required fullWidth label={'Question'} margin='normal' onChange={(e)=>onChangeChoiceQuestion(e,index)}/>
            {item.choices.map((item, cindex) =>{
              return <TextField sx={{marginLeft: 5, paddingRight: 10}} onChange={(e)=>onChangeChoiceChoice(e,index,cindex)}
                         id={item.choices} required fullWidth label={`Choices${cindex+1}`} margin='normal' />
            })}

            <TextField id={item.answer} required fullWidth label={'Answer'} margin='normal' onChange={(e)=>onChangeChoiceAnswer(e,index)}/>
            <TextField id={item.mark} required label={'Mark'} margin='normal' onChange={(e)=>onChangeChoiceMark(e,index)}/>

            <Button sx={{marginTop:3, marginLeft:5}}
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
