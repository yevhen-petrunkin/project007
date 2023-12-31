import ukrainianTemplateString from './ukrainianTemplate';
import englishTemplateString from './englishTemplate';
import technologies from './technologies';
import projects from './projects';
import resources from './resources';

export const englishData = {
  courtesy: ['Leave blank', ' Mr', ' Mrs', ' Ms'],
  adressee: ['Hiring Manager'],
  position: [
    'Frontend Developer',
    'Javascript Developer',
    'Web Developer',
    'Junior Frontend Developer',
    'Junior Javascript Developer',
    'Junior Web Developer',
  ],
  projects,
  technologies,
  resources,
  titles: {
    chooseLanguage: 'Choose Language',
    enterResource: 'Enter Resource',
    enterVacancyUrl: 'Enter Vacancy Url',
    enterCompany: 'Enter Company Name',
    enterAddresseeData: 'Enter Addresse Data',
    enterPosition: 'Enter Desired Position',
    chooseProjects: 'Choose Maximum Three Projects',
    chooseTechnologies: 'Choose Maximum Four Technologies',
    chooseExtraSkills: 'Choose a Couple of Extra Skills',
    enterReasons: 'State Your Reasons',
  },
  labels: {
    resource: 'Resource (Website): ',
    vacancyUrl: 'Vacancy Url: ',
    company: 'Company: ',
    english: 'English: ',
    ukrainian: 'Ukrainian: ',
    start: 'Dear',
    person: 'Whom you are writing: ',
    desiredPosition: 'Desired position: ',
    stateReason: 'Why this company? (because...): ',
  },
  template: englishTemplateString,
  resultTitle: 'Your Cover Letter',
};

export const ukrainianData = {
  courtesy: ['ий', 'а', 'ий/а'],
  adressee: ['менеджере з найму'],
  position: [
    'фронтенд-розробника',
    'джаваскрипт-розробника',
    'веб-розробника',
    'frontend-розробника',
    'javascript-розробника',
    'Frontend-розробника',
    'Frontend Developer',
    'Javascript Developer',
    'Web Developer',
    'Junior Frontend Developer',
    'Junior Javascript Developer',
    'Junior Web Developer',
  ],
  projects,
  technologies,
  resources,
  titles: {
    chooseLanguage: 'Обери мову',
    enterResource: 'Вкажи ресурс',
    enterVacancyUrl: 'Вкажи адресу вакансії',
    enterCompany: 'Вкажи назву компанії',
    enterAddresseeData: 'Вкажи дані адресата',
    enterPosition: 'Вкажи бажану посаду',
    chooseProjects: 'Обери максимум три проекти',
    chooseTechnologies: 'Обери максимум чотири технології',
    chooseExtraSkills: 'Обери пару додаткових навичок',
    enterReasons: 'Вкажи свої причини',
  },
  labels: {
    resource: 'Ресурс (сайт): ',
    vacancyUrl: 'Адреса вакансії: ',
    company: 'Компанія: ',
    english: 'Англійська: ',
    ukrainian: 'Українська: ',
    start: 'Шановн',
    person: 'Адресат: ',
    desiredPosition: 'Посада (у родовому відмінку): ',
    stateReason: 'Чому ця компанія? (тому що...): ',
  },
  template: ukrainianTemplateString,
  resultTitle: 'Твій супровідний лист',
};
