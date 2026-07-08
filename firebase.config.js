const firebaseConfig = {
  apiKey: "AIzaSyCV2FayZ5NssuzZjThCY7UlSx3728yYYsA",
  authDomain: "perpustakaan-829f4.firebaseapp.com",
  projectId: "perpustakaan-829f4",
  storageBucket: "perpustakaan-829f4.firebasestorage.app",
  messagingSenderId: "100763174486",
  appId: "1:100763174486:web:09f531aa57dc274fea1df7",
};

// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);

// Hubungkan ke Firestore
const db = firebase.firestore();