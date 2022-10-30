import {Helmet} from 'react-helmet-async';
import {useEffect, useState} from 'react';
// @mui
import {Container, Stack, Typography, Button, Link, Grid} from '@mui/material';
// components
import Iconify from '../components/iconify';
import {ProductSort, ProductCartWidget, ProductFilterSidebar} from '../sections/@dashboard/products';
import CourseCard from "../sections/@dashboard/CourseCard";
import url from "../utils/weburl";
// mock
// ----------------------------------------------------------------------

export default function ProductsPage() {
    const usertype = sessionStorage.getItem("usertype");
    const getCourses = (initState = []) =>{
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [coursesData,setCoursesData] = useState(initState);

        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            const RequestBody = {
                query:`query{
                          courses{
                            id
                            course_name
                            teacher{
                              user_name
                            }
                            price
                            course_description
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
                    console.log("123456")
                    setCoursesData(resData.data.courses);
                    console.log("123456")

                    console.log(coursesData);
                })
                .catch((err) => {
                    console.log(err);
                });

        }, [])

        return coursesData;
    }

    let button = null;
    if (usertype === 'Teacher') {
      button = <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill"/>}
                        href='/dashboard/creatingcourses'>
                    New Courses
                </Button>;
    }

    return (
        <>
            <Helmet>
                <title> Dashboard: All Courses </title>
            </Helmet>

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        All Courses
                    </Typography>
                    {button}
                    {/* <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill"/>}
                            href='/dashboard/creatingcourses'>
                        New Courses
                    </Button> */}
                </Stack>

                <Grid container spacing={3} >
                    {getCourses().map((course) => (
                        <Grid key={course.id} item xs={12} sm={6} md={3}>
                            <CourseCard course={course}/>
                        </Grid>
                    ))}
                </Grid>

            </Container>
        </>
    );
}