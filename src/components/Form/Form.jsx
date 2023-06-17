import css from './Form.module.css';
import { useState, useRef } from 'react';
import { englishData, ukrainianData } from '../../sources/templateData';

const Form = ({ processFormData }) => {
  const [language, setLanguage] = useState('english');
  const [list, setList] = useState(englishData);
  const formRef = useRef(null);

  const handleLanguageChange = event => {
    setLanguage(event.target.value);
    setList(getList(event.target.value));
  };

  const handleSubmit = event => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    const data = {};

    for (const [name, value] of formData.entries()) {
      if (data[name]) {
        if (!Array.isArray(data[name])) {
          data[name] = [data[name]];
        }
        data[name].push(value);
      } else {
        data[name] = value;
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
    reason,
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
    enterReasons,
  } = titles;

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <div className={css.form}>
        <div className={css.form__box}>
          <div className={css.form__article}>
            <h2>{chooseLanguage}</h2>
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
            <h2>{enterResource}</h2>
            <label>
              {resource}
              <input name="resource" list="resources" />
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
            <h2>{enterVacancyUrl}</h2>
            <label>
              {vacancyUrl}
              <input type="url" name="vacancyUrl" />
            </label>
          </div>

          <div className={css.form__article}>
            <h2>{enterCompany}</h2>
            <label>
              {company}
              <input type="text" name="company" />
            </label>
          </div>

          <div className={css.form__article}>
            <h2>{enterAddresseeData}</h2>
            <div className={css.form__innerbox}>
              <label>
                {start}
                <select name="courtesy">
                  {courtesy.map(call => (
                    <option key={call} value={call}>
                      {call}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                {person}
                <input name="addressee" list="addressee" />
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
            <h2>{enterPosition}</h2>
            <label>
              {desiredPosition}
              <input name="position" list="position" />
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
            <h2>{chooseProjects}</h2>
            <div className={css.form__listbox}>
              {projects.map(project => (
                <label key={project} className={css.form__listlabel}>
                  {project}
                  <input type="checkbox" name="projects" value={project} />
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className={css.form__box}>
          <div className={css.form__article}>
            <h2>{chooseTechnologies}</h2>
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
        <h2>{enterReasons}</h2>
        <label>
          {reason}
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
