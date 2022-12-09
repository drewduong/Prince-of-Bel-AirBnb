// frontend/src/components/LoginFormModal/LoginForm.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './LoginForm.css';

function LoginForm({ setShowModal }) {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const demoLogin = async (e) => {
    setCredential('Demo-lition')
    setPassword('password');
    await dispatch(sessionActions.login({ credential: 'Demo-lition', password: 'password' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      // Added anon callback
      .then(() => setShowModal(false))
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
  };

  return (
    <div className='login-container'>
      <form onSubmit={handleSubmit}>
        <div className='login-item'>
          <h2>Login</h2>
          <ul className='errors'>
            {errors.map((error, idx) => (
              <li key={idx}><i class="fa-sharp fa-solid fa-circle-exclamation"></i> {error}</li>
            ))}
          </ul>
          <label>
            <input
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              placeholder='Username or email'
              required
            />
          </label>
          <label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              required
            />
          </label>
          <button type="submit">Log In</button>
          <button type="submit" onClick={demoLogin}>Demo User</button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
