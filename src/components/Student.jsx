import React, { useState } from 'react';
import { db } from '../firebase'; 
import { useNavigate } from "react-router-dom"; 
import "../styles/Student.css"
const StudentTab = () => {
  const [studentName, setStudentName] = useState('');
  const navigate = useNavigate(); 
  
  const handleStart = async () => {
    if (studentName) {
      try {
        await db.collection('students').add({
          name: studentName,
          timestamp: new Date(),
        });

        navigate("/studentPortal", { state: { studentName } });

      } catch (error) {
        alert('Error saving student data: ' + error.message);
      }
    } else {
      alert('Please enter your name to continue.');
    }
  };

  return (
    <div className="student-tab">
      <h1>Welcome, Student</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter your name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          className="name-input"
        />
        <button onClick={handleStart} className="start-button">
          Start
        </button>
      </div>
    </div>
  );
};

export default StudentTab;
