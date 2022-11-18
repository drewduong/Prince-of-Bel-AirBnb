import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { getSpotThunk } from '../../store/spots';
import { NavLink } from 'react-router-dom';
import './SingleSpot.css';

const SingleSpot = () => {
  const dispatch = useDispatch()
  const { spotId } = useParams()

  /* Subscribe to the store and listen to changes in the spots slice of state.
  singleSpot is an object, which can't be mapped over, it needs to be converted to an array */
  const currentSpot = useSelector(state => state.spots.singleSpot)
  // console.log('/n', 'Spot detail (useSelector):', '/n', currentSpot)

  // const currentReviews = useSelector(state => state.reviews.spotReviews)
  // console.log('/n', 'Spot detail reviews (useSelector):', '/n', currentReviews)



  /*
  
  ------------------------------------------------------------------------------------
  HERE WE'RE GONNA USE A .FILTER TO CHECK TO SEE IF THEY'VE ALREADY REVIEWED THE SPOT



  /* Passive data: dispatch within useEffect
     Active data, dispatch within submitHandler */

  useEffect(() => {
    dispatch(getSpotThunk(+spotId))
  }, [dispatch, spotId])

  // Conditional used to debug if it's not rendering correctly
  if (!Object.keys(currentSpot).length) return null

  return (
    <div className='spots-container'>
      <div>
        <h2>{currentSpot.name}</h2>
        <span>★ {currentSpot.avgStarRating} · {currentSpot.numReviews} reviews · Superhost · {currentSpot.city}, {currentSpot.country} </span>
        <li key={currentSpot.id}>
          <div className='spots-card'>
            <NavLink to={`/spots/${currentSpot.id}`} />
            <div className='spots-image'>
              <img className='airbnb-image' src={currentSpot?.SpotImages[0]?.url} alt='No Preview' />
              <div>
                <div className='spots-city'>
                  <span>{currentSpot.description}</span>
                </div>
                <div className='spots-price'>
                  <span>${`${currentSpot.price}`}/night</span>
                </div>
                <div>
                  <NavLink className='create-review-button' to={`/spots/${currentSpot.id}/review`}>Leave Review</NavLink>
                </div>
              </div>
            </div>
          </div>
        </li>
      </div>
    </div>
  )
}

export default SingleSpot