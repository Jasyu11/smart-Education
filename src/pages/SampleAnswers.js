import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import * as React from 'react';
import {
  Box,
  Button,
  Container,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import TextCard from '../components/text-box/textCard';


import url from '../utils/weburl';

export default function SampleAnswers() {

  const assignmentName = sessionStorage.getItem('assignmenttitle');

  const navigate = useNavigate();

  const getShortQuestions = (initState = []) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [shortQuestionsData, setShortQuestionsData] = useState(initState);

    const assignmentid = sessionStorage.getItem('assignmentid');

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      const RequestBody = {
        query: `query{
                getShortQuestions(assignmentId: ${assignmentid}){
                  id
                  questionContent
                  sampleAnswer
                  questionScore
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
          setShortQuestionsData(resData.data.getShortQuestions);
        })
        .catch((err) => {
          console.log(err);
        });

    }, []);
    return shortQuestionsData;
  };

  const getChoiceQuestions = (initState = []) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [choiceQuestionsData, setChoiceQuestionsData] = useState(initState);

    const assignmentid = sessionStorage.getItem('assignmentid');

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      const RequestBody = {
        query: `query{
                getChoiceQuestions(assignmentId: ${assignmentid}){
                  id
                  questionContent
                  sampleAnswer
                  questionScore
                  choiceAnswers
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
          setChoiceQuestionsData(resData.data.getChoiceQuestions);
          console.log(choiceQuestionsData);
        })
        .catch((err) => {
          console.log(err);
        });

    }, []);

    return choiceQuestionsData;
  };

  const backToAssignments = () => {
    navigate('/coursepage/Assignment', {replace: true});
  }

  return(
    <>
      <Helmet>
        <title> {assignmentName} | Sample Answer </title>
      </Helmet>

      <Container>
        <Typography variant='h2' sx={{ mb: 5 }}>
          {assignmentName}
        </Typography>

        <Typography variant='h4' sx={{ mb: 5 }}>
          Choice Questions
        </Typography>

        {getChoiceQuestions().map((assignment, index) => {
          return <TextCard title={assignment.questionContent} sx={{ mb: 5 }}>
            <Typography variant='body2'>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
              >
                <FormControlLabel value={assignment.choiceAnswers[0]} control={<Radio />} label={assignment.choiceAnswers[0]} />
                <FormControlLabel value={assignment.choiceAnswers[1]} control={<Radio />} label={assignment.choiceAnswers[1]} />
                <FormControlLabel value={assignment.choiceAnswers[2]} control={<Radio />} label={assignment.choiceAnswers[2]} />
                <FormControlLabel value={assignment.choiceAnswers[3]} control={<Radio />} label={assignment.choiceAnswers[3]} />
              </RadioGroup>
            </Typography>
            <Divider/>
            <Typography sx={{ mt:3}}>
              Sample Answer
            </Typography>
            <Typography sx={{ mt:3}}>
              {assignment.sampleAnswer}
            </Typography>
          </TextCard>;
        })}


        <Typography variant='h4' sx={{ mb: 5 }}>
          Short Questions
        </Typography>

        {getShortQuestions().map((assignment, index) => {
          return <TextCard title={assignment.questionContent} sx={{ mb: 5 }}>


            <Typography >
              Sample Answer
            </Typography>
            <Typography sx={{ mt:3}}>
              {assignment.sampleAnswer}
            </Typography>

          </TextCard>;
        })}

        <br />
        <br />
        <br />
        <Box sx={{textAlign: "center"}}>
          <Button onClick={backToAssignments}
            variant='contained' >Back</Button>
        </Box>

      </Container>

    </>

  );
}
