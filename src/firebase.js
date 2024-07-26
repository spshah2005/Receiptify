import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const app = firebase.initializeApp ({
    // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    // appId: process.env.REACT_APP_FIREBASE_APP_ID
    //TODO: why don't the local env variables work?
    apiKey: "AIzaSyBZmjXhxtxN7NkLMxoVEev5tPWsUkLA92g",
    authDomain: "receiptify-de2c2.firebaseapp.com",
    projectId: "receiptify-de2c2",
    storageBucket: "receiptify-de2c2.appspot.com",
    messagingSenderId: "60294361206",
    appId: "1:60294361206:web:231a744478564517a7af57",
    measurementId: "G-B745313PHD"
})

export const auth = app.auth()
export default app