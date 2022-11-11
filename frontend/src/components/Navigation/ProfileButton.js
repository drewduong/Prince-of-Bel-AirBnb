// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink, useHistory } from "react-router-dom"
// import "./Navigation.css"

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory()

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
  };

  return (
    <div className='navigation-bar'>
      <div>
        <button className='menu-profile-button' onClick={openMenu}>
          <i className='menu' class="fa-sharp fa-solid fa-bars"></i>
          <i className='profile' class="fa-regular fa-user"></i>
        </button>
      </div>
      {showMenu && (
        <div className="profile-dropdown">
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li><button onClick={logout}>Log Out</button></li>
        </div>
      )}
    </div>
  );
}

export default ProfileButton;