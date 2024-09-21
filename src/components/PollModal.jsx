import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import '../styles/PollModal.css';
import LivePolling from "../components/LivePolling"
const PollModal = ({ poll, onClose, timeAllotted, onSubmit,id}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [remainingTime, setRemainingTime] = useState(timeAllotted);
  const [resultModalOpen, setResultModalOpen] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null); // To store correctness of the answer
  const[showPoll,setShowPoll] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeAllotted]);

  const handleOptionSelect = (index) => {
    setSelectedOption(index);
  };

  const handleSubmit = async () => {
    const updatedPoll = {
      ...poll,
      option: poll.option.map((opt, index) => {
        if (index === selectedOption) {
          return { ...opt, impression: opt.impression + 1 }; // Increment impression
        }
        return opt;
      }),
    };

    const pollRef = doc(db, 'polls', poll.id);
    await updateDoc(pollRef, updatedPoll);
    
    // Check if selected option is correct
    const selectedPollOption = poll.option[selectedOption];
    setIsCorrect(selectedPollOption.isCorrect);
    setResultModalOpen(true);
    
    onSubmit(poll.id, selectedOption !== null);
  };

  const handleClose = () => {
    setResultModalOpen(false);
    onClose();
  };
  const handleShowPoll = () => {
    setResultModalOpen(!resultModalOpen)
    setShowPoll(!showPoll)
    
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{poll.title}</h2>
        <div>Time Remaining: {remainingTime} seconds</div>
        <ul>
          {poll.option.map((opt, index) => (
            <li 
              key={index} 
              onClick={() => handleOptionSelect(index)} 
              style={{ cursor: 'pointer', backgroundColor: selectedOption === index ? '#d3d3d3' : 'transparent' }}
            >
              {opt.name} 
            </li>
          ))}
        </ul>
        <button onClick={handleSubmit} disabled={selectedOption === null}>Submit Poll</button>
        <button onClick={onClose}>Close</button>
      </div>

      {resultModalOpen  && (
        <div className="modal-overlay">
          <div className="result-modal-content">
            <p>{isCorrect ? "Good job! Correct!" : "Oops! That's wrong."}</p>
            <button onClick={handleClose}>Close</button>
            <button onClick={handleShowPoll}>See Live Polling</button>
          </div>
        </div>
      )}
      {
        showPoll && (
          <div className='modal-overlay-poll'>
            <LivePolling pollID={id}/>
            <button onClick={()=>onClose()}>Close</button>
          </div>
        )
      }
    </div>
  );
};

export default PollModal;
