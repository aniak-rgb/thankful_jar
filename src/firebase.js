import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/firestore";
import "firebase/auth";




const firebaseConfig = {
  apiKey: "AIzaSyAx09rip-6blxttoY2P2Gucsuv-fzZHRwE",
  authDomain: "gratitude-jar-cd346.firebaseapp.com",
  projectId: "gratitude-jar-cd346",
  storageBucket: "gratitude-jar-cd346.appspot.com",
  messagingSenderId: "173828965398",
  appId: "1:173828965398:web:51186cc88431507e14a137",
  measurementId: "G-QNHBLHF7G3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();



export const db = firebase.firestore();