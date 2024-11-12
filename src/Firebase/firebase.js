import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  where, 
  getDocs, 
  updateDoc, 
  doc 
} from "firebase/firestore";  
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyALYlCcGzd4iIZMbkNWv6ST-n4cCmNGLpE",
  authDomain: "pest-control-7b557.firebaseapp.com",
  projectId: "pest-control-7b557",
  storageBucket: "pest-control-7b557.appspot.com",
  messagingSenderId: "1050948495114",
  appId: "1:1050948495114:web:1be0bec5e2d0b63490bcf3",
  measurementId: "G-CP0Q26QB4M"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, collection, addDoc, onSnapshot, query, orderBy, where, getDocs, updateDoc, doc };
