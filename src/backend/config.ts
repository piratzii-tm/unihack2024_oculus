import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyA_I9Pk1hKu8x-eZGMkfAgp6F5dRfvMHU0",
    authDomain: "voicenotes-82070.firebaseapp.com",
    databaseURL: "https://voicenotes-82070-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "voicenotes-82070",
    storageBucket: "voicenotes-82070.firebasestorage.app",
    messagingSenderId: "626240339689",
    appId: "1:626240339689:web:2d1a2f1c6b230d6366fa78"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app)