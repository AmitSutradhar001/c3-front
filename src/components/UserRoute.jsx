import { useEffect, useRef } from "react";
import { doc, setDoc, getFirestore } from "firebase/firestore"; // Firestore functions
import { app } from "../firebase"; // Firebase Firestore instance
import { useApi } from "../context/ApiContext";

const UserRoute = () => {
  const api = useApi();
  const db = getFirestore(app);
  const hasRun = useRef(false); // Ref to track if saveUsers has been called

  useEffect(() => {
    const saveUsers = async () => {
      try {
        const response = await api.get(import.meta.env.VITE_SIGNUP_ENDPOINT, {
          headers: {
            "Content-Type": import.meta.env.VITE_LOGIN_HEADERS,
          },
        });
        const usersData = response.data; // Extract only the data property

        const userDoc = doc(db, "usersHistory", new Date().toISOString());

        // Create a new object to save, using only necessary data
        const newRouteData = {
          users: usersData, // Store only the data you need
          savedAt: new Date().toISOString(),
        };

        // Save the data to Firestore
        await setDoc(userDoc, newRouteData, { merge: true });
      } catch (error) {
        console.error("Error saving User to Firebase:", error);
        throw error;
      }
    };

    if (!hasRun.current) {
      // Run only if hasRun is false
      hasRun.current = true;
      saveUsers();
    }
  }, []); // Empty dependency array to run only on mount

  return null;
};

export default UserRoute;
