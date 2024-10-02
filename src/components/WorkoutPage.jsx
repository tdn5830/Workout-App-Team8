import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation to access state
import './WorkoutPage.css'
import Timer from './Timer.jsx';
import VideoPlayer from './VideoPlayer.jsx';

// This component accepts a prop (workoutList). Instead of the typical syntax for accepting props, useLocation is used
function WorkoutPage() {

  // Use useLocation to retrieve the workoutList passed from the previous page
  const location = useLocation();
  const workoutList = location.state?.workoutList || []; 

  const [isWorkoutLoaded, setIsWorkoutLoaded] = useState(false); // State to track if workout is loaded
  const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false);
  const [videoLink, setVideoLink] = useState(null);

  useEffect(() => {
    // Check if workoutList has exercises before marking it as loaded
    if (workoutList && workoutList.length > 0) {
      setIsWorkoutLoaded(true);
    }
  }, [workoutList]);
  
  const openVideoPlayer = (link) => {
    setVideoLink(link); // Update the correct youtube link for video to be played
    setIsVideoPlayerOpen(true); // Open the video player pop-up
  };

  const closeVideoPlayer = () => {
    setIsVideoPlayerOpen(false); // Close the video player pop-up
    setVideoLink(null);  // Clear the video link
  };

  // Only render content if the workoutList is properly loaded
  if (!isWorkoutLoaded) {
    return <p>Loading workout...</p>; // Show a loading message until workoutList is loaded
  }
  
  return (
    <>
      <Timer time={1200}></Timer>
      <h1>Workout Page!</h1>
      <ul>
        {workoutList.map((workout, index) => (
          <li key={index} className="list-item">
            <button>Complete</button>
            <p>{workout.name}</p>
            <p>2 Sets | 8 Reps</p>
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
