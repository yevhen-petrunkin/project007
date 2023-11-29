import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

async function fetchReasons(userAuth, collectionName) {
  try {
    if (userAuth) {
      const dataRef = collection(db, collectionName);
      const data = await getDocs(dataRef);

      if (!data) {
        console.log('There is no collection of reasons. Return empty array.');
        return [];
      }
      const newArr = [];
      data.forEach(item => {
        newArr.push({ ...item.data(), id: item.id });
      });
      // console.log('All reasons obtained.', newArr);
      return newArr;
    }
  } catch (error) {
    console.log(error.message);
    console.log('Failed to fetch reasons. Return empty array.');
    return [];
  }
}

export default fetchReasons;
