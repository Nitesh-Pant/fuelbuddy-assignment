// src/firebase/config.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD0sRtJV8mP2vlkx8ziFp8gN5AY379hAxY",
    authDomain: "shared-to-do-a8b64.firebaseapp.com",
    projectId: "shared-to-do-a8b64",
    storageBucket: "shared-to-do-a8b64.firebasestorage.app",
    messagingSenderId: "506612386567",
    appId: "1:506612386567:web:7e285e9661aeeb550893a2",
    measurementId: "G-W5DDH4YTPL"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
