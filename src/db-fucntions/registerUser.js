import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../firebase';

async function registerUser(email, password) {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    console.log('User has been logged in successfully.');
    return user;
  } catch (error) {
    console.log(error.message);
    console.log('Failed to log in user. Trying to sign up.');
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log('User has been signed up successfully.');
      return user;
    } catch (error) {
      console.log(error.message);
      console.log('Failed to sign up user. Something is wrong.');
    }

    return null;
  }
}

export default registerUser;
