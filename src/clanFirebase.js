import { getDatabase, ref, push, set, get, child } from "firebase/database";

export function writeClanData(name, data) {
  const db = getDatabase();
  // Create a reference to the 'users' node and push a new user with a unique ID
  const newUserRef = push(ref(db, name));

  // Use the set() method to store the user's data under the new reference
  set(newUserRef, data);
}

export async function fetchClanData(name) {
  const db = getDatabase();
  const dbRef = ref(db);

  try {
    // Fetch data from the 'clans' node
    const snapshot = await get(child(dbRef, name));
    if (snapshot.exists()) {
      const data = snapshot.val();
      const firstClanData = Object.values(data)[0]; // Get the first data entry
      return firstClanData;
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error) {
    console.error("Error fetching clan war-log data:", error);
    return null;
  }
}
