import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getUserReviewsThunk } from '../../store/reviews';
import { deleteReviewThunk } from '../../store/reviews';
import { NavLink } from 'react-router-dom';
import './UserReviews.css';

const UserReviews = () => {
  const dispatch = useDispatch()

  // const [hasSubmitted, setHasSubmitted] = useState(false) // Double check if needed

  /* Subscribe to the store and listen to changes in the spots slice of state.
  newState is an object containing all spots, which can't be mapped over, it needs to be converted to an array */

  // const sessionUser = useSelector(state => state.session.user)
  // const currentSpots = useSelector(state => Object.values(state.spots))
  const currentUserReviews = useSelector(state => Object.values(state.reviews.userReviews))
  console.log('/n', 'Current user reviews (useSelector):', '/n', currentUserReviews)


  /* Passive data: dispatch within useEffect
  Active data, dispatch within onSubmit */

  useEffect(() => {
    dispatch(getUserReviewsThunk())
    // setHasSubmitted(false) // Double check logic. add into dependecy array if needed
  }, [dispatch])

  /* Conditional used to debug if it's not rendering correctly */
  if (!Object.keys(currentUserReviews).length) return (<div>No Reviews Found</div>)

  return (
    <div className='reviews-container'>
      <ul>
        {currentUserReviews.map(review => (
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
                  <div className='delete-review'>
                    <button className='delete-button' onClick={() => dispatch(deleteReviewThunk(review.id))}>Delete</button>
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

export default UserReviews