import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

function createRecord(userAuth, recordId, data) {
  try {
    const dataRef = doc(db, 'applications', recordId);
    if (userAuth) {
      setDoc(dataRef, data);
      console.log('Data recorded successfully.');
      return true;
    }
    console.log('Cannot record data. User is not registered.');
    return false;
  } catch (error) {
    console.log(error.message);
    console.log('Failed to record data.');
    return false;
  }
}

export default createRecord;
