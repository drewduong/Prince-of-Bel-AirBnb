// frontend/src/components/Navigation/index.js
import React, { useState, useEffect } from 'react';
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
    <div className='nav-bar-container'>
      <div className='left-nav'>
        <NavLink exact to="/">
          <img className='logo' src='https://cdn.pixabay.com/photo/2018/05/08/21/28/airbnb-3384008_960_720.png' alt='logo' />
        </NavLink>
      </div>
      <div className='right-nav'>
        <div className='begin-hosting'>
          {sessionUser && <NavLink className='begin-hosting' to={'/host'}>Begin Hosting</NavLink>}
        </div>
        <div className='profile-button'>
          {isLoaded && <ProfileButton user={sessionUser} setLogin={setLogin} setShowModal={setShowModal} />}
        </div>
        <div>
          {showModal && <Modal onClose={() => setShowModal(false)}>
            {login ? <LoginForm setShowModal={setShowModal} /> : <SignupForm setShowModal={setShowModal} />}
          </Modal>}
        </div>
      </div>
    </div>
  );
}

export default Navigation;