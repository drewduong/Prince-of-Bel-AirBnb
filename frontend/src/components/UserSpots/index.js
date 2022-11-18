import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getUserSpotsThunk } from '../../store/spots';
import { deleteSpotThunk } from '../../store/spots';
import { NavLink } from 'react-router-dom';
import './UserSpots.css';

const UserSpots = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { spotId } = useParams()

  // const [hasSubmitted, setHasSubmitted] = useState(false) // Double check if needed

  /* Subscribe to the store and listen to changes in the spots slice of state.
  newState is an object containing all spots, which can't be mapped over, it needs to be converted to an array */

  const sessionUser = useSelector(state => state.session.user)
  const currentSpots = useSelector(state => Object.values(state.spots))
  const currentUserSpots = currentSpots.filter(spot => spot.ownerId === sessionUser.id)
  console.log('/n', 'Current user spots (useSelector):', '/n', currentUserSpots)


  /* Passive data: dispatch within useEffect
  Active data, dispatch within onSubmit */

  useEffect(() => {
    dispatch(getUserSpotsThunk())
    // setHasSubmitted(false) // Double check logic. add into dependecy array if needed
  }, [dispatch])

  /* Conditional used to debug if it's not rendering correctly */
  if (!Object.keys(currentUserSpots).length) return null

  return (
    <div className='spots-container'>
      <ul>
        {currentUserSpots.map(spot => (
          <li key={spot.id}>
            <div className='spots-card'>
              <NavLink to={`/spots/${spot.id}`}>
                <div className='spots-image'>
                  <img className='airbnb-image' src={spot.previewImage} alt='No Preview' />
                  <div>
                    <div className='left-div'>
                      <span>{spot.city}, {spot.country}</span>
                      <div className='spots-description'>
                        <span>{spot.description}</span>
                      </div>
                      <div className='spots-price'>
                        <span>{spot.price} per night</span>
                      </div>
                      <div className='listing-update-delete'>
                        <NavLink className='edit-button' to={`/spots/${spot.id}/edit`}>Edit Spot</NavLink>
                        <button className='delete-button' onClick={() => dispatch(deleteSpotThunk(spot.id))}>Delete</button>
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

export default UserSpots