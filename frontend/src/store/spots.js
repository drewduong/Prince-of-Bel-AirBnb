import { csrfFetch } from './csrf';

/*----------ACTION TYPES----------*/

const GET_SPOT = 'spots/GET_SPOT'
const GET_ALL_SPOTS = 'spots/GET_ALL_SPOTS'
const GET_USER_SPOTS = 'spots/GET_USER_SPOTS'
const CREATE_SPOT = 'spots/CREATE_SPOT'
const CREATE_SPOT_IMAGE = 'spots/CREATE_SPOT_IMAGE'
const UPDATE_SPOT = 'spots/UPDATE_SPOT'
const DELETE_SPOT = 'spots/DELETE_SPOT'


/*----------ACTION CREATORS----------*/

// Get all spots
export const getAllSpotsAction = (payload) => {
  // console.log("Get all spots payload (action)", payload)
  return {
    type: GET_ALL_SPOTS,
    payload
  }
}

// Get spot
export const getSpotAction = (payload) => {
  // console.log("Get all spots payload (action)", payload)
  return {
    type: GET_SPOT,
    payload
  }
}

// Get user spots
export const getUserSpotsAction = (payload) => {
  // console.log("Get user spots payload (action)", payload)
  return {
    type: GET_USER_SPOTS,
    payload
  }
}

// Create a spot
export const createSpotAction = (payload) => {
  // console.log("Create spots payload (action)", payload)
  return {
    type: CREATE_SPOT,
    payload
  }
}

// Create spot image
export const createSpotImageAction = (spotId, image) => {
  // console.log("Create spot image payload (action)", payload)
  return {
    type: CREATE_SPOT_IMAGE,
    spotId,
    image
  }
}

// Update spot
export const updateSpotAction = (payload) => {
  // console.log("Update spot payload (action)", payload)
  return {
    type: UPDATE_SPOT,
    payload
  }
}

// Delete spot
export const deleteSpotAction = (payload) => {
  console.log("Delete spot payload (action)", payload)
  return {
    type: DELETE_SPOT,
    payload
  }
}

/*----------THUNK ACTION CREATORS----------*/

/* Thunk waits to be dispatched, then does an API call to our backend to grab data.
If data is ok in the backend, it will dispatch the regular POJO action creator that will go into the reducer and update the store which stores state */

export const getAllSpotsThunk = () => async (dispatch) => {
  const res = await csrfFetch('/api/spots')

  if (res.ok) {
    const data = await res.json()
    // console.log("/n", "Get all spots backend data (thunk):", "/n", data)
    dispatch(getAllSpotsAction(data))
    return data
  }
}


// Payload contains spotId
export const getSpotThunk = (payload) => async (dispatch) => {
  // console.log('/n', 'Get spot useParams spotId payload (thunk):', '/n', payload)
  const res = await csrfFetch(`/api/spots/${payload}`)

  if (res.ok) {
    const data = await res.json()
    // console.log("/n", "Get a spot backend data (thunk):", "/n", data)
    dispatch(getSpotAction(data))
    return data
  }
}


export const getUserSpotsThunk = () => async (dispatch) => {
  const res = await csrfFetch('/api/spots/current')

  if (res.ok) {
    const data = await res.json()
    // console.log("/n", "Get user spots backend data (thunk):", "/n", data)
    dispatch(getUserSpotsAction(data))
    return data
  }
}


export const createSpotThunk = (payload) => async (dispatch) => {
  // console.log('/n', 'Create a spot user input payload (thunk):', '/n', payload)
  const res = await csrfFetch('/api/spots', {
    method: 'POST',
    body: JSON.stringify(payload)
  })

  if (res.ok) {
    const data = await res.json()
    // console.log('/n', 'Create a spot backend (thunk):', '/n', data)
    dispatch(createSpotAction(data))
    return data
  }
}


// Payload contains SpotId, imageUrl
export const createSpotImageThunk = (spotId, image) => async (dispatch) => {
  // console.log('/n', 'Create a spot image useParams spotId and image payload (thunk):', '/n', payload)
  const res = await csrfFetch(`/api/spots/${spotId}/images`, {
    method: 'POST',
    body: JSON.stringify(image)
  })

  if (res.ok) {
    const data = await res.json()
    // console.log('/n', 'Create a spot image backend data (thunk):', '/n', data)
    dispatch(createSpotImageAction(data))
    return data
  }
}

// Payload contains edit spot details and spotId
export const updateSpotThunk = (payload, spotId) => async (dispatch) => {
  // console.log('/n', 'Update a spot user useParams spotId payload (thunk):', '/n', payload)
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'PUT',
    body: JSON.stringify(payload)
  })

  if (res.ok) {
    const data = await res.json()
    // console.log('/n', 'Update a spot backend data (thunk):', '/n', data)
    dispatch(updateSpotAction(data))
    return data
  }
}

// Payload contains spotId
export const deleteSpotThunk = (payload) => async (dispatch) => {
  // console.log('/n', 'Create a spot useParams spotId payload (thunk):', '/n', payload)
  const res = await csrfFetch(`/api/spots/${payload}`, {
    method: 'DELETE'
  })

  if (res.ok) {
    const data = await res.json()
    // console.log('/n', 'Delete a spot backend data (thunk):', '/n', data)
    dispatch(deleteSpotAction(data))
    return data //check again
  }
}

/*----------REDUCER----------*/

/* Have API routes open so you can see a successful 
response = action.payload we're keying into for the reducer */

const initialState = { singleSpot: {} }

const spotReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SPOTS: {
      const newState = { singleSpot: {} }
      action.payload.Spots.forEach(spot => {
        newState[spot.id] = spot
      })
      // console.log('/n', 'All spots (reducer):', '/n', newState)
      return newState
    }
    case GET_SPOT: {
      const newState = { ...state }
      newState.singleSpot = action.payload
      // console.log('/n', 'One spots newState after (reducer):', '/n', newState)
      return newState
    }
    case CREATE_SPOT: {
      const newState = { ...state }
      newState[action.payload.id] = action.payload
      // console.log('/n', 'Create a spots newState after (reducer):', '/n', newState)
      return newState
    }
    case GET_USER_SPOTS: {
      const newState = { singleSpot: {} }
      action.payload.Spots.forEach(spot => {
        newState[spot.id] = spot
      })
      // console.log('/n', 'All spots (reducer):', '/n', newState)
      return newState
    }
    case UPDATE_SPOT: {
      const newState = { ...state }
      newState[action.payload.id] = { ...state[action.payload.id], ...action.payload }
      // console.log('/n', 'Update spot newState after (reducer):', '/n', newState)
      return newState
    }
    case DELETE_SPOT: {
      const newState = { ...state }
      newState[action.payload] = action.payload
      console.log('/n', 'Delete spot newState after (reducer):', '/n', newState)
      return newState
    }
    default:
      return state
  }
}

export default spotReducer