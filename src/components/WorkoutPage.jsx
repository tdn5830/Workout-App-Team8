import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation to access state
import './WorkoutPage.css'
import Timer from './Timer.jsx';
import VideoPlayer from './VideoPlayer.jsx';
import HelpIcon from '../local_assets/helpSVG.jsx';
import Banner from './Banner.jsx';

// This component accepts a prop (workoutList). Instead of the typical syntax for accepting props, useLocation is used
function WorkoutPage() {

  // Use useLocation to retrieve the workoutList passed from the previous page
  const location = useLocation();
  const workoutList = location.state?.workoutList || []; 
  const workoutTimeInMinutes = location.state?.time || 0; // Time in minutes
  const workoutTimeInSeconds = workoutTimeInMinutes * 60; // Convert minutes to seconds

  const [isWorkoutLoaded, setIsWorkoutLoaded] = useState(false); // State to track if workout is loaded
  const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false);
  const [videoLink, setVideoLink] = useState(null);
  const [activeWorkouts, setActiveWorkouts] = useState(workoutList);
  const [completedWorkouts, setCompletedWorkouts] = useState([]);
  const [progress, setProgress] = useState(0); // State for progress bar

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

  const handleComplete = (index) => {
    const completedWorkout = activeWorkouts[index];
    // Move the workout to the completed list
    setCompletedWorkouts([...completedWorkouts, completedWorkout]);
    // Remove from active list
    setActiveWorkouts(activeWorkouts.filter((_, i) => i !== index));

    setProgress(((completedWorkouts.length + 1) / workoutList.length) * 100); // Update progress bar
  };

  // Only render content if the workoutList is properly loaded
  if (!isWorkoutLoaded) {
    return <p>Loading workout...</p>; // Show a loading message until workoutList is loaded
  }
  
  return (
    <div className="parentContainerWorkout">
      <Banner/>
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>

      <Timer time={workoutTimeInSeconds} />
      <div className='list-container'>
        {/* Active Workouts */}
        <ul>
          {activeWorkouts.map((workout, index) => (
            <li key={index} className="list-item">
              <button
                className="checklistButton"
                onClick={() => handleComplete(index)}
              ></button>
              <p>{workout.name}</p>
              <p>2 Sets | 8 Reps</p>
              <button className="help-button" onClick={() => openVideoPlayer(workout.link)}><HelpIcon></HelpIcon></button>
            </li>
          ))}
        </ul>

        {/* Graveyard List (Initially hidden until items are completed) */}
        {completedWorkouts.length > 0 && (
          <ul>
            {completedWorkouts.map((workout, index) => (
              <li key={index} className="list-item completed">
              <button
                className="checklistButton inactive"
                disabled
              ></button>
              <p>{workout.name}</p>
              <p>2 Sets | 8 Reps</p>
              <button className="help-button inactive" disabled>help</button>
            </li>
            ))}
          </ul>
        )}
      </div>

      <button>Finish Workout</button>

      {isVideoPlayerOpen && (
        <VideoPlayer
          videoId={videoLink}
          isOpen={isVideoPlayerOpen}
          onClose={closeVideoPlayer}
        />
      )}
    </div>
  );
}

export default WorkoutPage;
