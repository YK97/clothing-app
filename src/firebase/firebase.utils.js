import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDmbSGSjvn-xTTgaiADkMpEsIJXcwF0Qww",
    authDomain: "clothing-app-a19fa.firebaseapp.com",
    databaseURL: "https://clothing-app-a19fa.firebaseio.com",
    projectId: "clothing-app-a19fa",
    storageBucket: "clothing-app-a19fa.appspot.com",
    messagingSenderId: "381437491485",
    appId: "1:381437491485:web:d0e31da0cd1d854f5d49f4",
    measurementId: "G-HNN583N9GB"
  };

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
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();


const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
