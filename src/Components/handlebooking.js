import { collection, doc, query, where, getDocs, setDoc } from 'firebase/firestore';
import { firestore } from '../firebase_setup/firebase'; // Adjust the path accordingly

export async function handleBooking(documentId, timeslot) {
  try {
    const bookingRef = collection(firestore, 'booking');
    const q = query(bookingRef, where('timeslot', '==', timeslot));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      console.log("Booking already exists for this timeslot");
      return false;
    }

    const bookingData = {
      timeslot: timeslot
    };

    const docRef = doc(bookingRef, documentId);
    await setDoc(docRef, bookingData);
    console.log("Booking added successfully!");
    return true;
  } catch (error) {
    console.error("Error adding booking:", error);
    return false;
  }
}
