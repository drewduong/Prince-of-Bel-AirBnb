import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { getAllSpotsThunk } from '../../store/spots';
import { NavLink } from 'react-router-dom';
import './AllSpots.css';

const AllSpots = () => {
  const dispatch = useDispatch()

  /* Subscribe to the store and listen to changes in the spots slice of state.
  allSpots is an object, which can't be mapped over, it needs to be converted to an array */
  const currentSpots = useSelector(state => Object.values(state.spots))
  // console.log('/n', 'useSelector Current Spots:', '/n', currentSpots)

  useEffect(() => {
    dispatch(getAllSpotsThunk())
  }, [dispatch])

  // Conditional used to catch if it's not rendering correctly
  if (!currentSpots) return (<div>Spots Not Found</div>)

  return (
    <div>
      <h2>List of Spots</h2>
      <ol>
        {currentSpots.map(spot => {
          return <li key={spot.id}>
            <NavLink to={`/spots/${spot.id}`}>
              <img src={spot.previewImage} alt='No Preview' />
            </NavLink>
          </li>
        })}
      </ol>
    </div>
  )
}

export default AllSpots