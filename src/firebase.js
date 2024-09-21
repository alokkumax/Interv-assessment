import firebase from "firebase/compat/app";
import 'firebase/compat/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyD98voTMZqsEvce71Hz5pq6AZM0qJk28EI",
    authDomain: "interv-88552.firebaseapp.com",
    projectId: "interv-88552",
    storageBucket: "interv-88552.appspot.com",
    messagingSenderId: "364821318037",
    appId: "1:364821318037:web:c764f4c320521984270e9c",
    measurementId: "G-Q51YKWFPZL"
  };
  
  // Initialize Firebase
  const app =firebase.initializeApp(firebaseConfig);
  export const db= firebase.firestore()