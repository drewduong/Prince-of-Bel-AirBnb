import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getUserBookingsThunk, deleteBookingThunk } from '../../store/bookings';
import { NavLink } from 'react-router-dom';
// import './UserBookings.css';

const UserBookings = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [isLoaded, setIsLoaded] = useState(false)

  /* Subscribe to the store and listen to changes in the spots slice of state.
  newState is an object containing all spots, which can't be mapped over, it needs to be converted to an array */

  // const sessionUser = useSelector(state => state.session.user)
  const currentUserBookings = useSelector(state => Object.values(state.bookings))
  // console.log('/n', 'Current user bookings (useSelector):', '/n', currentUserBookings)


  /* Passive data: dispatch within useEffect
  Active data, dispatch within onSubmit */

  useEffect(() => {
    dispatch(getUserBookingsThunk())
      .then(() => setIsLoaded(true))
  }, [dispatch])


  /* Conditional used to debug if it's not rendering correctly */
  if (!Object.keys(currentUserBookings).length) return (<h3>Currently no bookings pending...</h3>)

  return isLoaded && (
    <div className='user-bookings-container'>
      {currentUserBookings.map(booking => (
        <div className='user-bookings-item'>
          <div className='user-booking-div'>
            <span>ID: {booking.id} · Spot ID {booking.spotId} · User: {booking.userId} · Start Date: {booking.startDate} · End Date: {booking.endDate} </span>
            <div className='booking-spot-location'>
              {/* <div className='user-bookings-location'>{booking.Spot.city}, {booking.Spot.country}</div> */}
              {/* <div className='user-bookings-description'>{booking.booking}</div> */}
            </div>
          </div>
          <div className='delete-booking'>
            <button className='user-bookings-delete-button' onClick={async (e) => {
              e.preventDefault()
              const bookingDeleted = await dispatch(deleteBookingThunk(booking.id))
              if (bookingDeleted) history.push('/')
            }}>Delete</button>
          </div>
        </div>
      ))}
    </div >
  )
}

export default UserBookings