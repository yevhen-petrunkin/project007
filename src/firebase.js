import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAql4LCfbnzfp_bBZqv-f_5Km2RgJucBys',
  authDomain: 'cover-letter-maker.firebaseapp.com',
  projectId: 'cover-letter-maker',
  storageBucket: 'cover-letter-maker.appspot.com',
  messagingSenderId: '261830690164',
  appId: '1:261830690164:web:c2b2f3feb6180a836a5821',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
