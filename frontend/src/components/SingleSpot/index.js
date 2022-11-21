import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSpotThunk } from '../../store/spots';
import { NavLink } from 'react-router-dom';
import './SingleSpot.css';
import { getSpotReviewsThunk } from '../../store/reviews';

const SingleSpot = () => {
  const dispatch = useDispatch()
  const { spotId } = useParams()

  const [isLoaded, setIsLoaded] = useState(false)
  /* Subscribe to the store and listen to changes in the spots slice of state.
  singleSpot is an object, which can't be mapped over, it needs to be converted to an array */

  const sessionUser = useSelector(state => state.session.user)
  // console.log('/n', 'Session user (useSelector):', '/n', currentSpot)
  const currentSpot = useSelector(state => state.spots.singleSpot)
  // console.log('/n', 'Spot detail (useSelector):', '/n', currentSpot)
  const currentSpotReviews = useSelector(state => Object.values(state.reviews.spotReviews))
  // console.log('/n', 'Current spot reviews (useSelector):', '/n', currentSpotReviews)

  // Checking if user has already reviewed the spot
  const currentReviews = useSelector(state => Object.values(state.reviews.spotReviews))
  // console.log('current reviews: ', currentReviews)
  const reviewExists = currentReviews.find(review => review.userId === sessionUser?.id)
  const isSpotOwner = currentSpot?.ownerId === sessionUser?.id
  // console.log('/n', 'Checking to see if the owner can review his own spot (useSelector):', '/n', currentSpot)


  /* Passive data: dispatch within useEffect
     Active data, dispatch within submitHandler */

  useEffect(() => {
    dispatch(getSpotThunk(+spotId))
  }, [dispatch, spotId])

  useEffect(() => {
    dispatch(getSpotReviewsThunk(+spotId))
      .then(() => setIsLoaded(true))
  }, [dispatch, spotId])

  // Conditional used to debug if it's not rendering correctly
  if (!Object.keys(currentSpot).length) return null
  if (!isLoaded) return null

  return (
    <div className='spots-container'>
      <div className='spots-wrapper'>
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
              </div>
            </div>
          </div>
        </li>
        <div className='reviews-wrapper'>
          <h2>★ {currentSpot.avgStarRating} · {currentSpot.numReviews}</h2>
          <div className='reviews-card'>
            <div className='create-review-div'>
              {sessionUser && !reviewExists && !isSpotOwner ? (
                <NavLink className='create-review-button' to={`/spots/${currentSpot.id}/review`}>Leave Review</NavLink>) :
                (<h3>Currently unable to review this place</h3>)}
            </div>
            <ul className='spot-reviews'>
              {currentSpotReviews?.map(review => (
                <li key={review.id}>
                  <div className='spot-review'>
                    <div className='review-user'>★ {review?.stars} · {review?.User.firstName} {review?.User.lastName}</div>
                    <div className='review-description'>{review?.review}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleSpot