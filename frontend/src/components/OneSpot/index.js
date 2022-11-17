import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { getSpotThunk } from '../../store/spots';
import { NavLink } from 'react-router-dom';
import './OneSpot.css';

const OneSpot = () => {
  const dispatch = useDispatch()
  const { spotId } = useParams()

  /* Subscribe to the store and listen to changes in the spots slice of state.
  OneSpot is an object, which can't be mapped over, it needs to be converted to an array */
  const currentSpot = useSelector(state => state.spots[+spotId])
  console.log('/n', 'One Spot (useSelector):', '/n', currentSpot)

  /* Passive data: dispatch within useEffect
     Active data, dispatch within submitHandler */

  useEffect(() => {
    dispatch(getSpotThunk(+spotId))
  }, [dispatch, spotId])

  // Conditional used to debug if it's not rendering correctly
  if (!currentSpot) return (<div>Spot Not Found</div>)

  return (
    <div className='spots-container'>
      <div>

        <li key={currentSpot.id}>
          <div className='spots-card'>
            <NavLink to={`/spots/${currentSpot.id}`}>
              <div className='spots-image'>
                {/* note: optional chaining so that it'll return undefined if null/undefined */}
                {/* <img className='airbnb-image' src={currentSpot?.SpotImages[0]?.url} alt='No Preview' /> */}
                <div>
                  <div className='spots-city'>
                    <span>{currentSpot.city}, {currentSpot.country}</span>
                    <div className='spot-description'>
                      <span>{currentSpot.description}</span>
                    </div>
                    <div className='spots-price'>
                      <span>{`${currentSpot.price}`} per night</span>
                    </div>
                  </div>
                </div>
              </div>
            </NavLink>
          </div>
        </li>

      </div>
    </div>
  )
}

export default OneSpot