import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpotsThunk } from '../../store/spots';
import { NavLink } from 'react-router-dom';
// import SpotReviews from '../SpotReviews';
import './AllSpots.css';

const AllSpots = () => {
  const dispatch = useDispatch()

  /* Subscribe to the store and listen to changes in the spots slice of state.
  newState is an object containing all spots, which can't be mapped over, it needs to be converted to an array */

  const currentSpots = useSelector(state => Object.values(state.spots.allSpots))
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
              <div className='spots-image'>
                <NavLink to={`/spots/${spot.id}`}>
                  <img className='airbnb-image' src={spot.previewImage} alt='No Preview' />
                </NavLink>
                <div>
                  <div className='left-div'>
                    <div>{spot.city}, {spot.country}</div>
                    <div>★ {spot.avgRating}</div>
                    <div>{spot.name}</div>
                    <div>${spot.price} /night</div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AllSpots