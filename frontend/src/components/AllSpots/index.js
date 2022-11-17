import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { getAllSpotsThunk } from '../../store/spots';
import { NavLink } from 'react-router-dom';
import './AllSpots.css';

const AllSpots = () => {
  const dispatch = useDispatch()

  /* Subscribe to the store and listen to changes in the spots slice of state.
  newState is an object containing all spots, which can't be mapped over, it needs to be converted to an array */

  const currentSpots = useSelector(state => Object.values(state.spots))
  // console.log('/n', 'useSelector Current Spots:', '/n', currentSpots)

  /* Passive data: dispatch within useEffect
     Active data, dispatch within onSubmit */

  useEffect(() => {
    dispatch(getAllSpotsThunk())
  }, [dispatch])

  // Conditional used to debug if it's not rendering correctly
  if (!currentSpots) return (<div>Spots Not Found</div>)

  return (
    <div className='spots-container'>
      <ul>
        {currentSpots.map(spot => (
          <li key={spot.id}>
            <div className='spots-card'>
              <NavLink to={`/spots/${spot.id}`}>
                <div className='spots-image'>
                  <img className='airbnb-image' src={spot.previewImage} alt='No Preview' />
                  <div>
                    <div className='left-div'>
                      <span>{spot.city}, {spot.state}</span>
                      <div className='spots-description'>
                        <span>{spot.description}</span>
                      </div>
                      <div className='spots-price'>
                        <span>{spot.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </NavLink>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AllSpots