import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";

// const app = firebase.initializeApp({
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
// });

const app = firebase.initializeApp({
  apiKey: "AIzaSyBGLYExvFjyw-G7i73rnINasO0byyaXWWQ",
  authDomain: "chat-app-dev-63a07.firebaseapp.com",
  projectId: "chat-app-dev-63a07",
  storageBucket: "chat-app-dev-63a07.appspot.com",
  messagingSenderId: "979530022743",
  appId: "1:979530022743:web:53250fdea14b06ce870812"
})



export const auth = getAuth(app)
export default app;
