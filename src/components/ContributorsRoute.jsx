import { useEffect, useRef } from "react";
import { doc, setDoc, getFirestore } from "firebase/firestore"; // Firestore functions
import { app } from "../firebase"; // Firebase Firestore instance
import { useApi } from "../context/ApiContext";

const ContributorsRoute = () => {
  const api = useApi();
  const db = getFirestore(app);
  const hasRun = useRef(false); // Ref to track if saveUsers has been called

  useEffect(() => {
    const saveProjects = async () => {
      try {
        const response = await api.get(
          import.meta.env.VITE_CONTRIBUTOR_ENDPOINT,
          {
            headers: {
              "Content-Type": import.meta.env.VITE_CONTRIBUTOR_HEADERS,
            },
          }
        );
        const contributorsData = response.data; // Extract only the data property

        const userDoc = doc(
          db,
          "contributorsHistory",
          new Date().toISOString()
        );

        // Create a new object to save, using only necessary data
        const newRouteData = {
          contributors: contributorsData, // Store only the data you need
          savedAt: new Date().toISOString(),
        };

        // Save the data to Firestore
        await setDoc(userDoc, newRouteData, { merge: true });
      } catch (error) {
        console.error("Error saving conttributors to Firebase:", error);
        throw error;
      }
    };

    if (!hasRun.current) {
      // Run only if hasRun is false
      hasRun.current = true;
      saveProjects();
    }
  }, []); // Empty dependency array to run only on mount

  return null;
};

export default ContributorsRoute;
