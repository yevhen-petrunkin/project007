import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { useState, useEffect } from 'react';
import css from './App.module.css';
import createRecord from '../db-fucntions/createRecord';
import addNewReason from '../db-fucntions/addNewReason';
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

    const { position, resource, vacancyUrl, company, reasons, language } = data;

    const date = new Date();
    const utcString = date.toUTCString();
    const formattedDate =
      utcString.slice(5, 16) + ', ' + utcString.slice(17, 22);

    const dataToSend = {
      id: date.getTime().toString(),
      position: position.trim(),
      resource: resource.trim(),
      vacancyUrl: vacancyUrl.trim(),
      company: company.trim(),
      date: formattedDate,
      progress: 'waiting',
    };

    createRecord(userAuth, dataToSend.id, dataToSend);

    const collectionName = language === 'english' ? 'reasonsEn' : 'reasonsUk';
    addNewReason(userAuth, collectionName, reasons);
  };

  return (
    <>
      {!userAuth && (
        <header className={css.header}>
          <RegistrationForm />
        </header>
      )}

      <main className={css.main}>
        <h1>Cover Letter Maker</h1>
        <h2>Fill In The Form</h2>
        <Form processFormData={processFormData} userAuth={userAuth} />
        <Result data={data} onClick={handleSendBtnClick} />
        <Records userAuth={userAuth} />
      </main>
    </>
  );
};

export default App;
