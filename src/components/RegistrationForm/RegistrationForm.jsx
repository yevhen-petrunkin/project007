import css from './RegistrationForm.module.css';
import { useState } from 'react';
import registerUser from '../../db-fucntions/registerUser';

const RegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = e => {
    e.preventDefault();
    try {
      registerUser(email, password);
      setEmail('');
      setPassword('');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form className={css.registrationForm} onSubmit={handleRegister}>
      <label>
        Email:
        <input
          className={css.registrationForm__input}
          type="email"
          value={email}
          placeholder="Enter your email"
          required
          autoComplete="on"
          onChange={e => setEmail(e.target.value.trim())}
        />
      </label>
      <label>
        Password:
        <input
          className={css.registrationForm__input}
          type="password"
          value={password}
          placeholder="Enter your password"
          required
          autoComplete="on"
          onChange={e => setPassword(e.target.value.trim())}
        />
      </label>
      <button className={css.registrationForm__submitbtn} type="submit">
        Register
      </button>
    </form>
  );
};

export default RegistrationForm;
