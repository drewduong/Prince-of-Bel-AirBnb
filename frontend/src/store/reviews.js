import { csrfFetch } from './csrf';

/*----------ACTION TYPES----------*/

const GET_SPOT_REVIEWS = 'reviews/GET_SPOT_REVIEWS'
const GET_USER_REVIEWS = 'reviews/GET_USER_REVIEWS'
const CREATE_REVIEW = 'reviews/CREATE_REVIEW'
const DELETE_REVIEW = 'reviews/DELETE_REVIEW'


/*----------ACTION CREATORS----------*/

// Get review reviews
export const getReviewsAction = (payload) => {
  console.log("Get all spots payload (action)", payload)
  return {
    type: GET_SPOT_REVIEWS,
    payload
  }
}

// Get user reviews
export const getUserReviewsAction = (payload) => {
  // console.log("Get user spots payload (action)", payload)
  return {
    type: GET_USER_REVIEWS,
    payload
  }
}

// Create a review
export const createReviewAction = (payload) => {
  // console.log("Create spots payload (action)", payload)
  return {
    type: CREATE_REVIEW,
    payload
  }
}


// Delete review
export const deleteReviewAction = (payload) => {
  // console.log("Delete review payload (action)", payload)
  return {
    type: DELETE_REVIEW,
    payload
  }
}

/*----------THUNK ACTION CREATORS----------*/

/* Thunk waits to be dispatched, then does an API call to our backend to grab data.
If data is ok in the backend, it will dispatch the regular POJO action creator that will go into the reducer and update the store which stores state */


// Payload contains spotId
export const getSpotReviewsThunk = (payload) => async (dispatch) => {
  console.log('/n', 'Get review useParams spotId payload (thunk):', '/n', payload)
  const res = await csrfFetch(`/api/spots/${payload}/reviews`)

  if (res.ok) {
    const data = await res.json()
    console.log("/n", "Get a review backend data (thunk):", "/n", data)
    dispatch(getReviewsAction(data))
    return data
  }
}


export const getUserReviewsThunk = () => async (dispatch) => {
  const res = await csrfFetch('/api/reviews/current')

  if (res.ok) {
    const data = await res.json()
    // console.log("/n", "Get user spots backend data (thunk):", "/n", data)
    dispatch(getUserReviewsAction(data))
    return data
  }
}

// Payload contains spotId
export const createReviewThunk = (payload) => async (dispatch) => {
  // console.log('/n', 'Create a review user input payload (thunk):', '/n', payload)
  const res = await csrfFetch(`/api/spots/${payload}/reviews`, {
    method: 'POST',
    body: JSON.stringify(payload)
  })

  if (res.ok) {
    const data = await res.json()
    // console.log('/n', 'Create a review backend (thunk):', '/n', data)
    dispatch(createReviewAction(data))
    return data
  }
}


// Payload contains reviewId
export const deleteReviewThunk = (payload) => async (dispatch) => {
  // console.log('/n', 'Create a review useParams spotId payload (thunk):', '/n', payload)
  const res = await csrfFetch(`/api/reviews/${payload}`, {
    method: 'DELETE'
  })

  if (res.ok) {
    const data = await res.json()
    // console.log('/n', 'Delete a review backend data (thunk):', '/n', data)
    dispatch(deleteReviewAction(data))
    return data //check again
  }
}

/*----------REDUCER----------*/

/* Have API routes open so you can see a successful 
response = action.payload we're keying into for the reducer */

const initialState = { spotReviews: {}, userReviews: {} }

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SPOT_REVIEWS: {
      const newState = { ...state, spotReviews: {} }
      action.payload.Reviews.forEach(review => newState.spotReviews[review.id] = review)
      console.log('/n', 'One spots newState after (reducer):', '/n', newState)
      return newState
    }
    case CREATE_REVIEW: {
      const newState = { ...state }
      newState[action.payload.id] = action.payload
      // console.log('/n', 'Create a spots newState after (reducer):', '/n', newState)
      return newState
    }
    case GET_USER_REVIEWS: {
      const newState = { ...state, userReviews: {} }
      action.payload.Reviews.forEach(review => {
        newState.userReviews[review.id] = review
      })
      // console.log('/n', 'All user reviews (reducer):', '/n', newState)
      return newState
    }
    case DELETE_REVIEW: {
      const newState = { ...state }
      newState[action.payload] = action.payload
      // console.log('/n', 'Delete spot newState after (reducer):', '/n', newState)
      return newState
    }
    default:
      return state
  }
}

export default reviewReducer