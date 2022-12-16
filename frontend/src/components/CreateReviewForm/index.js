import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { createReviewThunk } from '../../store/reviews';
import './CreateReviewForm.css';

const CreateReviewForm = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { spotId } = useParams()
  // const currentUser = useSelector((state) => state.session.user);

  const [stars, setStars] = useState(1)
  const [review, setReview] = useState("")
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const [validationErrors, setValidationErrors] = useState([])

  // if (!currentUser) return <Redirect to="/" />

  /* Passive data: dispatch within useEffect
     Active data, dispatch within onSubmit */

  useEffect(() => {
    const errors = []

    if (!stars) errors.push("Rating is required")
    if (!review) errors.push("Review is required for submission")
    if (review.length < 10) errors.push("Review should be more than 10 characters")
    if (review.length > 255) errors.push("Review should be less than 255 characters")
    setValidationErrors(errors)
  }, [stars, review])

  const onSubmit = async (e) => {
    e.preventDefault()
    setHasSubmitted(true)
    console.log('review testing: ', review)

    if (!validationErrors.length) {
      const payload = {
        stars,
        review
      }

      const newReview = await dispatch(createReviewThunk(payload, spotId))
      if (newReview) {
        history.push(`/spots/${spotId}`)
      }
    }
  }

  return (
    <div className="review-container">
      <form onSubmit={onSubmit} hasSubmitted={hasSubmitted}>
        <div className='review-item'>
          <h2>Please Leave a Brief Review</h2>
          <ul className="errors">
            {hasSubmitted && validationErrors.length > 0 && validationErrors.map((error, idx) => (
              <li key={idx}><i class="fa-sharp fa-solid fa-circle-exclamation"></i> {error}</li>
            ))}
          </ul>
          <label>
            <h4>How was your stay?</h4>
            <input
              className='describe'
              type="text"
              onChange={e => setReview(e.target.value)}
              placeholder="Describe your stay here"
              value={review}
              minLength="10"
              maxLength="255"
              onPaste="return false"
            />
          </label>
          <label>
            <h4>Select a rating based on your experience</h4>
            <label>
              <input
                checked={stars === "1"}
                type="radio"
                value="1"
                name="stars"
                onChange={(e) => setStars(e.target.value)}
              />
              ★
            </label>
            <label>
              <input
                checked={stars === "2"}
                type="radio"
                value="2"
                name="stars"
                onChange={(e) => setStars(e.target.value)}
              />
              ★★
            </label>
            <label>
              <input
                checked={stars === "3"}
                type="radio"
                value="3"
                name="stars"
                onChange={(e) => setStars(e.target.value)}
              />
              ★★★
            </label>
            <label>
              <input
                checked={stars === "4"}
                type="radio"
                value="4"
                name="stars"
                onChange={(e) => setStars(e.target.value)}
              />
              ★★★★
            </label>
            <label>
              <input
                checked={stars === "5"}
                type="radio"
                value="5"
                name="stars"
                onChange={(e) => setStars(e.target.value)}
              />
              ★★★★★
            </label>
          </label>
          <button type="submit">Submit Review</button>
        </div>
      </form>
    </div>
  )
}

export default CreateReviewForm