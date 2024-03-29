import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getUserSpotsThunk } from '../../store/spots';
import { deleteSpotThunk } from '../../store/spots';
import { NavLink } from 'react-router-dom';
import UserReviews from '../UserReviews'
import './UserSpots.css';

const UserSpots = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { spotId } = useParams()

  const [isLoaded, setIsLoaded] = useState(false)

  /* Subscribe to the store and listen to changes in the spots slice of state.
  newState is an object containing all spots, which can't be mapped over, it needs to be converted to an array */

  const sessionUser = useSelector(state => state.session.user)
  const currentSpots = useSelector(state => Object.values(state.spots.allSpots))
  const currentUserSpots = currentSpots.filter(spot => spot.ownerId === sessionUser.id)
  // console.log('/n', 'Current user spots (useSelector):', '/n', currentUserSpots)


  /* Passive data: dispatch within useEffect
  Active data, dispatch within onSubmit */

  useEffect(() => {
    dispatch(getUserSpotsThunk())
      .then(() => setIsLoaded(true))
  }, [dispatch])


  /* Conditional used to debug if it's not rendering correctly */
  if (!Object.keys(currentUserSpots).length) return (<h3>Currently, no listings found. To get started, click the 'Begin Hosting' button above to list your first property</h3>)

  return isLoaded && (
    <div className='listings-container'>
      {currentUserSpots.map(spot => (
        <div key={spot.id}>
          <h3>{spot.name}</h3>
          <span>★ {spot.avgRating} · ${spot.price}/night · {spot.city}, {spot.country} </span>
          <div className='listings-item'>
            <div>
              <NavLink to={`/spots/${spot.id}`}>
                <img className='listings-image' src={spot.previewImage} alt='No Preview' />
              </NavLink>
              <div>
                <div className='left-div'>
                  <div className='listing-update-delete'>
                    <NavLink className='edit-button' to={`/spots/${spot.id}/edit`}>Edit Spot</NavLink>
                    {/* <button className='delete-button' onClick={() => dispatch(deleteSpotThunk(spot.id))}>Delete</button> */}
                    <div></div>
                    <button className='delete-button' onClick={async (e) => {
                      e.preventDefault()
                      const spotDeleted = await dispatch(deleteSpotThunk(spot.id))
                      if (spotDeleted) history.push('/')
                    }}>Delete</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>

  )
}

export default UserSpots