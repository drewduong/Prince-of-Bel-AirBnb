import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getSpotThunk, updateSpotThunk } from '../../store/spots';
import './UpdateSpotForm.css';

const UpdateSpotForm = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { spotId } = useParams()

  // const sessionUser = useSelector(state => state.session.user);
  const currentSpot = useSelector(state => state.spots.allSpots[+spotId])
  // console.log('/n', 'Edit Spot (useSelector):', '/n', currentSpot)

  const [address, setAddress] = useState(currentSpot?.address)
  const [city, setCity] = useState(currentSpot?.city)
  const [state, setState] = useState(currentSpot?.state)
  const [country, setCountry] = useState(currentSpot?.country)
  const [name, setName] = useState(currentSpot?.name)
  const [description, setDescription] = useState(currentSpot?.description)
  const [price, setPrice] = useState(currentSpot?.price)

  const [validationErrors, setValidationErrors] = useState([])

  /* Passive data: dispatch within useEffect
  Active data, dispatch within onSubmit */

  useEffect(() => {
    const errors = []

    if (!address) errors.push("Street address is required")
    if (!city) errors.push("City is required")
    if (!state) errors.push("State is required")
    if (!country) errors.push("Country is required")
    if (!name) errors.push("Name must be less than 50 characters")
    if (!description) errors.push("Description is required")
    if (!price) errors.push("Price per day is required")

    setValidationErrors(errors)

  }, [address, city, state, country, name, description, price])

  useEffect(() => {
    dispatch(getSpotThunk(+spotId))
  }, [dispatch, spotId])

  const onSubmit = async (e) => {
    e.preventDefault()

    if (!validationErrors.length) {
      const payload = {
        address,
        city,
        state,
        country,
        name,
        description,
        price
      }

      dispatch(updateSpotThunk(payload, spotId))

      history.push('/listings')
    }
  }

  // Conditional used to debug if it's not rendering correctly
  if (!currentSpot) return (<div>Spot Not Found</div>)

  return (
    <div className="spot-form">
      <form onSubmit={onSubmit}>
        <h2>Edit Listing</h2>
        <ul className="errors">
          {validationErrors.length > 0 && validationErrors.map((error, idx) => (
            <span>
              <li key={idx}>{error}</li>
            </span>
          ))}
        </ul>
        <label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder='Address'
          />
        </label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder='City'
        />
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          placeholder='State'
        />
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder='Country'
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Name'
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Description'
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder='Price'
        />
        <button
          type="submit"
          disabled={validationErrors.length > 0}>Submit Listing</button>
      </form>
    </div>
  )
}

export default UpdateSpotForm