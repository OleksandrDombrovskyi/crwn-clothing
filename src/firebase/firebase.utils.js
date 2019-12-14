import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBgwmEoBQqYZj5Y6qNOaVV9uN9fm5-kzV8",
    authDomain: "crown-db-87c90.firebaseapp.com",
    databaseURL: "https://crown-db-87c90.firebaseio.com",
    projectId: "crown-db-87c90",
    storageBucket: "crown-db-87c90.appspot.com",
    messagingSenderId: "642940169351",
    appId: "1:642940169351:web:1774985a15c960bde6dc22"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);
