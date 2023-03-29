// Import the functions you need from the SDKs y
import {initializeApp} from 'firebase/app';
import {
  addDoc,
  collection,
  getFirestore,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from 'firebase/auth';
import {firebaseConfig} from './config';
import {useRef} from 'react';

const app = initializeApp (firebaseConfig);
export const auth = getAuth (app);
export const db = getFirestore (app);

export const GoogleProvider = new GoogleAuthProvider ();

// Add custom providers
GoogleProvider.setCustomParameters ({prompt: 'select_account'});

export const handleUserProfile = async (user, data) => {
  if (!user) return;
  const {uid} = user.currentUser;
  // console.log (uid);
  // const {displayName, email, uid} = user.currentUser;
  // try {
  //   var userRef = await addDoc (collection (db, `users`), {
  //     displayName,
  //     email,
  //     createdAt: serverTimestamp (),
  //     ...data,
  //   });
  // } catch (err) {
  //   console.log (err);
  // }

  // return userRef;
  const userRef = doc (`users/${uid}`);
  const snapshot = await userRef.get ();

  if (!snapshot.exists) {
    const {displayName, email} = user.currentUser;
    const userRoles = ['user'];
    try {
      await useRef.set ({
        displayName,
        email,
        createdAt: serverTimestamp (),
        userRoles,
        ...data,
      });
    } catch (err) {
      // console.log (err + 'FAILED!!!');
    }
  }
  return userRef;
};

export const getCurrentuser = () => {
  return new Promise ((resolve, reject) => {
    const unsubscribe = onAuthStateChanged (user => {
      unsubscribe ();
      resolve (user);
    }, reject);
  });
};
