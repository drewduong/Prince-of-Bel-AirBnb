const express = require('express');
const router = express.Router();
// const sequelize = require('sequelize') //double check if we need this

//require authme and validate create spot
const { requireAuth } = require('../../utils/auth')
const { Op } = require('sequelize');

//import model needed
const { User, Spot, SpotImage, Review, Booking, ReviewImage, sequelize } = require('../../db/models')
// Delete a spot
router.delete('/:spotId', requireAuth, async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId, {
    where: {
      ownerId: req.user.id
    }
  })

  if (!spot) {
    res.status(404)
    return res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }

  await spot.destroy()

  res.status(200)
  return res.json({
    "message": "Successfully deleted",
    "statusCode": 200
  })
})

// Get all bookings for a spot based on the spot's id
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId)

  if (!spot) {
    res.status(404)
    return res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }

  if (req.user.id !== spot.ownerId) {
    const bookings = await Booking.findAll({
      where: {
        spotId: spot.id
      },
      attributes: ['spotId', 'startDate', 'endDate']
    })
    res.status(200)
    res.json({ Bookings: bookings })
  }

  if (req.user.id === spot.ownerId) {

    const bookings = await Booking.findAll({
      where: {
        spotId: req.params.spotId
      },
      include: [
        { model: User, attributes: ['id', 'firstName', 'lastName'] }
      ]
    })

    res.status(200)
    return res.json({ Bookings: bookings })
  }
})

// Get all reviews by a spot's id
router.get('/:spotId/reviews', async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId)

  if (!spot) {
    res.status(404)
    return res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }

  const reviews = await Review.findAll({
    where: {
      spotId: req.params.spotId
    },
    include: [
      { model: User, attributes: ['id', 'firstName', 'lastName'] },
      { model: ReviewImage, attributes: ['id', 'url'] }
    ]
  })
  res.status(200)
  return res.json({ Reviews: reviews })
})

// Create a review for a spot based on the spot's id
router.post('/:spotId/reviews', requireAuth, async (req, res) => {
  const { review, stars } = req.body
  const spot = await Spot.findByPk(req.params.spotId)

  if (!spot) {
    res.status(404)
    return res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }

  const existingReview = await Review.findByPk(req.params.spotId, {
    where: {
      userId: req.user.id
    }
  })

  if (existingReview) {
    res.status(403)
    return res.json({
      "message": "User already has a review for this spot",
      "statusCode": 403
    })
  } else {
    const newReview = await Review.create({
      userId: req.user.id,
      spotId: spot.id,
      review: review,
      stars: stars
    })
    res.status(201)
    return res.json(newReview)
  }
})


// Edit a spot
router.put('/:spotId', requireAuth, async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } = req.body

  const user = await User.findOne({
    where: {
      id: req.user.id
    }
  })

  const spotById = await Spot.findByPk(req.params.spotId)

  if (!spotById) {
    res.status(404)
    return res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  } else {
    spotById.update({
      //added ownerid
      ownerId: user.id,
      address: address,
      city: city,
      state: state,
      country: country,
      lat: lat,
      lng: lng,
      name: name,
      description: description,
      price: price
    })
    res.status(200)
    return res.json(spotById)
  }
})

// Create an image for a spot based on the spot's id
router.post('/:spotId/images', requireAuth, async (req, res) => {
  const { url, preview } = req.body
  const spot = await Spot.findByPk(req.params.spotId, {
    where: {
      ownerId: req.user.id
    }
  })

  if (!spot) {
    res.status(404)
    return res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }

  const newImage = await SpotImage.create({
    spotId: spot.id,
    url: url,
    preview: preview
  })
  res.status(200)
  return res.json({
    id: newImage.id,
    url: url,
    preview: preview
  })
})

