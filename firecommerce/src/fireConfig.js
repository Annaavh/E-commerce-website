import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDNlNkryOxlz9uN3YOxm8UWQmczT8Dz6ls",
  authDomain: "firecommerce-2c455.firebaseapp.com",
  projectId: "firecommerce-2c455",
  storageBucket: "firecommerce-2c455.appspot.com",
  messagingSenderId: "159927348597",
  appId: "1:159927348597:web:f715c56fd8e8a28ffbf73c",
  measurementId: "G-WXC8JLTBN4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDb = getFirestore(app) //database ?
export default fireDb;