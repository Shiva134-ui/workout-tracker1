document.addEventListener('DOMContentLoaded', () => {
    const workoutForm = document.getElementById('workoutForm');
    const addExerciseButton = document.getElementById('addExercise');
    const workoutContainer = document.getElementById('workoutContainer');

    let exercises = [];

    // Load saved workouts from local storage on page load
    loadWorkouts();

    addExerciseButton.addEventListener('click', () => {
        const exerciseName = document.getElementById('exerciseName').value;
        const sets = document.getElementById('sets').value;
        const reps = document.getElementById('reps').value;
        const weight = document.getElementById('weight').value;

        if (exerciseName && sets && reps && weight) {
            exercises.push({ exerciseName, sets, reps, weight });
            alert('Exercise added!');
        } else {
            alert('Please fill in all exercise fields.');
        }
    });

    workoutForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const workoutName = document.getElementById('workoutName').value;
        const workoutDate = document.getElementById('workoutDate').value;

        if (workoutName && workoutDate) {
            const workout = {
                workoutName,
                workoutDate,
                exercises
            };

            saveWorkout(workout);  // Save to local storage
            displayWorkout(workout); // Display workout immediately

            exercises = [];  // Clear exercises array for new workout
            workoutForm.reset();  // Reset form fields
        } else {
            alert('Please fill in all workout fields.');
        }
    });

    function displayWorkout(workout) {
        const workoutDiv = document.createElement('div');
        workoutDiv.classList.add('workout');

        let workoutHTML = `<h3>${workout.workoutName} - ${workout.workoutDate}</h3><ul>`;
        workout.exercises.forEach(exercise => {
            workoutHTML += `<li>${exercise.exerciseName} - ${exercise.sets} sets x ${exercise.reps} reps @ ${exercise.weight} kg</li>`;
        });
        workoutHTML += '</ul>';

        workoutDiv.innerHTML = workoutHTML;
        workoutContainer.appendChild(workoutDiv);
    }

    function saveWorkout(workout) {
        let workouts = JSON.parse(localStorage.getItem('workouts')) || [];
        workouts.push(workout);
        localStorage.setItem('workouts', JSON.stringify(workouts));
    }

    function loadWorkouts() {
        const workouts = JSON.parse(localStorage.getItem('workouts')) || [];
        workouts.forEach(displayWorkout);
    }
});

