document.addEventListener('DOMContentLoaded', () => {
    const workoutForm = document.getElementById('workoutForm');
    const addExerciseButton = document.getElementById('addExercise');
    const workoutContainer = document.getElementById('workoutContainer');

    let exercises = [];

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
            displayWorkout(workoutName, workoutDate, exercises);
            exercises = [];  
            workoutForm.reset();  
        } else {
            alert('Please fill in all workout fields.');
        }
    });

    function displayWorkout(workoutName, workoutDate, exercises) {
        const workoutDiv = document.createElement('div');
        workoutDiv.classList.add('workout');

        let workoutHTML = `<h3>${workoutName} - ${workoutDate}</h3><ul>`;
        exercises.forEach(exercise => {
            workoutHTML += `<li>${exercise.exerciseName} - ${exercise.sets} sets x ${exercise.reps} reps @ ${exercise.weight} kg</li>`;
        });
        workoutHTML += '</ul>';

        workoutDiv.innerHTML = workoutHTML;
        workoutContainer.appendChild(workoutDiv);
    }
});
