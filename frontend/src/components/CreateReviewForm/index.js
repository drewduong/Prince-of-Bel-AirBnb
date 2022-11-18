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

  const [rating, setRating] = useState(1)
  const [review, setReview] = useState("")

  const [validationErrors, setValidationErrors] = useState([])

  // if (!currentUser) return <Redirect to="/" />

  /* Passive data: dispatch within useEffect
     Active data, dispatch within onSubmit */

  useEffect(() => {
    const errors = []

    if (!rating) errors.push("Rating is required")
    if (!review) errors.push("Review is required")

    setValidationErrors(errors)
  }, [rating, review])

  const onSubmit = async (e) => {
    e.preventDefault()

    if (!validationErrors.length) {
      const payload = {
        rating,
        review
      }

      const newReview = await dispatch(createReviewThunk(payload, spotId))
      // console.log('/n', 'Create a spot (onSubmit)):', '/n', newSpot)
      if (newReview) {
        history.push(`/spots/${spotId}`)
      }
    }
  }

  return (
    <div className="spot-form">
      <form onSubmit={onSubmit}>
        <h2>Please Leave a Brief Review</h2>
        <ul className="errors">
          {validationErrors.length > 0 && validationErrors.map((error, idx) => (
            <span>
              <li key={idx}>{error}</li>
            </span>
          ))}
        </ul>
        <label>
          How was your stay?
          <input
            type="text"
            onChange={e => setReview(e.target.value)}
            placeholder="Describe your stay here"
            value={review}
          />
        </label>
        <label>
          Select a rating based on your experience
          <label>
            <input
              checked={rating === "1"}
              type="radio"
              value="1"
              name="rating"
              onChange={(e) => setRating(e.target.value)}
            />
            ★
          </label>
          <label>
            <input
              checked={rating === "2"}
              type="radio"
              value="2"
              name="rating"
              onChange={(e) => setRating(e.target.value)}
            />
            ★★
          </label>
          <label>
            <input
              checked={rating === "3"}
              type="radio"
              value="3"
              name="rating"
              onChange={(e) => setRating(e.target.value)}
            />
            ★★★
          </label>
          <label>
            <input
              checked={rating === "4"}
              type="radio"
              value="4"
              name="rating"
              onChange={(e) => setRating(e.target.value)}
            />
            ★★★★
          </label>
          <label>
            <input
              checked={rating === "5"}
              type="radio"
              value="5"
              name="rating"
              onChange={(e) => setRating(e.target.value)}
            />
            ★★★★★
          </label>
        </label>
        <button
          type="submit"
          disabled={validationErrors.length > 0}>Submit Review</button>
      </form>
    </div>
  )
}

export default CreateReviewForm