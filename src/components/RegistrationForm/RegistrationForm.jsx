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
    <form onSubmit={handleRegister}>
      <label>
        Email:
        <input
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
          type="password"
          value={password}
          placeholder="Enter your password"
          required
          autoComplete="on"
          onChange={e => setPassword(e.target.value.trim())}
        />
      </label>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
