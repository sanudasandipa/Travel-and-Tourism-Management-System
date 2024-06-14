import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import firebase from 'firebase/compat/app'

const firebaseConfig = {
  apiKey: "AIzaSyDVj3ox_M67bHh0CdqM0xwmH7XH41sKLb0",
  authDomain: "kaya-34813.firebaseapp.com",
  projectId: "kaya-34813",
  storageBucket: "kaya-34813.appspot.com",
  messagingSenderId: "37255598437",
  appId: "1:37255598437:web:5eb70b379475ad0de9d18c",
  measurementId: "G-XWG2VXMRY9"
};

firebase.initializeApp(firebaseConfig)



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


