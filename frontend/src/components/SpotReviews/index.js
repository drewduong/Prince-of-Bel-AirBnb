import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getSpotReviewsThunk } from '../../store/reviews';
import { NavLink } from 'react-router-dom';
import './SpotReviews.css';

const SpotReviews = () => {
  const dispatch = useDispatch()
  const { spotId } = useParams()

  // const [hasSubmitted, setHasSubmitted] = useState(false) // Double check if needed

  /* Subscribe to the store and listen to changes in the spots slice of state.
  newState is an object containing all spots, which can't be mapped over, it needs to be converted to an array */

  // const sessionUser = useSelector(state => state.session.user)
  const currentSpotReviews = useSelector(state => Object.values(state.reviews.spotReviews))
  // console.log('/n', 'Current user reviews (useSelector):', '/n', currentSpotReviews)


  /* Passive data: dispatch within useEffect
  Active data, dispatch within onSubmit */

  useEffect(() => {
    dispatch(getSpotReviewsThunk(+spotId))
    // setHasSubmitted(false) // Double check logic. add into dependecy array if needed
  }, [dispatch, spotId])

  /* Conditional used to debug if it's not rendering correctly */
  if (!Object.keys(currentSpotReviews).length) return (<div>No Reviews Found</div>)

  return (
    <div className='reviews-container'>
      <ul>
        {currentSpotReviews.map(review => (
          <li key={review.id}>
            <div className='reviews-card'>
              <div>
                <div className='left-div'>
                  <span>{review.User.firstName} {review.User.lastName}</span>
                  <div className='review-spot-location'>
                    <span>{review.Spot.city}, {review.Spot.country}</span>
                  </div>
                  <div className='review-rating'>
                    <span>{review.stars} Rating</span>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div >
  )
}

export default SpotReviews