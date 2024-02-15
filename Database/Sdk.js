import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAeGwRUaIMsuLm99ND6aISH2EgcDWwPv_k",
  authDomain: "todom-437b5.firebaseapp.com",
  projectId: "todom-437b5",
  storageBucket: "todom-437b5.appspot.com",
  messagingSenderId: "159147953303",
  appId: "1:159147953303:web:9345ec0ef195110b762dd2",
  measurementId: "G-JNHPTXR8RW",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
