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

  // const openMenu = () => {
  //   if (showMenu) return
  //   setShowMenu(true)
  // }

  const openMenu = () => {
    if (showMenu) return 'show-menu'
    if (!showMenu) return 'hide-menu'
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
        <NavLink to='/host'>Begin Hosting</NavLink>
      </>
    );
  } else {
    sessionLinks = (
      <>
        {/* <div className='right-nav'> */}
        {/* <div className='begin-hosting'> */}
        {/* <CreateSpotForm /> */}

        {/* </div> */}
        {/* <div className='menu-profile'> */}
        <CreateSpotForm />
        <button className='dropdown-button' onClick={(() => showMenu ? setShowMenu(false) : setShowMenu(true))}>
          <i id='menu' className="fa-sharp fa-solid fa-bars"></i>
          <i id='profile' className="fa-regular fa-user"></i>
        </button>
        {/* </div> */}
        <div className={openMenu()}>
          <div className="profile-dropdown">
            <LoginFormModal />
            <SignupFormModal />
          </div>
        </div>
        {/* </div> */}
      </>
    );
  }

  return (
    <div className='nav-bar-container'>
      <div className='left-nav'>
        <NavLink exact to="/">
          <img className='logo' src='https://cdn.pixabay.com/photo/2018/05/08/21/28/airbnb-3384008_960_720.png' alt='logo' />
        </NavLink>
      </div>
      <div>
        {isLoaded && sessionLinks}
      </div>
    </div>
  );
}

export default Navigation;