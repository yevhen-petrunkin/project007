import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

function deleteReason(userAuth, collectionName, reasonId) {
  try {
    const dataRef = doc(db, collectionName, reasonId);
    if (userAuth) {
      deleteDoc(dataRef);
      console.log('Data deleted successfully.');
      return true;
    }
    console.log('Cannot delete data. User is not registered.');
    return false;
  } catch (error) {
    console.log(error.message);
    console.log('Failed to delete data.');
    return false;
  }
}

export default deleteReason;
