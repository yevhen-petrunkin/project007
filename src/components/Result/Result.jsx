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
        extraSkills,
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
      const skillString = getStringFromArray(extraSkills); // Check data that are passed into this function instance. When chosen only one skill data is not iterable.

      const createTemplate = new Function(
        'courtesy',
        'adressee',
        'position',
        'companyName',
        'techString',
        'projString',
        'skillString',
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
        skillString,
        reasons
      );
    }

    return outcome;
  }

  function getStringFromArray(arr) {
    let finalString = '';
    let array = [];
    if (!Array.isArray(arr)) {
      array = [arr];
    } else {
      array = [...arr];
    }

    const isEnglish = formData.language.toLowerCase() === 'english';

    const andConj = isEnglish ? 'and' : 'та';

    if (array.length > 1) {
      const lastElement = array[array.length - 1];
      const firstElement = array[0];

      if (typeof lastElement === 'object') {
        let firstString = '';

        if (isEnglish) {
          firstString = 'my ' + firstElement.value.skill;
        } else {
          firstString = firstElement.value.myWord + firstElement.value.skill;
        }

        const lastString = lastElement.value.skill;

        const otherElements = array.slice(1, array.length - 1);

        const formattedElements = [];

        otherElements.forEach(elm => formattedElements.push(elm.value.skill));

        const middleString = formattedElements.join(', ');

        console.log('First word: ', firstString);
        console.log('Middle string: ', middleString);
        console.log('Last word: ', lastString);

        finalString = `${middleString ? firstString + ',' : firstString} ${
          middleString && middleString
        } ${andConj} ${lastString}`;
      } else {
        const otherElements = array.slice(0, array.length - 1).join(', ');
        finalString = `${otherElements} ${andConj} ${lastElement}`;
      }
    } else {
      if (typeof array[0] === 'object') {
        let newString = '';

        if (isEnglish) {
          newString = 'my ' + array[0].value.skill;
        } else {
          newString = array[0].value.myWord + array[0].value.skill;
        }

        finalString = newString;
      } else {
        finalString = array[0];
      }
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
