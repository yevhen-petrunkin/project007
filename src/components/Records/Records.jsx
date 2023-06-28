import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import deleteRecord from '../../db-fucntions/deleteRecord';
import updateRecord from '../../db-fucntions/updateRecord';
import { useState, useEffect } from 'react';
import css from './Records.module.css';
import progressStages from '../../sources/progressStages';
import sortRecordsByCategory from '../../services/sortRecordsByCategory';

const Records = ({ userAuth }) => {
  const [category, setCategory] = useState('date');
  const [records, setRecords] = useState({
    sortedRecords: [],
    incomingRecords: [],
  });

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
          const sortedRecords = sortRecordsByCategory(category, list);
          setRecords(prev => {
            return { ...prev, sortedRecords, incomingRecords: list };
          });
        }
      });

      return unsub;
    }
  }, [db, userAuth]);

  useEffect(() => {
    const sortedRecords = sortRecordsByCategory(
      category,
      records.incomingRecords
    );

    setRecords(prev => {
      return {
        ...prev,
        sortedRecords,
      };
    });
  }, [category]);

  return (
    <div className={css.tablebox}>
      <h2>Applications Table</h2>
      <table className={css.table}>
        <thead>
          <tr>
            <th>
              <button
                className={css.table__btn}
                type="button"
                onClick={() => setCategory('date')}
              >
                Date
              </button>
            </th>
            <th>
              <button
                className={css.table__btn}
                type="button"
                onClick={() => setCategory('resource')}
              >
                Resource
              </button>
            </th>
            <th>
              <button
                className={css.table__btn}
                type="button"
                onClick={() => setCategory('company')}
              >
                Company
              </button>
            </th>
            <th>
              <button
                className={css.table__btn}
                type="button"
                onClick={() => setCategory('position')}
              >
                Position
              </button>
            </th>
            <th>Progress</th>
            <th>URL</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {records.sortedRecords.map(
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
                      className={css.table__btn_delete}
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
