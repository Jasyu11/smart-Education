// import React from "react";
import { useState } from "react";
import { Button, DatePicker, Space, Input, Typography, Divider, Card } from "antd";
import "antd/dist/antd.css";
// import "./index.css";
import TextField from '@mui/material/TextField';



const { RangePicker } = DatePicker;



const Assign = () => {
  const [assigntitle, setAssigntitle] = useState("");
  const [assigninfo, setAssigninfo] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [fromDate, setFromDate] = useState('current');
  const [toDate, setToDate] = useState('current');
 
  const [assignmentinfolist, setassignmentinfolist] = useState([]);
  const [questionlist, setquestionlist] = useState([]);



  const handleChangeAssigntitle = (event) => {
    setAssigntitle(event.target.value);
  };

  const handleChangeAssigninfo = (event) => {
    setAssigninfo(event.target.value);
  };

  const onChangeDateRange = (dates, datesString) => {
    setFromDate(datesString[0]);
    setToDate(datesString[1]);
    // console.log([datesString[0], datesString[1]]);
  };  
  
//   const handleTimerange = (event) => {
//     setTimerange(event.target.value[0], event.target.value[1])
//   }

  const handleChangeQuestion = (event) => {
    setQuestion(event.target.value);
  };
  const handleChangeAnswer = (event) => {
    setAnswer(event.target.value);
  };
  const handleClick = (event) => {
    setquestionlist([...questionlist, { answer, question }]);
  };
  const handleAssignmentinfolist = (event) => {
    setassignmentinfolist([
      ...assignmentinfolist,
      { assigntitle, assigninfo, fromDate, toDate }   
    ]);
    setquestionlist([...questionlist, { answer, question }]);
  };

  const { TextArea } = Input;
  console.log(assignmentinfolist);
  console.log(questionlist);
  return (
    <main>
      <h2 style={{padding:"0 50px"}}>Create Assignment</h2>
      {/* <AssignmentTitle /> */}
      <div style={{padding:"0 50px"}}>
      <TextArea
        rows={2}
        placeholder="Enter your assignment title"
        name="assignment title"
        onChange={handleChangeAssigntitle}
      />
      <br />
      <br />
      <TextArea
        rows={2}
        placeholder="Enter your assignment introduction"
        name="assignment intro"
        onChange={handleChangeAssigninfo}
      />
      <br />
      <br />

      <RangePicker showTime onChange={onChangeDateRange}    />   
      </div>
      <Divider dashed />    
      <div className="form" style={{padding:"0 50px"}}>
        <TextArea
          rows={2}
          placeholder="Enter your question content"
          name="question"
          onChange={handleChangeQuestion}
        />
        <br />
        <br />
        <TextArea
          rows={5}
          placeholder="Enter your sample answer"
          name="sampleanswer"
          onChange={handleChangeAnswer}
        />
      </div>
      <br />
      <div>
        {questionlist.map(item =>{
          return<div>
            <TextField id={item.question} required fullWidth label={"Question"} margin="normal"/>
            <TextField id={item.answer} required fullWidth label={"Answer"} margin="normal"/>
          </div>
        })}
      </div>
      <div style={{padding:"0 50px"}}>
      <button onClick={handleClick}>Add New Question</button>
      <button onClick={handleAssignmentinfolist}>Submit All Questions</button>
      </div>
      <div className="results" style={{padding:"0 50px"}}>
        <ul>
          {questionlist.map((x, i) => (
            <li key={i}>
              {" "}
              {x.question} <p> {x.answer} </p>{" "}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Assign;
