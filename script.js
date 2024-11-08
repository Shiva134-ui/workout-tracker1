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




const firebaseConfig = {
    apiKey: "AIzaSyD4g4wgxe8Tvc9JgMX27tEv6jcqh10aahM",
    authDomain: "auth-fit-log.firebaseapp.com",
    databaseURL: "https://auth-fit-log-default-rtdb.firebaseio.com",
    projectId: "auth-fit-log",
    storageBucket: "auth-fit-log.firebasestorage.app",
    messagingSenderId: "1093830165635",
    appId: "1:1093830165635:web:e70daaa9ec0569419687b6"
  };
  
  // initialize firebase
  firebase.initializeApp(firebaseConfig);
  
  // reference your database
  var contactFormDB = firebase.database().ref("contactForm");
  
  document.getElementById("contactForm").addEventListener("submit", submitForm);
  
  function submitForm(e) {
    e.preventDefault();
  
    var name = getElementVal("name");
    var password = getElementVal("password");
    saveMessages(name, password);
  
  
    //   reset the form
    document.getElementById("contactForm").reset();
  }
  
  const saveMessages = (name, password) => {
    var newContactForm = contactFormDB.push();
  
    newContactForm.set({
      name: name,
      password: password,
    });
  };
  
  const getElementVal = (id) => {
    return document.getElementById(id).value;
  };
