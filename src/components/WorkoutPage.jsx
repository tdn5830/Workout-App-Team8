import React, { useState, useEffect } from 'react';
import './WorkoutPage.css'
import Timer from './Timer.jsx';
import VideoPlayer from './VideoPlayer.jsx';

function WorkoutPage({ workoutList }) {
  const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false);
  const [videoLink, setVideoLink] = useState(null);
  
  const openVideoPlayer = (link) => {
    setVideoLink(link); // Update the correct youtube link for video to be played
    setIsVideoPlayerOpen(true); // Open the video player pop-up
  };

  const closeVideoPlayer = () => {
    setIsVideoPlayerOpen(false); // Close the video player pop-up
    setVideoLink(null);  // Clear the video link
  };
  return (
    <>
      <Timer time={1200}></Timer>
      <h1>Workout Page!</h1>
      <ul>
        {workoutList.map((workout, index) => (
          <li key={index} className="list-item">
            <button>Complete</button>
            <p>{workout.name}</p>
            <p>3 sets of 8</p>
            <button onClick={()=>openVideoPlayer(workout.link)}>help</button>
          </li>
        ))}
      </ul>
      <button>Finish Workout</button>
      {isVideoPlayerOpen && (
        <VideoPlayer
          videoId={videoLink}  // Pass the video link as a prop
          isOpen={isVideoPlayerOpen}  
          onClose={closeVideoPlayer}  
        />
      )}
    </>
  );
}

export default WorkoutPage;
