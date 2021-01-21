import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyC1LKp-WRY-w8juxdPDcYf5z5Vhvyu8kWI",
  authDomain: "crown-db-eb640.firebaseapp.com",
  projectId: "crown-db-eb640",
  storageBucket: "crown-db-eb640.appspot.com",
  messagingSenderId: "433092757009",
  appId: "1:433092757009:web:f3a868c6848b9fc4e213b0",
  measurementId: "G-BH8L5QQ0M6"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
