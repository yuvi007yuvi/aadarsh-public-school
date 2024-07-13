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
const storage = firebase.storage();

// Function to create a post
document.getElementById('blog-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const photo = document.getElementById('photo').files[0];

    if (photo) {
        try {
            const storageRef = storage.ref();
            const photoRef = storageRef.child('photos/' + photo.name);
            const snapshot = await photoRef.put(photo);
            const url = await snapshot.ref.getDownloadURL();

            await db.collection('posts').add({
                title: title,
                content: content,
                photoUrl: url,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });

            document.getElementById('blog-form').reset();
            alert('Post uploaded successfully!');
        } catch (error) {
            console.error('Error uploading document: ', error);
            alert('Error uploading document: ' + error.message);
        }
    } else {
        alert('Please select a photo.');
    }
});
