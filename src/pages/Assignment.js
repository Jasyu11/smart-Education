import { Helmet } from 'react-helmet-async';
import TableHead from '@mui/material/TableHead';

import { useEffect, useState } from 'react';
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
  TableContainer,
} from '@mui/material';

import USERLIST from '../_mock/user';
import url from '../utils/weburl';

export default function Assignment() {


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
              </TableRow>
            </TableHead>
            <TableBody>
              {getAssignments().map((assignment) => (
                <TableRow
                  key={assignment.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component='th' scope='row'>
                    {assignment.assignmentName}
                  </TableCell>
                  <TableCell>{assignment.assignmentName}</TableCell>
                  <TableCell>{assignment.assignmentScore}</TableCell>
                  <TableCell>{assignment.weight}</TableCell>
                  <TableCell>{assignment.startTime}</TableCell>
                  <TableCell>{assignment.endTime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>


    </>
  );
}
