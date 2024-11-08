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



// Firebase configuration (replace with your own Firebase project settings)
const firebaseConfig = {
    apiKey: "AIzaSyCl28Pl70pXRLYFmsO6ZyyB0JiXIVdalrM",
    authDomain: "fit-log-ec7c2.firebaseapp.com",
    projectId: "fit-log-ec7c2",
    storageBucket: "fit-log-ec7c2.appspot.com",
    messagingSenderId: "262700364589",
    appId: "1:262700364589:web:ea3851cbd3a6bcc650d9a4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Check if user is logged in
if (localStorage.getItem('isLoggedIn') === 'true') {
    document.getElementById('loginContainer').classList.add('hidden');
    document.getElementById('profileIcon').classList.remove('hidden');
} else {
    document.getElementById('loginContainer').classList.remove('hidden');
}

// Handle Login
document.getElementById('loginButton').addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // Store login status in localStorage
        localStorage.setItem('isLoggedIn', 'true');

        // Save user info in Firestore (if needed)
        await db.collection('users').doc(user.uid).set({
            email: user.email,
            lastLogin: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

        // Hide login form and show profile icon
        document.getElementById('loginContainer').classList.add('hidden');
        document.getElementById('profileIcon').classList.remove('hidden');
    } catch (error) {
        console.error("Login error:", error.message);
        alert("Login failed. Please check your credentials.");
    }
});

// Handle Logout (Optional: You can add a logout button and logic)
function logout() {
    auth.signOut().then(() => {
        localStorage.removeItem('isLoggedIn');
        document.getElementById('loginContainer').classList.remove('hidden');
        document.getElementById('profileIcon').classList.add('hidden');
    }).catch(error => {
        console.error("Logout error:", error.message);
    });
}


const app = firebase.initializeApp(firebaseConfig);



// Function to change the profile icon image after login
function updateProfileIcon() {
    const profileIcon = document.getElementById("profileIcon");
    
    if (profileIcon) {
        // Change the profile image to a new one after login
        profileIcon.querySelector("img").src = "logged-in-profile.jpg";
    }
}

// Simulate login and call `updateProfileIcon`
document.querySelector(".login-box form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission for demo purposes
    updateProfileIcon(); // Update the icon
});
