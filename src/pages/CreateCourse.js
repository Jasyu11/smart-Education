// import React from "react";
import { useState } from "react";
import { Button, DatePicker, Space, Input, Typography, Divider, Card } from "antd";
import "antd/dist/antd.css";
// import "./index.css";


const CreateCourse = () => {

  const [coursetitle, setCoursetitle] = useState("");
  const [courseintro, setCourseintro] = useState("");
  const [courseinfolist, setcourseinfolist] = useState([]);


  const handleCoursetitle = (event) => {
    setCoursetitle(event.target.value);
  };
  const handleCourseintro = (event) => {
    setCourseintro(event.target.value);
  };
  const handleClick = (event) => {
    setcourseinfolist([...courseinfolist, { coursetitle, courseintro }]);
  };
  const closeTab = (event) => {
    window.open("about:blank", "_self");
    window.close();

  };

  const { TextArea } = Input;
  console.log(courseinfolist);
  return (
    
    <main>
      <h2 style={{padding:"0 50px"}}>Create A New Course</h2>
      {/* <AssignmentTitle /> */}  
      <div className="newcourse" style={{padding:"0 50px"}}>
        <TextArea
          rows={2}
          placeholder="Enter course name"
          name="coursetitle"
          onChange={handleCoursetitle}
        />
        <br />
        <br />
        <TextArea
          rows={5}
          placeholder="Enter brief descripion of your course"
          name="courseintro"
          onChange={handleCourseintro}
        />
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