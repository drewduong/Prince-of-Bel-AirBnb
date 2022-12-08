// frontend/src/components/Navigation/index.js
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { Modal } from '../../context/Modal';
import LoginForm from '../LoginFormModal/LoginForm'
import SignupForm from '../SignupFormModal/SignupForm';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const [showModal, setShowModal] = useState(false)
  const [login, setLogin] = useState(true)

  return (
    <ul className='nav-bar-container'>
      <li>
        <NavLink exact to="/">
          <img className='logo' src='https://i.imgur.com/mrzo0xM.png' alt='logo' />
        </NavLink>
      </li>
      <div className='right-nav'>
        <li>
          <div className='begin-hosting'>
            {sessionUser ? <NavLink className='loggedin-hosting' to={'/host'}>Begin Hosting</NavLink> : (
              <button className='loggedout-hosting' onClick={() => setShowModal(true)}>
                Begin Hosting
              </button>
            )}
            {/* // {sessionUser && <NavLink className='new-spot' to={'/host'}>Begin Hosting</NavLink>} */}
          </div>
        </li>
        <li>
          <div className='profile-item'>
            {isLoaded && <ProfileButton className='profile-button' user={sessionUser} setLogin={setLogin} setShowModal={setShowModal} />}
          </div>
          <div className='dropdown'>
            {showModal && <Modal onClose={() => setShowModal(false)}>
              {login ? <LoginForm setShowModal={setShowModal} /> : <SignupForm setShowModal={setShowModal} />}
            </Modal>}
          </div>
        </li>
      </div>
    </ul>
  );
}

export default Navigation;