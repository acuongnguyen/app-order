import { getApp, getApps, initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDd8kcIPu66PW6D4rY77A0YwoQuSAxi5rU",
  authDomain: "order-app-2c1b0.firebaseapp.com",
  databaseURL: "https://order-app-2c1b0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "order-app-2c1b0",
  storageBucket: "order-app-2c1b0.appspot.com",
  messagingSenderId: "189823686963",
  appId: "1:189823686963:web:12d18e088af9d78afcc646"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
