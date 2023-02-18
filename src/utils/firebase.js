import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import config from "config";

// Initialize Firebase
export const app = initializeApp(config.firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
