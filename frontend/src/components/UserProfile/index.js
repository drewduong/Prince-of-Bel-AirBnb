import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import UserSpots from "../UserSpots";
import UserReviews from "../UserReviews";
import UserBookings from "../UserBookings";
import './UserProfile.css';

const UserProfile = () => {
  const sessionUser = useSelector(state => state.session.user)

  return (
    <div className='user-container'>
      <h1>Welcome, {sessionUser.firstName} </h1>
      <h2>Upcoming Destinations</h2>
      <UserBookings />
      <h2>Manage Listings</h2>
      <UserSpots />
      <h2>Your Reviews</h2>
      <UserReviews />
    </div>
  )
}

export default UserProfile