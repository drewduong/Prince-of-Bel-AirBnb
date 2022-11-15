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

// get spot
export const getSpotAction = (spotId) => {
  return {
    type: GET_SPOT,
    spotId
  }
}

// get all spots
export const getAllSpotsAction = (spots) => {
  return {
    type: GET_ALL_SPOTS,
    spots
  }
}

// get user spots
export const getUserSpotsAction = (spots) => {
  return {
    type: GET_USER_SPOTS,
    spots
  }
}

// create a spot
export const createSpotAction = (spot) => {
  return {
    type: CREATE_SPOT,
    spot
  }
}

// create spot image
export const createSpotImageAction = (spotId, url, preview) => {
  return {
    type: CREATE_SPOT_IMAGE,
    spotId,
    url,
    preview
  }
}

// update spot
export const updateSpotAction = (spotId) => {
  return {
    type: UPDATE_SPOT,
    spotId
  }
}

// delete spot
export const deleteSpotAction = (spotId) => {
  return {
    type: DELETE_SPOT,
    spotId
  }
}

/*----------THUNK ACTION CREATORS----------*/

/* Thunk waits to be dispatched, then does an API call to our backend to grab data, 
and if the data is confirmed "ok", data is .json'd so it's readable, and will dispatch the regular POJO action creator */


export const getSpotThunk = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`)

  if (res.ok) {
    const data = await res.json()
    // console.log('*get spot details*: ', data)
    dispatch(getSpotAction(data))
    return data
  }
}


export const getAllSpotsThunk = () => async (dispatch) => {
  const res = await csrfFetch('/api/spots')

  if (res.ok) {
    const data = await res.json()
    console.log("/n", "Get all spots:", "/n", data)
    dispatch(getAllSpotsAction(data))
    return data
  }
}


export const getUserSpotsThunk = () => async (dispatch) => {
  const res = await csrfFetch('/api/spots/current')

  if (res.ok) {
    const data = await res.json()
    // console.log('*get current user spots*: ', data)
    dispatch(getUserSpotsAction(data))
    return data
  }
}


export const createSpotThunk = (spot) => async (dispatch) => {
  const res = await csrfFetch('/api/spots', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      body: JSON.stringify(spot)
    }
  })

  if (res.ok) {
    const data = await res.json()
    // console.log('*create a spot*: ', data)
    dispatch(createSpotAction(data))
    return data
  }
}


export const createSpotImageThunk = (spotId, url, preview) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/images`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      body: JSON.stringify({ spotId, url, preview })
    }
  })

  if (res.ok) {
    const data = await res.json()
    // console.log('*create a image for a spot*: ', data)
    dispatch(createSpotImageAction(data))
    return data
  }
}


export const updateSpotThunk = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      body: JSON.stringify(spotId)
    }
  })

  if (res.ok) {
    const data = await res.json()
    // console.log('*update spot*: ', data)
    dispatch(updateSpotAction(data))
    return data
  }
}


export const deleteSpotThunk = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  })

  if (res.ok) {
    const data = await res.json()
    // console.log('*delete spot*: ', data)
    dispatch(deleteSpotAction(data))
    return data //check again
  }
}

/*----------REDUCER----------*/

const initialState = {

}

const SpotReducer = (state = initialState, action) => {
  switch (action.type) {

  }

}

export default SpotReducer