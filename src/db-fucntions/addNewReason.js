import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

async function addNewReason(userAuth, collectionName, reason) {
  try {
    if (userAuth && reason) {
      const dataRef = collection(db, collectionName);
      await addDoc(dataRef, { reason: reason.trim() });
      console.log('Reason recorded successfully.');
      return true;
    }
    console.log('Cannot add reason.');
    return false;
  } catch (error) {
    console.log(error.message);
    console.log('Failed to add reason.');
    return false;
  }
}

export default addNewReason;
