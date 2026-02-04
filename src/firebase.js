import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyByA0a2eIPvozOlTTsw3E_0EnATn1cgtd4",
  authDomain: "nafes-quiz-5f0ee.firebaseapp.com",
  projectId: "nafes-quiz-5f0ee",
  storageBucket: "nafes-quiz-5f0ee.appspot.com",
  messagingSenderId: "100330179052",
  appId: "1:100330179052:web:9f3235d9991e885dd458c9"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);