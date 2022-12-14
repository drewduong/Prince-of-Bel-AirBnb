import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getUserReviewsThunk } from '../../store/reviews';
import { deleteReviewThunk } from '../../store/reviews';
import { NavLink } from 'react-router-dom';
import './UserReviews.css';

const UserReviews = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [isLoaded, setIsLoaded] = useState(false)

  /* Subscribe to the store and listen to changes in the spots slice of state.
  newState is an object containing all spots, which can't be mapped over, it needs to be converted to an array */

  // const sessionUser = useSelector(state => state.session.user)
  const currentUserReviews = useSelector(state => Object.values(state.reviews.userReviews))
  // console.log('/n', 'Current user reviews (useSelector):', '/n', currentUserReviews)


  /* Passive data: dispatch within useEffect
  Active data, dispatch within onSubmit */

  useEffect(() => {
    dispatch(getUserReviewsThunk())
      .then(() => setIsLoaded(true))
  }, [dispatch])


  /* Conditional used to debug if it's not rendering correctly */
  if (!Object.keys(currentUserReviews).length) return (<h3>Currently no reviews pending...</h3>)

  return isLoaded && (
    <div className='user-reviews-container'>
      {currentUserReviews.map(review => (
        <div className='user-reviews-item'>
          <div className='user-review-div'>
            <span>{review.User.firstName} {review.User.lastName} · ★ {review.stars} </span>
            <div className='review-spot-location'>
              <div className='user-reviews-location'>{review.Spot.city}, {review.Spot.country}</div>
              <div className='user-reviews-description'>{review.review}</div>
            </div>
          </div>
          <div className='delete-review'>
            <button className='user-reviews-delete-button' onClick={async (e) => {
              e.preventDefault()
              const reviewDeleted = await dispatch(deleteReviewThunk(review.id))
              if (reviewDeleted) history.push('/')
            }}>Delete</button>
          </div>
        </div>
      ))}
    </div >
  )
}

export default UserReviews