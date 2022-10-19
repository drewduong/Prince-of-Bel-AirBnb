import { csrfFetch } from './csrf';

const GET_SPOT = 'spots/getSpot'
const GET_ALL_SPOTS = 'spots/getAllSpots'
const GET_USER_SPOTS = 'spots/getUserSpots'
const CREATE_SPOT = 'spots/createSpot'
const CREATE_SPOT_IMAGE = 'spots/createImage'
const UPDATE_SPOT = 'spots/updateSpot'
const DELETE_SPOT = 'spots/deleteSpot'

// get spot
export const getSpot = (spot) => {
  return {
    type: GET_SPOT,
    spot
  }
}

// get all spots
export const getAllSpots = (spots) => {
  return {
    type: GET_ALL_SPOTS,
    spots
  }
}

// get user spots
export const getUserSpots = (spots) => {
  return {
    type: GET_USER_SPOTS,
    spots
  }
}

// create spot
export const createSpot = (spot) => {
  return {
    type: CREATE_SPOT,
    spot
  }
}

//create spot image
export const createImage = (url) => {
  return {
    type: CREATE_SPOT_IMAGE,
    url
  }
}

// update spot
export const updateSpot = (spot) => {
  return {
    type: UPDATE_SPOT,
    spot
  }
}

// delete spot
export const deleteSpot = (spot) => {
  return {
    type: DELETE_SPOT,
    spot
  }
}


