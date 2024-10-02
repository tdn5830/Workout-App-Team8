import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import HomePage from './components/HomePage.jsx';
import InputForm from './components/InputForm.jsx'
import WorkoutPage from './components/WorkoutPage.jsx';
import WorkoutGenerator from './components/WorkoutGenerator.jsx';
import WorkoutList from './exerciseDatabase/db.json';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/inputForm" element={<InputForm />} />
        <Route path="/workoutPage" element={<WorkoutPage />} />
        <Route path="/workoutGenerator" element={<WorkoutGenerator />} />
      </Routes>
    </Router>
  );
}
  
  export default App
  
