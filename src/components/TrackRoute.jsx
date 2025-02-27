import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { doc, setDoc, getDoc, getFirestore } from "firebase/firestore"; // Firestore functions
import { app } from "../firebase"; // Firebase Firestore instance
import { useSelector } from "react-redux";

// Middleware Component to track user routing flow
const TrackRoute = () => {
  const db = getFirestore(app);
  const location = useLocation(); // Get current route
  //   const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (!user?.user_id || !user?.email) {
      return; // If user is not logged in, do not track
    }

    const saveRoute = async (route) => {
      try {
        const userDoc = doc(
          db,
          "track",
          String(`${user?.email}_${user?.user_id}`)
        );

        // Get the existing routes
        const docSnap = await getDoc(userDoc);
        let existingRoutes = [];

        if (docSnap.exists()) {
          // If the document exists, get the existing routes
          existingRoutes = docSnap.data().routes || []; // Ensure it's an array
        }
        // Create a new route object with a timestamp
        const newRoute = {
          route, // Spread existing route properties
          timestamp: new Date().toISOString(), // Add timestamp
        };
        // Add the new route to the existing routes
        existingRoutes.push(newRoute);

        // Save the updated routes array to Firestore
        await setDoc(
          userDoc,
          { routes: existingRoutes }, // Save the entire routes array
          { merge: true } // Merge with existing data
        );
      } catch (error) {
        console.error("Error saving route to Firebase:", error);
      }
    };

    // Save current route on every route change
    saveRoute(location.pathname);

    // Optional: Navigate to the next page programmatically
    // Example: navigate('/some-route');
  }, [location, user?.user_id, db, user?.email]);
  console.log("User ID:", user?.user_id);
  console.log("Route being saved:", location.pathname);

  return null; // This component doesn't render anything
};

export default TrackRoute;
