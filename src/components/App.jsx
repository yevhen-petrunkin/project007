import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useState, useEffect } from 'react';
import css from './App.module.css';
import createRecord from '../db-fucntions/createRecord';
import Form from './Form/Form';
import Result from './Result/Result';
import Records from './Records/Records';
import RegistrationForm from './RegistrationForm/RegistrationForm';

const App = () => {
  const [userAuth, setUserAuth] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        console.log('User Logged In');
        setUserAuth(user);
      } else {
        console.log('No User Logged In');
      }
    });
    return () => unsubscribe();
  }, []);

  const [data, setData] = useState(null);

  const processFormData = formData => {
    setData(formData);
  };

  const handleSendBtnClick = () => {
    if (!data) {
      return;
    }

    const { position, resource, vacancyUrl, company } = data;

    const date = new Date();
    const utcString = date.toUTCString();
    const formattedDate =
      utcString.slice(5, 16) + ', ' + utcString.slice(17, 22);

    const dataToSend = {
      id: date.getTime().toString(),
      position,
      resource,
      vacancyUrl,
      company,
      date: formattedDate,
      progress: 'waiting',
    };

    createRecord(userAuth, dataToSend.id, dataToSend);
  };

  return (
    <>
      <header>
        <RegistrationForm />
      </header>
      <main>
        <Form processFormData={processFormData} />
        <Result data={data} />
        <Records userAuth={userAuth} onClick={handleSendBtnClick} />
      </main>
    </>
  );
};

export default App;