// Create a booking based on the spot's id
router.post('/:spotId/bookings', requireAuth, async (req, res) => {
  const { startDate, endDate } = req.body
  const spot = await Spot.findByPk(req.params.spotId)

  if (!spot) {
    res.status(404)
    return res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }

  const bookings = await Booking.findAll({
    where: {
      spotId: spot.id
    }
  })

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

  for (let booking of bookings) {
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
  }

  const newBooking = await Booking.create({
    spotId: spot.id,
    userId: req.user.id,
    startDate: startDate,
    endDate: endDate
  })
  res.status(200)
  return res.json(newBooking)
})

// Create a spot
router.post('/', requireAuth, async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } = req.body
  const user = await User.findOne({
    where: {
      id: req.user.id
    }
  })
  const newSpot = await Spot.create({
    ownerId: user.id,
    address: address,
    city: city,
    state: state,
    country: country,
    lat: lat,
    lng: lng,
    name: name,
    description: description,
    price: price
  })
  res.status(201)
  return res.json(newSpot)
})

// Get all spots of current user
router.get('/current', requireAuth, async (req, res) => {
  const spots = await Spot.findAll({
    where: {
      ownerId: req.user.id
    }
  })

  let results = []

  for (let spot of spots) {
    const reviews = await Review.findAll({
      where: {
        spotId: spot.id
      },
      attributes: [
        [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']
      ],
      raw: true
    })

    const image = await SpotImage.findOne({
      where: {
        spotId: spot.id,
        preview: true
      },
      attributes: ['url']
    })

    let spotObj = spot.toJSON()
    spotObj.previewImage = image.url

    let reviewsNum = Number(reviews[0].avgRating).toFixed(1)
    spotObj.avgRating = reviewsNum


    results.push(spotObj)
  }

  res.status(200)
  return res.json({ Spots: results })
})

// Get details for a spot from an id
router.get('/:spotId', async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId)

  if (!spot) {
    res.status(404)
    return res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }

  const image = await Spot.findByPk(req.params.spotId, {
    include: {
      model: SpotImage,
      attributes: ['id', 'url', 'preview']
    }
  })

  const owner = await Spot.findByPk(req.params.spotId, {
    include: {
      model: User,
      attributes: ['id', 'firstName', 'lastName']
    }
  })

  const reviews = await Review.findAll({
    where: {
      spotId: req.params.spotId
    },
    attributes: [[sequelize.fn('COUNT', sequelize.col('review')), 'numReviews']]
  })

  const reviewsAVG = await Review.findAll({
    where: {
      spotId: req.params.spotId
    },
    attributes: [[sequelize.fn('AVG', sequelize.col('stars')), 'avgStarRating']]
  })

  let reviewCount = reviews[0]
  let reviewCountObj = reviewCount.toJSON()

  let avgReview = reviewsAVG[0]
  let avgReviewObj = avgReview.toJSON()
  let avgReviewNum = Number(avgReviewObj.avgStarRating).toFixed(1)

  const spotObj = spot.toJSON()
  spotObj.numReviews = Number(reviewCountObj.numReviews)
  spotObj.avgStarRating = avgReviewNum
  spotObj.SpotImages = image.SpotImages
  spotObj.Owner = owner.User

  res.status(200)
  return res.json(spotObj)
})

// Get all spots
router.get('/', async (req, res) => {
  const spots = await Spot.findAll()

  let results = []
  for (let spot of spots) {
    const reviews = await Review.findAll({
      where: {
        spotId: spot.id
      },
      attributes: [
        [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']
      ],
      raw: true
    })

    const image = await SpotImage.findOne({
      where: {
        spotId: spot.id,
        preview: true
      },
      attributes: ['url']
    })

    let spotObj = spot.toJSON()
    spotObj.previewImage = image.url

    let reviewsNum = Number(reviews[0].avgRating).toFixed(1)
    spotObj.avgRating = reviewsNum

    results.push(spotObj)

  }
  res.status(200)
  return res.json({ Spots: results })
})

module.exports = router;