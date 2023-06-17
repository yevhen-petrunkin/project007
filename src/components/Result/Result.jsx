import { useState, useEffect } from 'react';
import css from './Result.module.css';
import englishTemplateString from '../../sources/englishTemplate.js';
import ukrainianTemplateString from '../../sources/ukrainianTemplate.js';

const Result = ({ data, onClick }) => {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const dataString = getDataString(formData);

  function getDataString(incomingData) {
    let outcome = '';

    if (incomingData) {
      const {
        addressee,
        courtesy,
        language,
        position,
        projects,
        reasons,

        technologies,

        company,
      } = incomingData;

      const template =
        language === 'english'
          ? englishTemplateString
          : ukrainianTemplateString;

      const techString = getStringFromArray(technologies);
      const projString = getStringFromArray(projects);

      const createTemplate = new Function(
        'courtesy',
        'adressee',
        'position',
        'companyName',
        'techString',
        'projString',
        'reasons',

        'return ' + template
      );

      outcome = createTemplate(
        courtesy,
        addressee,
        position,
        company,
        techString,
        projString,
        reasons
      );
    }

    return outcome;
  }

  function getStringFromArray(arr) {
    let finalString = '';
    let array = [];
    if (typeof arr === 'string') {
      array = [arr];
    } else {
      array = [...arr];
    }

    if (array.length > 1) {
      const lastElement = array[array.length - 1];
      const otherElements = array.slice(0, array.length - 1).join(', ');
      finalString = `${otherElements} and ${lastElement}`;
    } else {
      finalString = array[0];
    }

    return finalString;
  }

  const title = formData ? formData.resultTitle : 'Your Cover Letter';

  return (
    <div className={css.resultbox}>
      <h2>{title}</h2>
      <textarea className={css.resultbox__result} value={dataString} readOnly />
      <button type="button" className={css.sendbtn} onClick={onClick}>
        Save Application Info
      </button>
    </div>
  );
};

export default Result;
