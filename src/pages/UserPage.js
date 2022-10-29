import { Helmet } from 'react-helmet-async';
import TableHead from '@mui/material/TableHead';

import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';
import url from '../utils/weburl';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

const rows = []

export default function UserPage() {

  const getStudents = (initState = []) =>{
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [studentsData,setStudentsData] = useState(initState);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {

      const courseid = sessionStorage.getItem("courseid")

      const RequestBody = {
        query:`query{
                studentsInCourse(courseId: ${courseid}){
                  student{
                    user_name
                    user_email
                  }
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
          setStudentsData(resData.data.studentsInCourse);
          console.log(studentsData);
          console.log(studentsData);
        })
        .catch((err) => {
          console.log(err);
        });

    }, [])

    return studentsData;
  }


  return (
    <>
      <Helmet>
        <title> People </title>
      </Helmet>

      <Container>
        <Stack direction='row' alignItems='center' justifyContent='space-between' mb={5}>
          <Typography variant='h4' gutterBottom>
            People
          </Typography>
        </Stack>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>Student Name</TableCell>
                <TableCell >Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getStudents().map((student) => (
                <TableRow
                  key={student.student.user_name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component='th' scope='row'>
                    {student.student.user_name}
                  </TableCell>
                  <TableCell>{student.student.user_email}</TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
