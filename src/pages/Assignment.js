import { Helmet } from 'react-helmet-async';
import TableHead from '@mui/material/TableHead';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
// @mui
import {
  Table,
  Stack,
  Paper,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer, Button,
} from '@mui/material';

import USERLIST from '../_mock/user';
import url from '../utils/weburl';
import Iconify from '../components/iconify';


export default function Assignment() {

  const jumpToDetail = (id, name) => {
    sessionStorage.setItem("assignmentid", id);
    sessionStorage.setItem("assignmenttitle", name)
    navigate('/coursepage/AssignmentDetail', {replace: true});
  }

  const jumpToSample = (id, name) =>{
    sessionStorage.setItem("assignmentid", id);
    sessionStorage.setItem("assignmenttitle", name)
    navigate('/coursepage/sampleAnswer', {replace: true});
  }

  const addAssignment = () => {
    navigate('/coursepage/addAssignment', {replace: true});
  }

  const navigate = useNavigate();

  const getAssignments = (initState = []) =>{
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [assignmentsData,setAssignmentsData] = useState(initState);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {

      const courseid = sessionStorage.getItem("courseid")

      const RequestBody = {
        query:`query{
                assignments(courseId: ${courseid}){
                  id
                  assignmentName
                  assignmentScore
                  startTime
                  endTime
                  weight
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
          setAssignmentsData(resData.data.assignments);

        })
        .catch((err) => {
          console.log(err);
        });

    }, [])

    return assignmentsData;
  }
  const usertype = sessionStorage.getItem('usertype');
  let button = null;
  if (usertype === 'Teacher') {
    button = <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={addAssignment}>
      Add Assignment
    </Button>;
  }

  return (
    <>
      <Helmet>
        <title> Assignment </title>
      </Helmet>

      <Container>
        <Stack direction='row' alignItems='center' justifyContent='space-between' mb={5}>
          <Typography variant='h4' gutterBottom>
            Assignments
          </Typography>
          {button}

        </Stack>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell >Score</TableCell>
                <TableCell >Weight</TableCell>
                <TableCell >Start Time</TableCell>
                <TableCell >End Time</TableCell>
                <TableCell >Take Assignment</TableCell>
                <TableCell >Sample Answer</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getAssignments().map((assignment) => (
                <TableRow
                  key={assignment.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{assignment.assignmentName}</TableCell>
                  <TableCell>{assignment.assignmentScore}</TableCell>
                  <TableCell>{assignment.weight}</TableCell>
                  <TableCell>{assignment.startTime}</TableCell>
                  <TableCell>{assignment.endTime}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="success"
                            onClick={(e) => jumpToDetail(assignment.id, assignment.assignmentName)}>
                      Take Assignment
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" color="secondary"
                            onClick={(e) => jumpToSample(assignment.id, assignment.assignmentName)}>
                      Sample Answer
                    </Button>
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>


    </>
  );
}
