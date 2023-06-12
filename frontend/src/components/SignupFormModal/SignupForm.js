// frontend/src/components/SignupForm.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupForm({ setShowModal }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  /* Check to see if email or username exists */

  // const emailExists = 
  // const usernameExists 

  if (sessionUser) return <Redirect to="/" />;

  /* Create conditional to check if username or email exists */
  const onSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ firstName, lastName, email, username, password }))
        // Added anon callback
        .then(() => setShowModal(false))
        .catch(async (res) => {
          const data = await res.json();
          // console.log('data.error data type: ', data)
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm password field must be the same as the password field']);
  };

  return (
    <form className='signup-container' onSubmit={onSubmit}>
      <div className='signup-item'>
        <h2>Sign Up</h2>
        <ul className='errors'>
          {errors.map((error, idx) => <li key={idx}><i class="fa-sharp fa-solid fa-circle-exclamation"></i> {error}</li>)}
        </ul>
        <label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder='First name'
            required
          />
        </label>
        <label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder='Last name'
            required
          />
        </label>
        <label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
            required
          />
        </label>
        <label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Username'
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
        <label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='Confirm password'
            required
          />
        </label>
        <button type="submit">Sign Up</button>
      </div>
    </form>
  );
}

export default SignupForm;