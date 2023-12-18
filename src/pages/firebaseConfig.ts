import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect } from 'react';

const firebaseConfig = {
  apiKey: "AIzaSyABgQw6IggVJbEZP4elv685Xm8JjS5fQ-o",
  authDomain: "life-notes-uas.firebaseapp.com",
  projectId: "life-notes-uas",
  storageBucket: "life-notes-uas.appspot.com",
  messagingSenderId: "398144432472",
  appId: "1:398144432472:web:4545c63e79ab36e96f5d2d",
  measurementId: "G-1CHSYWBDBE"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export async function loginUser(email: string, password: string) {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    console.log(res);
    return true;
  } catch (error: any) {
    console.error(error);
    return false;
  }
}

export async function registerUser(email: string, password: string) {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    console.log(res);
    return true;
  } catch (error) {
    return false;
  }
}