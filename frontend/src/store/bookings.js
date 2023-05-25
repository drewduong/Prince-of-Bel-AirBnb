import { csrfFetch } from './csrf';

/*----------ACTION TYPES----------*/

const GET_ALL_BOOKINGS = 'bookings/GET_ALL_BOOKINGS'
const GET_USER_BOOKINGS = 'bookings/GET_USER_BOOKINGS'
const CREATE_BOOKING = 'bookings/CREATE_BOOKING'
const UPDATE_BOOKING = 'bookings/UPDATE_BOOKING'
const DELETE_BOOKING = 'bookings/DELETE_BOOKING'


/*----------ACTION CREATORS----------*/

// Get all bookings
export const getAllBookingsAction = (payload) => {
  // console.log("Get all bookings payload (action)", payload)
  return {
    type: GET_ALL_BOOKINGS,
    payload
  }
}

// Get user bookings
export const getUserBookingsAction = (payload) => {
  // console.log("Get user bookings payload (action)", payload)
  return {
    type: GET_USER_BOOKINGS,
    payload
  }
}

// Create a booking
export const createBookingAction = (payload) => {
  // console.log("Create bookings payload (action)", payload)
  return {
    type: CREATE_BOOKING,
    payload
  }
}

// Update booking
export const updateBookingAction = (payload) => {
  // console.log("Update booking payload (action)", payload)
  return {
    type: UPDATE_BOOKING,
    payload
  }
}

// Delete booking
export const deleteBookingAction = (payload) => {
  // console.log("Delete booking payload (action)", payload)
  return {
    type: DELETE_BOOKING,
    payload
  }
}

/*----------THUNK ACTION CREATORS----------*/

/* Thunk waits to be dispatched, then does an API call to our backend to grab data.
If data is ok in the backend, it will dispatch the regular POJO action creator that will go into the reducer and update the store which stores state */

export const getAllBookingsThunk = () => async (dispatch) => {
  const res = await csrfFetch('/api/bookings')

  if (res.ok) {
    const data = await res.json()
    // console.log("/n", "Get all bookings backend data (thunk):", "/n", data)
    dispatch(getAllBookingsAction(data))
    return data
  }
}


export const getUserBookingsThunk = () => async (dispatch) => {
  const res = await csrfFetch('/api/bookings/current')

  if (res.ok) {
    const data = await res.json()
    // console.log("/n", "Get user bookings backend data (thunk):", "/n", data)
    dispatch(getUserBookingsAction(data))
    return data
  }
}


export const createBookingThunk = (payload) => async (dispatch) => {
  // console.log('/n', 'Create a booking user input payload (thunk):', '/n', payload)
  const res = await csrfFetch('/api/bookings', {
    method: 'POST',
    body: JSON.stringify(payload)
  })

  if (res.ok) {
    const data = await res.json()
    // console.log('/n', 'Create a booking backend (thunk):', '/n', data)
    dispatch(createBookingAction(data))
    return data
  }
}


// Payload contains edit booking details and bookingId
export const updateBookingThunk = (payload, bookingId) => async (dispatch) => {
  // console.log('/n', 'Update a booking user useParams bookingId payload (thunk):', '/n', payload)
  const res = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: 'PUT',
    body: JSON.stringify(payload)
  })

  if (res.ok) {
    const data = await res.json()
    // console.log('/n', 'Update a booking backend data (thunk):', '/n', data)
    dispatch(updateBookingAction(data))
    return data
  }
}

// Payload contains bookingId
export const deleteBookingThunk = (payload) => async (dispatch) => {
  // console.log('/n', 'Create a booking useParams bookingId payload (thunk):', '/n', payload)
  const res = await csrfFetch(`/api/bookings/${payload}`, {
    method: 'DELETE'
  })

  if (res.ok) {
    const data = await res.json()
    // console.log('/n', 'Delete a booking backend data (thunk):', '/n', data)
    dispatch(deleteBookingAction(payload))
    return data //check again
  }
}

/*----------REDUCER----------*/

/* Have API routes open so you can see a successful 
response = action.payload we're keying into for the reducer */

/* Hash collision choice of reducers is to render quicker with old state in there */

const initialState = {}

const bookingReducer = (state = initialState, action) => {
  let newState = { ...state }
  switch (action.type) {
    case GET_ALL_BOOKINGS: {
      newState = {}
      action.payload.Bookings.forEach(booking => {
        newState[booking.id] = booking
      })
      return newState
    }
    case GET_USER_BOOKINGS: {
      const newState = {}
      action.payload.Bookings.forEach(booking => {
        newState[booking.id] = booking
      })
      return newState
    }
    case CREATE_BOOKING: {
      newState[action.payload.id] = action.payload
      return newState
    }
    case UPDATE_BOOKING: {
      newState[action.payload.id] = { ...newState[action.payload.id], ...action.payload }
      return newState
    }
    case DELETE_BOOKING: {
      delete newState[action.payload]
      return newState
    }
    default:
      return state
  }
}

export default bookingReducer