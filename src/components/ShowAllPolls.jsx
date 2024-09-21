import React, { useEffect, useState } from "react";
import LivePolling from "./LivePolling";
import { db } from "../firebase";

export default function ShowAllPolls() {
  const [pollID, setPollID] = useState([]);

  useEffect(() => {
    // Function to fetch all poll IDs
    const fetchPollIDs = async () => {
      try {
        const pollsCollection = await db.collection("polls").get();
        const ids = pollsCollection.docs.map((doc) => doc.id);
        setPollID(ids);
      } catch (error) {
        console.error("Error fetching poll IDs: ", error);
      }
    };

    fetchPollIDs();
  }, []);

  return (
    <div>
      {pollID.length > 0 ? (
        pollID.map((itm, index) => <LivePolling key={index} pollID={itm} />)
      ) : (
        <p>NO POLLS TO SHOW</p>
      )}
    </div>
  );
}
