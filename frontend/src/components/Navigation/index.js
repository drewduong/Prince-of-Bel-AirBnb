// frontend/src/components/Navigation/index.js
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import CreateSpotForm from '../CreateSpotForm'
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const [showMenu, setShowMenu] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [loggedOut, setLoggedOut] = useState(false)

  const openMenu = () => {
    if (showMenu) return
    setShowMenu(true)
  }

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false)
    }

    document.addEventListener('click', closeMenu)

    return () => document.removeEventListener("click", closeMenu)
  }, [showMenu])

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <>
        <div className='right-nav'>
          <div className='begin-hosting'>
            <NavLink to="spots/new">Begin Hosting</NavLink>
          </div>
          <div className='menu-profile'>
            <button className='dropdown-button' onClick={openMenu}>
              <i className='menu' class="fa-sharp fa-solid fa-bars"></i>
              <i className='profile' class="fa-regular fa-user"></i>
            </button>
          </div>
          {showMenu && (
            <div className="profile-dropdown">
              <button className='login-button' onClick={() => setLoggedIn(true)}>Log In</button>
              <button className='logout-button' onClick={() => setLoggedOut(true)}>Log Out</button>
            </div>
          )}
        </div>
      </>
    );
  }

  return (
    <div className='nav-bar-container'>
      <div className='left-nav'>
        <NavLink exact to="/">
          <img className='logo' src='https://pixabay.com/get/ga2d799f71569cb17f851300663689c2bb4ccdc4a3da9743c3eeb358e0e39b52ed928eedaf5cc0931dea3acd430fac74584b17664e48b979488ac250c7897993da4ac57485f5c37ed0147adb91c973cd4_640.png' alt='logo' />
        </NavLink>
      </div>
      <div>
        {isLoaded && sessionLinks}
      </div>
      {/* <div className='right-nav'>
        <div className='begin-hosting'>
          <NavLink to="spots/new">Begin Hosting</NavLink>
        </div>
        <div className='menu-profile-button'>
          <LoginFormModal />
          <SignupFormModal />
        </div>
      </div> */}
    </div>
  );
}

export default Navigation;