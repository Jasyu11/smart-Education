import React from "react";
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

export default function CourseCard({course}){
    const {id, course_name: courseName, price, teacher, course_description: courseDescription} = course;

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOk = () => {
        setOpen(false);
        console.log({courseName})
    };

    return (
        <Card>

            <Stack spacing={2} sx={{ p: 3 }}>
                <Link color="inherit" underline="hover">
                    <Typography variant="subtitle1" noWrap>
                        {courseName}
                    </Typography>
                </Link>
                <Link color="gray" underline="hover">
                    <Typography variant="subtitle2" noWrap>
                        {teacher.user_name}
                    </Typography>
                </Link>

                <Stack direction="row" alignItems="center" justifyContent="space-between">

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
                                <Button key = "Enrol" onClick={handleOk}>Enrol</Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </Stack>
            </Stack>
        </Card>
    );

}