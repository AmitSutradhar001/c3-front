import { useEffect, useRef, useState } from "react";
import {
  doc,
  collection,
  setDoc,
  getDocs,
  deleteDoc,
  getFirestore,
} from "firebase/firestore"; // Firestore functions
import { app } from "../firebase"; // Firebase Firestore instance

const PreviousRoutes = () => {
  const db = getFirestore(app);
  const effectRan = useRef(false); // This will track if the effect has run

  // State variables to manage status and error messages
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Function to fetch all routes from the "track" collection
  const fetchAllRoutes = async () => {
    const trackCollection = collection(db, "track");
    try {
      const querySnapshot = await getDocs(trackCollection);
      const allRoutes = [];
      querySnapshot.forEach((doc) => {
        allRoutes.push({ id: doc.id, ...doc.data() });
      });
      return allRoutes;
    } catch (error) {
      console.error("Error fetching route data:", error);
      setErrorMessage("Error fetching route data.");
      return [];
    }
  };

  // Function to save routes to the "trackhistory" collection
  const saveRoute = async (routes) => {
    try {
      const userDoc = doc(db, "trackhistory", new Date().toISOString());

      // Create a new object to save
      const newRouteData = {
        routes,
        savedAt: new Date().toISOString(), // Adding a timestamp
      };

      // Save the routes to Firestore
      await setDoc(userDoc, newRouteData, { merge: true });
      setStatusMessage("Data stored successfully in track history.");
    } catch (error) {
      console.error("Error saving route to Firebase:", error);
      setErrorMessage("Error saving route to Firebase.");
      throw error; // Re-throw the error to handle it in the caller
    }
  };

  // Function to delete all routes from the "track" collection
  const deleteAllRoutes = async () => {
    const trackCollection = collection(db, "track");
    try {
      const querySnapshot = await getDocs(trackCollection);
      const deletePromises = [];
      querySnapshot.forEach((doc) => {
        deletePromises.push(deleteDoc(doc.ref));
      });
      await Promise.all(deletePromises); // Wait for all deletions to complete
      setStatusMessage("Data deleted from track collection.");
    } catch (error) {
      console.error("Error deleting route data:", error);
      setErrorMessage("Error deleting route data.");
    }
  };

  useEffect(() => {
    if (effectRan.current) {
      return;
    }
    effectRan.current = true;

    const preRoutes = async () => {
      try {
        const fetchData = await fetchAllRoutes();
        if (fetchData && fetchData.length > 0) {
          await saveRoute(fetchData); // Attempt to save data
          await deleteAllRoutes(); // Only proceed to delete if save was successful
        } else {
          setStatusMessage("Track collection is empty.");
        }
      } catch (error) {
        console.error("Error in processing routes:", error); // Handle errors if any step fails
        setErrorMessage("Error in processing routes.");
      }
    };
    preRoutes();
  }, [db]);

  return (
    <div>
      <h1>Previous Routes</h1>
      {statusMessage && <p>{statusMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default PreviousRoutes;
