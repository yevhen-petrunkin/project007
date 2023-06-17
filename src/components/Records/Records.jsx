import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import deleteRecord from '../../db-fucntions/deleteRecord';
import updateRecord from '../../db-fucntions/updateRecord';
import { useState, useEffect } from 'react';
import css from './Records.module.css';
import progressStages from '../../sources/progressStages';

const Records = ({ userAuth, onClick }) => {
  const [records, setRecords] = useState([]);

  const handleSelectChange = (event, id) => {
    updateRecord(userAuth, id, { progress: event.target.value });
  };

  useEffect(() => {
    const q = query(collection(db, 'applications'), orderBy('id', 'desc'));

    if (userAuth) {
      const unsub = onSnapshot(q, snapShot => {
        const list = snapShot.docs.map(doc => {
          return doc.data();
        });
        if (list) {
          console.log(list);
          setRecords(list);
        }
      });

      return unsub;
    }
  }, [db, userAuth]);

  return (
    <div>
      <button type="button" className={css.sendbtn} onClick={onClick}>
        Save Application Info
      </button>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Resource</th>
            <th>Company</th>
            <th>Position</th>
            <th>Progress</th>
            <th>URL</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {records.map(
            ({
              id,
              position,
              resource,
              vacancyUrl,
              company,
              date,
              progress,
            }) => {
              return (
                <tr key={id}>
                  <td>{date}</td>
                  <td>{resource}</td>
                  <td>{company}</td>
                  <td>{position}</td>
                  <td>
                    <select
                      name="progressStage"
                      value={progress}
                      onChange={evt => handleSelectChange(evt, id)}
                    >
                      {progressStages.map(stage => (
                        <option key={stage} value={stage}>
                          {stage}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <a
                      href={vacancyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      link
                    </a>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => deleteRecord(userAuth, id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Records;
