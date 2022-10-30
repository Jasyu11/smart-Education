import React, { useEffect, useState } from 'react';
import {
    Button,
    Card,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Grid,
    Link,
    Stack,
    Typography
} from "@mui/material";

import {fCurrency} from "../../utils/formatNumber";
import {AppWidgetSummary} from "./app";
import url from '../../utils/weburl';

export default function CourseCard({course}){
    const studentid = sessionStorage.getItem("userid")
    const {id, course_name: courseName, price, teacher, course_description: courseDescription} = course;
    const usertype = sessionStorage.getItem("usertype");
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };




  const handleClose = () => {
    enrollCourse();
    setOpen(false);
    console.log({ courseName });
  };

  const enrollCourse = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const RequestBody = {
      query: `mutation{
  bookCourse(courseId: ${id}, studentId: ${studentid}){
    id
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
        console.log(resData);
      })
      .catch((err) => {
        console.log(err);
      });


    return true;
  };
  let button = null;
  if (usertype === 'Student') {
    button = <Button key = "Enrol" onClick={handleClose}>Enrol</Button>;
  }
  return (
    <Card>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color='inherit' underline='hover'>
          <Typography variant='subtitle1' noWrap>
            {courseName}
          </Typography>
        </Link>
        <Link color='gray' underline='hover'>
          <Typography variant='subtitle2' noWrap>
            {teacher.user_name}
          </Typography>
        </Link>

        <Stack direction='row' alignItems='center' justifyContent='space-between'>

                    <Typography variant="subtitle1">
                        &nbsp;
                        {fCurrency(price)}
                    </Typography>
                    <div>
                        <button onClick={handleClickOpen}>
                            Details
                        </button>
                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle>
                                {courseName}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    {courseDescription}
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button key = "Back" onClick={handleClose}>Return</Button>
                                {/* <Button key = "Enrol" onClick={handleOk}>Enrol</Button> */}
                                {button}
                            </DialogActions>
                        </Dialog>
                    </div>
                </Stack>
            </Stack>
        </Card>
    );

}