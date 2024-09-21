import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddPoll from "./components/AddPoll";
import LivePolling from "./components/LivePolling";
import Home from "./components/Home";
import Student from "./components/Student";
import StudentPortal from "./components/StudentPortal";
import ShowAllPolls from "./components/ShowAllPolls";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/teacher" element={<AddPoll />} />
        <Route path="/show-all-polls" element={<ShowAllPolls />} />
        <Route path="/student" element={<Student/>} />
        <Route path="/studentPortal" element={<StudentPortal/>} />
        <Route path="/live-poll" element={<LivePolling />} />
        <Route path="/" element={<Home/>} />
      </Routes>
    </Router>
  );
}

export default App;


