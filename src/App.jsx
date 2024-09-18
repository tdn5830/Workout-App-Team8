import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import HomePage from './components/HomePage.jsx';
import WorkoutGenerator from './components/WorkoutGenerator.jsx'
import WorkoutPage from './components/WorkoutPage.jsx';
import WorkoutList from './exerciseDatabase/db.json';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/workoutGenerator" element={<WorkoutGenerator />} />
        <Route path="/workoutPage" element={<WorkoutPage workoutList={WorkoutList} />} />
      </Routes>
    </Router>
  );
}
  
  export default App
  
