// handlesubmit.js
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "./firebase"; // Adjust the path accordingly

const handleSubmit = async (details) => {
    const ref = collection(firestore, "details"); // Firebase creates this automatically

    // Check if the entry already exists in the database
    const q = query(ref, where("details", "==", details));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        // If entry already exists, log a message and return
        console.log("Entry already exists in the database");
        return;
    }

    // If entry does not exist, add it to the database
    let data = {
        details: details
    }

    try {
        await addDoc(ref, data);
        console.log("Data added successfully");
    } catch(err) {
        console.error("Error adding data:", err);
    }
}

export default handleSubmit;