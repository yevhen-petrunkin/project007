import css from './Form.module.css';
import { useState, useRef, useEffect } from 'react';
import { englishData, ukrainianData } from '../../sources/templateData';
import {
  extraSkillsEnglish,
  extraSkillsUkrainian,
} from '../../sources/extraSkills';
import fetchReasons from '../../db-fucntions/fetchReasons';
import deleteReason from '../../db-fucntions/deleteReason';
import DeleteBtn from '../DeleteBtn/DeleteBtn';

const Form = ({ userAuth, processFormData }) => {
  const [language, setLanguage] = useState('english');
  const [list, setList] = useState(englishData);
  const [skillList, setSkillList] = useState(extraSkillsEnglish);
  const [reasons, setReasons] = useState([]);
  const formRef = useRef(null);

  useEffect(() => {
    if (userAuth) {
      const collectionName = language === 'english' ? 'reasonsEn' : 'reasonsUk';
      fetchReasons(userAuth, collectionName).then(res => setReasons(res));
    }
  }, [userAuth, language]);

  const handleLanguageChange = event => {
    setLanguage(event.target.value);
    setList(getList(event.target.value));
    setSkillList(getSkillList(event.target.value));
  };

  const removeReason = id => {
    const collectionName = language === 'english' ? 'reasonsEn' : 'reasonsUk';
    deleteReason(userAuth, collectionName, id);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const arr = [];
    const formData = new FormData(formRef.current);
    formData.forEach((value, name) => {
      let newVal = null;
      if (name.toLowerCase() === 'extraSkills'.toLowerCase()) {
        newVal = JSON.parse(value);
      } else {
        newVal = value;
      }
      arr.push([name, newVal]);
    });
    // console.log(arr);

    const data = {};

    for (const [name, newVal] of arr) {
      if (data[name]) {
        if (!Array.isArray(data[name])) {
          data[name] = [data[name]];
        }
        data[name].push(newVal);
      } else {
        data[name] = newVal;
      }
    }

    if (data.courtesy.toLowerCase() === 'leave blank') {
      data.courtesy = '';
    }

    data.resultTitle = list.resultTitle;
    console.log('FormData is: ', data);
    processFormData(data);
  };

  function getList(lang) {
    return lang === 'english' ? englishData : ukrainianData;
  }

  function getSkillList(lang) {
    return lang === 'english' ? extraSkillsEnglish : extraSkillsUkrainian;
  }

  const {
    resources,
    courtesy,
    adressee,
    position,
    projects,
    technologies,
    labels,
    titles,
  } = list;

  const {
    resource,
    vacancyUrl,
    company,
    english,
    ukrainian,
    start,
    person,
    desiredPosition,
    stateReason,
  } = labels;

  const {
    chooseLanguage,
    enterResource,
    enterVacancyUrl,
    enterCompany,
    enterAddresseeData,
    enterPosition,
    chooseProjects,
    chooseTechnologies,
    chooseExtraSkills,
    enterReasons,
  } = titles;

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <div className={css.form}>
        <div className={css.form__box}>
          <div className={css.form__article}>
            <h3>{chooseLanguage}</h3>
            <div className={css.form__innerbox}>
              <label>
                {english}
                <input
                  type="radio"
                  name="language"
                  value="english"
                  checked={language === 'english'}
                  onChange={handleLanguageChange}
                />
              </label>
              <label>
                {ukrainian}
                <input
                  type="radio"
                  name="language"
                  value="ukrainian"
                  checked={language === 'ukrainian'}
                  onChange={handleLanguageChange}
                />
              </label>
            </div>
          </div>

          <div className={css.form__article}>
            <h3>{enterResource}</h3>
            <label>
              {resource}
              <input
                className={css.form__input}
                name="resource"
                list="resources"
              />
              <datalist id="resources">
                {resources.map(source => (
                  <option key={source} value={source}>
                    {source}
                  </option>
                ))}
              </datalist>
            </label>{' '}
          </div>

          <div className={css.form__article}>
            <h3>{enterVacancyUrl}</h3>
            <label>
              {vacancyUrl}
              <input
                className={[css.form__input, css.url].join(' ')}
                type="url"
                name="vacancyUrl"
              />
            </label>
          </div>

          <div className={css.form__article}>
            <h3>{enterCompany}</h3>
            <label>
              {company}
              <input className={css.form__input} type="text" name="company" />
            </label>
          </div>

          <div className={css.form__article}>
            <h3>{enterAddresseeData}</h3>
            <div className={css.form__innerbox}>
              <label>
                {start}
                <select className={css.form__input} name="courtesy">
                  {courtesy.map(call => (
                    <option key={call} value={call}>
                      {call}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                {person}
                <input
                  className={css.form__input}
                  name="addressee"
                  list="addressee"
                />
                <datalist id="addressee">
                  {adressee.map(reference => (
                    <option key={reference} value={reference}>
                      {reference}
                    </option>
                  ))}
                </datalist>
              </label>
            </div>
          </div>

          <div className={css.form__article}>
            <h3>{enterPosition}</h3>
            <label>
              {desiredPosition}
              <input
                className={css.form__input}
                name="position"
                list="position"
              />
              <datalist id="position">
                {position.map(job => (
                  <option key={job} value={job}>
                    {job}
                  </option>
                ))}
              </datalist>
            </label>
          </div>

          <div className={css.form__article}>
            <h3>{chooseProjects}</h3>
            <div className={css.form__listbox}>
              {projects.map(project => (
                <label key={project} className={css.form__listlabel}>
                  {project}
                  <input type="checkbox" name="projects" value={project} />
                </label>
              ))}
            </div>
          </div>

          <div className={css.form__article}>
            <h3>{chooseExtraSkills}</h3>
            <div className={css.form__listbox}>
              {skillList.map(skill => (
                <label key={skill.id} className={css.form__listlabel}>
                  {skill.label}
                  <input
                    type="checkbox"
                    name="extraSkills"
                    value={JSON.stringify(skill)}
                  />
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className={css.form__box}>
          <div className={css.form__article}>
            <h3>{chooseTechnologies}</h3>
            <div className={css.form__listbox}>
              {technologies.map(tech => (
                <label key={tech} className={css.form__listlabel}>
                  {tech}
                  <input type="checkbox" name="technologies" value={tech} />
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={css.form__reasonbox}>
        <h3>{enterReasons}</h3>
        <div className={css.form__reasonlist}>
          {reasons.map(reason => (
            <label key={reason.id} className={css.form__reasonlabel}>
              <DeleteBtn onClick={() => removeReason(reason.id)} />
              {reason.reason}
              <input
                type="checkbox"
                name="checkReasons"
                value={reason.reason}
              />
            </label>
          ))}
        </div>
        <label>
          {stateReason}
          <textarea className={css.form__reasons} name="reasons" />
        </label>{' '}
      </div>
      <button type="submit" className={css.form__submitbtn}>
        Create Cover Letter
      </button>
    </form>
  );
};

export default Form;
