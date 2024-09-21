import React from "react";
import "../styles/Home.css"
import { useNavigate } from "react-router-dom";  // Import useNavigate

function Home() {
  const navigate = useNavigate(); // Initialize navigate

  // Handle click for Student button
  const handleStudentClick = () => {
    navigate("/student");  // Navigate to StudentTab component
  };

  // Handle click for Teacher button
  const handleTeacherClick = () => {
    navigate("/teacher");  // Navigate to AppPoll component
  };

  return (
    <div className="home-container">
      <h1>Select your type</h1>
      <div className="button-container">
        <button className="user-type-button" onClick={handleStudentClick}>
          student
        </button>

        <button className="user-type-button" onClick={handleTeacherClick}>
          teacher
        </button>
      </div>
    </div>
  );
}

export default Home;


