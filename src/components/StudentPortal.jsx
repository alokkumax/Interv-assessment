import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { useLocation } from 'react-router-dom';
import PollModal from './PollModal';
import "../styles/StudentPortal.css"

const StudentPortal = () => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentPoll, setCurrentPoll] = useState(null);
  const [attemptedPolls, setAttemptedPolls] = useState(new Set());
  const location = useLocation();
  const { studentName } = location.state || {}; // Access studentName

  useEffect(() => {
    const pollsCollection = collection(db, 'polls');

    const unsubscribe = onSnapshot(pollsCollection, (snapshot) => {
      const pollsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPolls(pollsList);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching polls: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const openPoll = (poll) => {
    setCurrentPoll(poll);
    setShowModal(true);
  };

  const handlePollSubmit = (pollId, optionSelected) => {
    setAttemptedPolls((prev) => new Set(prev).add(pollId)); // Add the poll ID to the set
    if (!optionSelected) {
      console.log('No option selected');
    }
    setShowPoll(true)
  };
  

  if (loading) {
    return <div>Loading...</div>;
  }

  const availablePolls = polls.filter(poll => !attemptedPolls.has(poll.id));

  return (
    <div className="student-portal-container">
      <h1>Hello, {studentName}</h1>
      {
        availablePolls.length > 0 ? (
          availablePolls.map((poll) => (
            <div className="poll-tile" key={poll.id}>
              <div className="poll-question">
                <span>Q. {poll.title}</span>
              </div>
              <div className="poll-action">
                <button onClick={() => openPoll(poll)} className="attempt-button">Attempt</button>
              </div>
            </div>
          ))
        ) : (
          <p>Waiting for polls to come...</p>
        )
      }

      {showModal && currentPoll && (
        <PollModal 
          poll={currentPoll} 
          id={currentPoll.id}
          onClose={() => setShowModal(false)} 
          timeAllotted={currentPoll.time} 
          onSubmit={handlePollSubmit} 
          // Pass the submit handler to the modal
        />
      )}
    </div>
  );
};

export default StudentPortal;
