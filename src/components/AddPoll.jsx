import React, { useState } from "react";
import { db } from "../firebase";
import LivePolling from "./LivePolling";
import "../styles/AddPoll.css"
import { useNavigate } from "react-router-dom"; 

export default function AddPoll() {
  const [showPoll, setShowPoll] = useState(false);
  const [recentPoll, setRecentPoll] = useState(0);
  const [poll, setPoll] = useState({
    title: "",
    time: 60,
    option: [
      {
        name: "",
        impression: 0,
        isCorrect: false,
      },
      {
        name: "",
        impression: 0,
        isCorrect: false,
      },
      {
        name: "",
        impression: 0,
        isCorrect: false,
      },
    ],
  });
  const navigate = useNavigate(); 

  const handleOptionName = (e, index) => {
    const newOptions = [...poll.option];
    newOptions[index].name = e.target.value;

    setPoll({ ...poll, option: newOptions });
  };
  const handleOptionCheck = (e, index) => {
    const newOptions = [...poll.option];
    newOptions[index].isCorrect = !poll.option[index].isCorrect;

    setPoll({ ...poll, option: newOptions });
  };
  const handleTitle = (e) => {
    setPoll({ ...poll, title: e.target.value });
  };
  const handleTime = (e) => {
    setPoll({ ...poll, time: e.target.value });
  };
  const postPoll = (e) => {
    e.preventDefault();
    db.collection("polls")
      .add(poll)
      .then((docRef) => {
        alert("POSTED");
        setRecentPoll(docRef.id);
        console.log(docRef.id);
        setShowPoll(true);
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const reloadPage = () => {
    window.location.reload();
  };
  const handleShowAll = () => {
    navigate("/show-all-polls");
  }
  return (
    <div className="container">
      {!showPoll ? (
        <div className="poll-container">
          <h2>Post</h2>

          <div className="input-group">
            <div>
            <label>Enter the title of the poll</label>
            <input
              type="text"
              value={poll.title}
              onChange={handleTitle}
              placeholder="Enter the title here"
              className="title-input"
            />
            </div>
            <div>

            <label>Time allotted (seconds)</label>
            <input
              type="number"
              value={poll.time}
              onChange={handleTime}
              className="time-input"
            />
            </div>

          </div>

          <div className="options-group">
            <div className="optionTab">

            <label>Options</label>
            <label>Mark the correct option</label>
            </div>

            {poll.option.map((item, index) => (
              <div key={index} className="option-item">
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => handleOptionName(e, index)}
                  className="option-input"
                />
                <input
                  type="checkbox"
                  checked={item.isCorrect}
                  onChange={(e) => handleOptionCheck(e, index)}
                  className="option-checkbox"
                />
              </div>
            ))}
          </div>

          <button onClick={postPoll} className="submit-button">
            Submit
          </button>
        </div>
      ) : (
        <>
          <LivePolling pollID={recentPoll} />
          <button className="add-another-poll" onClick={reloadPage}>Add anoter poll</button>
          <button className="show-all-poll" onClick={handleShowAll}>Show All Polls</button>
        </>
      )}
    </div>
  );
}
