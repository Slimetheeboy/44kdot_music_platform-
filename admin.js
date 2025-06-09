
const firebaseConfig = {
  apiKey: "AIzaSyD9ytYejDuuJg2oGJdKHyjhmK3sC98Djkg",
  authDomain: "kdot-distribution.firebaseapp.com",
  projectId: "kdot-distribution",
  storageBucket: "kdot-distribution.appspot.com",
  messagingSenderId: "664065044961",
  appId: "1:664065044961:web:0a718f62142774f48922a0"
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

firebase.auth().onAuthStateChanged(user => {
  if (!user) {
    alert("Please login");
    window.location.href = "login.html";
  }
});

db.collection("tracks").orderBy("timestamp", "desc").onSnapshot(snapshot => {
  const container = document.getElementById("pendingTracks");
  container.innerHTML = "";
  snapshot.forEach(doc => {
    const track = doc.data();
    const div = document.createElement("div");
    div.innerHTML = `
      <strong>${track.title}</strong> by ${track.artist}
      <br><audio controls src="${track.audio}"></audio>
      ${track.video ? `<br><video controls width="300" src="${track.video}"></video>` : ""}
      <br><button onclick="deleteTrack('${doc.id}')">Delete</button>
      <hr>`;
    container.appendChild(div);
  });
});

function deleteTrack(id) {
  db.collection("tracks").doc(id).delete();
}
