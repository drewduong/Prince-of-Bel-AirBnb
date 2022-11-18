import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createSpotImageThunk, createSpotThunk } from '../../store/spots';
import './CreateSpotForm.css';

const CreateSpotForm = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  // const currentUser = useSelector((state) => state.session.user);

  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [country, setCountry] = useState("")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [imageUrl, setImageUrl] = useState("")

  const [validationErrors, setValidationErrors] = useState([])

  // if (!currentUser) return <Redirect to="/" />

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
    if (!imageUrl) errors.push("Image url is required")

    setValidationErrors(errors)
  }, [address, city, state, country, name, description, price, imageUrl])

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

      const newSpot = await dispatch(createSpotThunk(payload))
      // console.log('/n', 'Create a spot (onSubmit)):', '/n', newSpot)
      if (newSpot) {
        const image = ({
          url: imageUrl,
          preview: true
        })
        await dispatch(createSpotImageThunk(newSpot.id, image))
        history.push(`/spots/${newSpot.id}`)
      }
    }
  }

  return (
    <div className="spot-form">
      <form onSubmit={onSubmit}>
        <h2>Begin Hosting</h2>
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
          type="integer"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder='Price'
        />
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder='Image URL'
        />
        <button
          type="submit"
          disabled={validationErrors.length > 0}>Begin Hosting</button>
      </form>
    </div>
  )
}

export default CreateSpotForm