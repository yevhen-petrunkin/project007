import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

function updateRecord(userAuth, recordId, data) {
  try {
    const dataRef = doc(db, 'applications', recordId);
    if (userAuth) {
      updateDoc(dataRef, data);
      console.log('Data updated successfully.');
      return true;
    }
    console.log('Cannot update data. User is not registered.');
    return false;
  } catch (error) {
    console.log(error.message);
    console.log('Failed to update data.');
    return false;
  }
}

export default updateRecord;
