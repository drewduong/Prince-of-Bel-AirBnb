import { csrfFetch } from './csrf';

/*----------ACTION TYPES----------*/

const GET_SPOT = 'spots/GET_SPOT'
const GET_ALL_SPOTS = 'spots/GET_ALL_SPOTS'
// const GET_USER_SPOTS = 'spots/GET_USER_SPOTS'
const CREATE_SPOT = 'spots/CREATE_SPOT'
const CREATE_SPOT_IMAGE = 'spots/CREATE_SPOT_IMAGE'
// const UPDATE_SPOT = 'spots/UPDATE_SPOT'
// const DELETE_SPOT = 'spots/DELETE_SPOT'


/*----------ACTION CREATORS----------*/

// get all spots
export const getAllSpotsAction = (payload) => {
  return {
    type: GET_ALL_SPOTS,
    payload
  }
}

// get spot
export const getSpotAction = (payload) => {
  return {
    type: GET_SPOT,
    payload
  }
}

// get user spots
// export const getUserSpotsAction = (spots) => {
//   return {
//     type: GET_USER_SPOTS,
//     spots
//   }
// }

// create a spot
export const createSpotAction = (payload) => {
  console.log("Spot (action)", payload)
  return {
    type: CREATE_SPOT,
    payload
  }
}

// create spot image
export const createSpotImageAction = (spotId, imageUrl) => {
  return {
    type: CREATE_SPOT_IMAGE,
    spotId,
    imageUrl
  }
}

// update spot
// export const updateSpotAction = (spotId) => {
//   return {
//     type: UPDATE_SPOT,
//     spotId
//   }
// }

// delete spot
// export const deleteSpotAction = (spotId) => {
//   return {
//     type: DELETE_SPOT,
//     spotId
//   }
// }

/*----------THUNK ACTION CREATORS----------*/

/* Thunk waits to be dispatched, then does an API call to our backend to grab data.
If data is ok in the backend, it will dispatch the regular POJO action creator that will go into the reducer and update the store which stores state */

export const getAllSpotsThunk = () => async (dispatch) => {
  const res = await csrfFetch('/api/spots')

  if (res.ok) {
    const data = await res.json()
    // console.log("/n", "Get all spots, BACKEND DATA (action):", "/n", data)
    dispatch(getAllSpotsAction(data))
    return data
  }
}


export const getSpotThunk = (payload) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${payload}`)

  if (res.ok) {
    const data = await res.json()
    // console.log('*get spot details*: ', data)
    console.log("/n", "Get a single spot, BACKEND DATA (action):", "/n", data)
    dispatch(getSpotAction(data))
    return data
  }
}


// export const getUserSpotsThunk = () => async (dispatch) => {
//   const res = await csrfFetch('/api/spots/current')

//   if (res.ok) {
//     const data = await res.json()
//     // console.log('*get current user spots*: ', data)
//     dispatch(getUserSpotsAction(data))
//     return data
//   }
// }


export const createSpotThunk = (payload) => async (dispatch) => {
  console.log('/n', 'Create a spot (thunk):', '/n', payload)
  const res = await csrfFetch('/api/spots', {
    method: 'POST',
    body: JSON.stringify(payload)
  })

  if (res.ok) {
    const data = await res.json()
    console.log('/n', 'Create a spot if response is ok (thunk):', '/n', data)
    dispatch(createSpotAction(data))
    return data
  }
}


export const createSpotImageThunk = (spotId, image) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/images`, {
    method: 'POST',
    body: JSON.stringify(image)
  })

  if (res.ok) {
    const data = await res.json()
    console.log('/n', 'Create a spot image (thunk):', '/n', data)
    dispatch(createSpotImageAction(data))
    return data
  }
}


// export const updateSpotThunk = (spotId) => async (dispatch) => {
//   const res = await csrfFetch(`/api/spots/${spotId}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//       body: JSON.stringify(spotId)
//     }
//   })

//   if (res.ok) {
//     const data = await res.json()
//     // console.log('*update spot*: ', data)
//     dispatch(updateSpotAction(data))
//     return data
//   }
// }


// export const deleteSpotThunk = (spotId) => async (dispatch) => {
//   const res = await csrfFetch(`/api/spots/${spotId}`, {
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json',
//     }
//   })

//   if (res.ok) {
//     const data = await res.json()
//     // console.log('*delete spot*: ', data)
//     dispatch(deleteSpotAction(data))
//     return data //check again
//   }
// }

/*----------REDUCER----------*/

const initialState = {}

const spotReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SPOTS: {
      const newState = { ...state }
      action.payload.Spots.forEach(spot => {
        newState[spot.id] = spot
      })
      // console.log('/n', 'All spots (reducer):', '/n', newState)
      return newState
    }
    case GET_SPOT: {
      const newState = { ...state }
      newState[action.payload.id] = action.payload
      // console.log('/n', 'One spots newState after (reducer):', '/n', newState)
      return newState
    }
    case CREATE_SPOT: {
      const newState = { ...state }
      newState[action.payload.id] = action.payload
      console.log('/n', 'Create a spots newState after (reducer):', '/n', newState)
      return newState
    }
    default:
      return state
  }
}

export default spotReducer