import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createSpotThunk, createSpotImageThunk } from '../../store/spots'
import './SpotFormPage.css';

function SpotForm() {
  const history = useHistory()
  const dispatch = useDispatch()

  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(1)
  const [image, setImage] = useState('')

  const [validationErrors, setValidationErrors] = useState([])

  useEffect(() => {
    const errors = []

    if (!address.length) errors.push('Street address is required')
    if (!city.length) errors.push('City is required')
    if (!state.length) errors.push('State is required')
    if (!country.length) errors.push('Country is required')
    if (!name.length) errors.push('Name must be less than 50 characters')
    if (!description.length) errors.push('Description is required')
    if (!price.length) errors.push('Price per day is required')
    if (!image.length) errors.push('Image url is required')

    //to handle dynamically, set the validationErrors to be this error's array
    setValidationErrors(errors)


  }, [address, city, state, country, name, description, price, image])

  const submitHandler = async (e) => {
    e.preventDefault()

    const spot = {
      address,
      city,
      state,
      country,
      name,
      description,
      price
    }

    const newSpot = await dispatch(createSpotThunk(spot))

    if (newSpot) {
      const spotImage = ({
        url: image,
        preview: true
      })
      // console.log('*spot image: ', newSpot)

      await dispatch(createSpotImageThunk(newSpot.id, spotImage))
      history.push(`/api/spots/${newSpot.id}`)
    }
  }

  return (
    <form className='spot-form' onSubmit={submitHandler}>
      <h2>Become a Host</h2>
      <ul className='errors'>
        {validationErrors.length > 0 && validationErrors.map(error => <li key={error}>{error}</li>)}
      </ul>
      <input
        type='text'
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder='Address'
        required
      />
      <input
        type='text'
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder='City'
        required
      />
      <input
        type='text'
        value={state}
        onChange={(e) => setState(e.target.value)}
        placeholder='State'
        required
      />
      <input
        type='text'
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        placeholder='Country'
        required
      />
      <input
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder='Name'
        required
      />
      <input
        type='text'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder='Description'
        required
      />
      <input
        type='text'
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder='Price'
        required
      />
      <input
        type='text'
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder='Image url'
        required
      />
      <button type='submit'>Become a Host</button>
    </form>
  )
}

export default SpotForm;