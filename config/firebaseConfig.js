import { initializeApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCWDQ-k1S2JsHHNJtDuj6s0RMLKw66Faaw",
  authDomain: "mobileapp-98382.firebaseapp.com",
  databaseURL: "https://mobileapp-98382-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mobileapp-98382",
  storageBucket: "mobileapp-98382.appspot.com",
  messagingSenderId: "429171795983",
  appId: "1:429171795983:web:ae33eb7fc110fc4bfc9b7a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage for session persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const database = getDatabase(app);
const storage = getStorage(app);

export { app, auth, database, storage };
