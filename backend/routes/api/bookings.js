const express = require('express');
const router = express.Router();
const sequelize = require('sequelize') //double check if we need this

//require authme and validate create spot
const { requireAuth } = require('../../utils/auth')

//import model needed
const { User, Spot, SpotImage, Review, Booking } = require('../../db/models')

// Delete a booking
router.delete('/:bookingId', requireAuth, async (req, res) => {
  const booking = await Booking.findByPk(req.params.bookingId)

  if (!booking) {
    res.status(404)
    return res.json({
      "message": "Booking couldn't be found",
      "statusCode": 404
    })
  }

  await booking.destroy()

  res.status(200)
  return res.json({
    "message": "Successfully deleted",
    "statusCode": 200
  })
})

// Edit a booking
router.put('/:bookingId', requireAuth, async (req, res) => {
  const { startDate, endDate } = req.body
  const booking = await Booking.findByPk(req.params.bookingId, {
    where: {
      userId: req.user.id
    }
  })

  if (!booking) {
    res.status(404)
    return res.json({
      "message": "Booking couldn't be found",
      "statusCode": 404
    })
  }

  if (!startDate || !endDate || endDate <= startDate) {
    res.status(400)
    return res.json({
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "endDate": "endDate cannot be on or before startDate"
      }
    })
  }

  let date = new Date()

  if (booking.endDate < date) {
    res.status(403)
    return res.json({
      "message": "Past bookings can't be modified",
      "statusCode": 403
    })
  }

  if (booking.startDate >= startDate && booking.endDate <= endDate
    || booking.startDate <= startDate && booking.endDate >= endDate) {
    res.status(403)
    return res.json({
      "message": "Sorry, this spot is already booked for the specified dates",
      "statusCode": 403,
      "errors": {
        "startDate": "Start date conflicts with an existing booking",
        "endDate": "End date conflicts with an existing booking"
      }
    })
  }

  booking.update({
    spotId: booking.spotId,
    userId: req.user.id,
    startDate: startDate,
    endDate: endDate
  })

  res.status(200)
  return res.json(booking)
})

// Get all of the current user's bookings
router.get('/current', requireAuth, async (req, res) => {
  let results = []
  const bookings = await Booking.findAll({
    where: {
      userId: req.user.id
    },
    include: [
      { model: Spot, attributes: { exclude: ['description', 'createdAt', 'updatedAt'] } }
    ]
  })

  for (let booking of bookings) {
    let bookingObj = booking.toJSON()
    const previewImage = await SpotImage.findByPk(booking.id, {
      where: {
        preview: true
      },
      attributes: ['url']
    })

    if (previewImage) {
      let imageObj = previewImage.toJSON()
      bookingObj.Spot.previewImage = imageObj.url
    } else {
      bookingObj.Spot.previewImage = 'Preview image does not exist'
    }

    results.push(bookingObj)
  }

  res.status(200)
  return res.json({ Bookings: results })
})












module.exports = router;