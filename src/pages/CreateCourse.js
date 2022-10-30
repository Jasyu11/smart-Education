// import React from "react";
import { useState } from "react";
import { Button, DatePicker, Space, Input, Typography, Divider, Card } from "antd";
import "antd/dist/antd.css";
// import "./index.css";
import { useNavigate } from 'react-router-dom';
import url from "../utils/weburl";

const CreateCourse = () => {
  const navigate = useNavigate();
  const [coursetitle, setCoursetitle] = useState("");
  const [courseintro, setCourseintro] = useState("");
  const [courseprice, setCourseprice] = useState("");
  // const [courseinfolist, setcourseinfolist] = useState([]);

  const handleCoursetitle = (event) => {
    setCoursetitle(event.target.value);
  };
  const handleCourseintro = (event) => {
    setCourseintro(event.target.value);
  };
  const handleCourseprice = (event) => {
    setCourseprice(event.target.value);
  };

  const course = {
    name: coursetitle,
    description: courseintro,
    price:parseFloat(courseprice),
    teacher: parseInt(sessionStorage.getItem("userid"),10),
  };

  const handleClick = (event) => {
    console.log(course);
    // setcourseinfolist([...courseinfolist, { coursetitle, courseintro, courseprice }]);
    const requestBody = {
      query: `mutation{
                createCourse(courseInput:{
                  course_name: "${course.name}"
                  course_description: "${course.description}"
                  price: ${course.price}
                  teacher_id: ${course.teacher}
                }){
                  id
                  course_name
                  price
                  }
             }`,
    };
    fetch(
      url, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(
      (res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!!');
        }
        return res.json();
      },
    ).then((resData) => {
      console.log(resData);
      
      navigate('/dashboard/courses', {replace: true});
    }).catch((err) => {
      console.log(err);
    })
  };
  const closeTab = (event) => {
    window.open("about:blank", "_self");
    window.close();

  };

  const { TextArea } = Input;
  
  return (
    
    <main>

      <h2 style={{padding:"0 50px"}}>Create A New Course</h2>
      {/* <AssignmentTitle /> */}  
      <div className="newcourse" style={{padding:"0 50px"}}>
        <TextArea
          rows={2}
          placeholder="Enter course name"
          name="coursetitle"
          required
          onChange={handleCoursetitle}
        />
        <br />
        <br />
        <TextArea
          rows={5}
          placeholder="Enter brief descripion of your course"
          name="courseintro"
          required
          onChange={handleCourseintro}
        />
        <br/>
        <br/>
        Price: <input type="number" id="price" name="price" min="0" required onChange={handleCourseprice}/>

      </div>
      <br />
      <div style={{padding:"0 50px"}}>
      <button onClick={handleClick}>Create</button>
      <button onClick={closeTab}>Maybe Next time</button>
      </div>
    </main>
  );
};

export default CreateCourse;