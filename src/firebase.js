import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBb72ZpOuJR78x6ZyzgCE0EtJRq0OvoYQM",
  authDomain: "news-nexus-firebase.firebaseapp.com",
  projectId: "news-nexus-firebase",
  storageBucket: "news-nexus-firebase.appspot.com",
  messagingSenderId: "157582705459",
  appId: "1:157582705459:web:4ad9db72987ce7ed27b446"
};

export const app = initializeApp(firebaseConfig);