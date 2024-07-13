// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyChd6P0cKJ3fEiHRK-jw4eIiWmRtIonU4M",
    authDomain: "adarsh-school-2eb94.firebaseapp.com",
    projectId: "adarsh-school-2eb94",
    storageBucket: "adarsh-school-2eb94.appspot.com",
    messagingSenderId: "1038630956106",
    appId: "1:1038630956106:web:7d4f2fd56c38c447cfcab3",
    measurementId: "G-TNC22LP5PG"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Function to load posts
function loadPosts() {
    db.collection('posts').orderBy('timestamp', 'desc').get().then((querySnapshot) => {
        const postsContainer = document.getElementById('posts-container');
        postsContainer.innerHTML = '';

        querySnapshot.forEach((doc) => {
            const post = doc.data();
            const postElement = document.createElement('div');
            postElement.classList.add('col-md-6', 'mb-3');
            postElement.innerHTML = `
                <div class="card h-100">
                    <img src="${post.photoUrl}" class="card-img-top" alt="${post.title}">
                    <div class="card-body">
                        <h5 class="card-title">${post.title}</h5>
                        <p class="card-text">${post.content}</p>
                        <p class="card-text"><small class="text-muted">${new Date(post.timestamp.toDate()).toLocaleString()}</small></p>
                    </div>
                </div>
            `;
            postsContainer.appendChild(postElement);
        });
    });
}

// Load posts on page load
window.onload = loadPosts;