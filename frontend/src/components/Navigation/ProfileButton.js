// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink, useHistory } from "react-router-dom"
import "./ProfileButton.css"

function ProfileButton({ user, setLogin, setShowModal }) {
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
          <i id='menu' className="fa-sharp fa-solid fa-bars"></i>
          <i id='profile' className="fa-regular fa-user"></i>
        </button>
      </div>
      <div className='dropdown'>
        {/* If a user is logged in, we'll show the first set, otherwise show the second set */}
        {showMenu && (user ?
          (<ul className="dropdown-list">
            <li>{user.username}</li>
            <li>{user.email}</li>
            <li><NavLink className='listings' to={'/listings'}>Listings</NavLink></li>
            <li><NavLink className='reviews' to={'/reviews'}>Reviews</NavLink></li>
            <li><button className='logout' onClick={logout}>Log Out</button></li>
          </ul>) :
          (<ul className="dropdown-list">
            <li>
              <button onClick={() => {
                setLogin(true)
                setShowModal(true)
              }}>Log In</button>
            </li>
            <li>
              <button onClick={() => {
                setLogin(false)
                setShowModal(true)
              }}>Sign Up</button>
            </li>
          </ul>)
        )}
      </div>
    </div>
  );
}

export default ProfileButton;