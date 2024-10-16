import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom'; // Import useLocation to access state
import exerciseDatabase from '../exerciseDatabase/dbcat.json'; 
import './WorkoutGenerator.css';

function WorkoutGenerator() {
    const location = useLocation();
    const formData = location.state?.formData || {}; // Access formData from location state

    const [workout, setWorkout] = useState([]);

    useEffect(() => {
        if (Object.keys(formData).length > 0) {

            if (formData.target === "fullbody")
            {
                generateFullBodyWorkout();
            }
            else
            {
                generateArmLegWorkout();
            }
        }
    }, [formData]);

    //Algorithm for fullbody workout
    const generateFullBodyWorkout = () => {
        //user input variables
        const totalTime = formData.time;
        const userEquipmentArray = formData.equipment;
        const userDifficultyLevel = formData.difficulty;

        let possiblePull = [];
        let possiblePush = [];
        let possibleHinge = [];

        // 1. Determine number of exercises from each category (Pull, Push, Hinge) determined by time

        let numberPullExercises = 0;
        let numberPushExercises = 0;
        let numberHingeExercises = 0;
    
        if (totalTime >= 15 && totalTime <= 19) {
            numberPushExercises = 2;
            numberPullExercises = 1;
            numberHingeExercises = 1;
        } else if (totalTime >= 20 && totalTime <= 29) {
            numberPushExercises = 2;
            numberPullExercises = 2;
            numberHingeExercises = 1;
        } else if (totalTime >= 30 && totalTime <= 60) {
            numberPushExercises = 2;
            numberPullExercises = 2;
            numberHingeExercises = 2;
        } 

        // 2. Loop through equipment array and find possible Pull, Push, Hinge exercises

        // Find possible Push exercises
        userEquipmentArray.forEach(equipmentItem => {
            exerciseDatabase.push.forEach(exercise => {
                if (exercise.equipment === equipmentItem) {
                    possiblePush.push(exercise);
                }
            });
        });

        // Find possible Pull exercises
        userEquipmentArray.forEach(equipmentItem => {
            exerciseDatabase.pull.forEach(exercise => {
                if (exercise.equipment === equipmentItem) {
                    possiblePull.push(exercise);
                }
            });
        });

        //Find possible Hinge exercises
        userEquipmentArray.forEach(equipmentItem => {
            exerciseDatabase.hinge.forEach(exercise => {
                if (exercise.equipment === equipmentItem) {
                    possibleHinge.push(exercise);
                }
            });
        });
        

        // 4. Filter by difficulty, keeping exercises that are less than or equal to the difficulty level
        possiblePush = possiblePush.filter(exercise => exercise.difficulty <= userDifficultyLevel);
        possiblePull = possiblePull.filter(exercise => exercise.difficulty <= userDifficultyLevel);
        possibleHinge = possibleHinge.filter(exercise => exercise.difficulty <= userDifficultyLevel);

        // 5. Combine all three exercise arrays into a final list of exercises

        /*
            assume in the json db, a new attribute added to each exercise is called "group"

            exercises are sometimes chosen but theyre the same group type (like dumbell press and kettlebell press)

            add logic in the random selection process that when a new exercise is picked, we filter the array of possible exercises to exclude exercies that are in the same "group"

            if an exercise doesnt belong in a group, then the default value is "none", so make sure that we're also not filtering by "none"
        */
        const getRandomExercises = (exerciseList, count) => {
            const selectedExercises = [];
            for (let i = 0; i < count; i++) {
                const randomIndex = Math.floor(Math.random() * exerciseList.length);
                selectedExercises.push(exerciseList[randomIndex]);
                // Remove the selected exercise to avoid duplicates
                exerciseList.splice(randomIndex, 1);
            }
            return selectedExercises;
        };

        const finalExerciseList = [
            ...getRandomExercises(possiblePush, numberPushExercises),
            ...getRandomExercises(possiblePull, numberPullExercises),
            ...getRandomExercises(possibleHinge, numberHingeExercises)
        ];


        setWorkout(finalExerciseList);
    };

    const generateArmLegWorkout = () => {
        let x = 20;
    };

    return (
        <div>
            <h1>Your Generated Workout</h1>
            {workout.length === 0 ? (
                <p>No exercises found for the selected criteria.</p>
            ) : (
                <div>
                <h2>Estimated Time: {formData.time} minutes</h2>
                <ul>
                    {workout.map((exercise, index) => (
                        <li key={index}>
                            <strong>{exercise.name}</strong> - {exercise.equipment} 
                        </li>
                    ))}
                </ul>
                <Link 
                        to="/workoutPage"
                        state={{ workoutList: workout, time: formData.time  }}  
                >
                    <button className='button'>Start Workout</button>
                </Link>
            </div>
            )}

        </div>
    );
}

export default WorkoutGenerator;