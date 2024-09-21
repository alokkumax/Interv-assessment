import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import "../styles/LivePolling.css"
function LivePolling({ pollID }) {
  const [poll, setPoll] = useState({
    title: "",
    option: [],
  });

  useEffect(() => {
    const unsubscribe = db
      .collection("polls")
      .doc(pollID)
      .onSnapshot(
        (doc) => {
          if (doc.exists) {
            const pollData = doc.data();
            setPoll(pollData); 
          } else {
            console.log("No such document!");
          }
        },
        (error) => {
          console.error("Error fetching document:", error);
        }
      );

    return () => unsubscribe(); 
  }, [pollID]); 

  return (
    <div>
      <div className="poll">
        <div className="container">
          <div className="poll-heading">
          <h1>Q. {poll.title}</h1>
          <span>Live 🔴</span>
          </div>
          {poll.option && poll.option.length > 0 ? (
            poll.option.map((itm, index) => (
              <div
                className="pollOptionTile"
                key={index}
                style={{
                  backgroundColor: itm.isCorrect ? "#D4F4BC" : "#F2F2F2",
                  border: itm.isCorrect ? "1px solid #D4F4BC" : "1px solid #E0E0E0",
                  padding: "10px",
                  marginBottom: "10px",
                  borderRadius: "12px",
                }}
              >
                <button
                  style={{
                    width: "100%",
                    textAlign: "left",
                    background: "none",
                    border: "none",
                    fontSize: "16px",
                    padding: "10px",
                  }}
                >
                  <strong>{index + 1}. {itm.name}</strong>
                  <span style={{ float: "right" }}>
                    {itm.impression} Votes
                  </span>
                </button>
              </div>
            ))
          ) : (
            <p>No options available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default LivePolling;
