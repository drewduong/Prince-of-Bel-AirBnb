const express = require('express');
const router = express.Router();
const sequelize = require('sequelize') //double check if we need this

//require authme and validate create spot
const { requireAuth } = require('../../utils/auth')

//import model needed
const { User, Spot, SpotImage, Review, Booking } = require('../../db/models')

//[NO AUTHENTICATION]
//GET ALL SPOTS 
//GET /api/spots
router.get('/', async (req, res) => {
  const allSpots = await Spot.findAll({
    include: [
      { model: Review, attributes: [] },
      { model: SpotImage, attributes: [] }
    ],
    attributes: {
      include: [
        [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating'],
        [sequelize.col('SpotImages.url'), 'previewImage']
      ]
    },
    raw: true,
    group: ['Spot.id', 'SpotImages.url']
  })
  res.status(200)
  res.json({ Spots: allSpots })
})



//[AUTHENTICATION NEEDED]
// GET ALL SPOTS OWNED BY CURRENT USER 
// GET /api/spots/current
router.get('/current', requireAuth, async (req, res) => {
  const allSpots = await Spot.findAll({
    include: [
      { model: User, attributes: [] },
      { model: Review, attributes: [] },
      { model: SpotImage, attributes: [] }
    ],
    attributes: {
      include: [
        [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating'],
        [sequelize.col('SpotImages.url'), 'previewImage']
      ]
    },
    raw: true,
    group: ['Spot.id', 'SpotImages.url']
  })
  res.status(200)
  res.json({ Spots: allSpots })
})


//[NO AUTHENTICATION]
// // GET DETAILS OF A SPOT FROM AN ID //GET api/spots/:spotId
router.get('/:spotId', async (req, res) => {
  let spotDetails = []
  const spotById = await Spot.findByPk(req.params.spotId)
  const translateSpot = spotById.toJSON()

  const reviews = await Review.findAll({
    where: {
      userId: translateSpot.id
    },
    attributes: {
      include: [
        [sequelize.fn('COUNT', sequelize.col('review')), 'numReviews'],
        [sequelize.fn('AVG', sequelize.col('stars')), 'avgStarRating']
      ]
    }
  })
  const translateReview = reviews.toJSON()

  const owners = await User.findByPk(spotById.ownerId, {
    attributes: ['id', 'firstName', 'lastName']
  })
  const translateOwner = owners.toJSON()


  const images = await SpotImage.findAll({
    where: {
      spotId: spotById.id
    },
    attributes: ['id', 'url', 'preview']
  })

  // if (!spotById) {
  //   res.status(404)
  //   res.json({
  //     "message": "Spot couldn't be found",
  //     "statusCode": 404
  //   })
  // } else {
  res.status(200)
  res.json(spotDetails)
  // }
})

//[AUTHENTICATION NEEDED, VALIDATION NEEDED] - Spot must belong to the current user
//EDIT A SPOT //POST  /api/spots/:spotId
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
    res.json({
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
    res.json(spotById)
  }
})

//[AUTHENTICATION NEEDED] - Spot must belong to the current user
//DELETE A SPOT //DELETE /api/spots/:spotId
router.delete('/:spotId', requireAuth, async (req, res) => {
  const spotById = await Spot.findByPk(req.params.spotId)

  if (!spotById) {
    res.status(404)
    res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  } else {
    spotById.destroy()
    res.status(200)
    res.json({
      "message": "Successfully deleted",
      "statusCode": 200
    })
  }
})

// [AUTHENTICATION NEEDED] - Spot must belong to the current user
// CREATE AN IMAGE FOR A SPOT BASED ON SPOT'S ID 
// POST /api/spots/:spotId/images
router.post('/:spotId/images', requireAuth, async (req, res) => {
  const { url, preview } = req.body
  const userId = req.user.id
  const spotId = req.params.spotId
  //finding id of the user who's logged in, and which spot he owns
  const spotById = await Spot.findByPk(spotId)
  // const ownerId = spotById.ownerId

  // if (ownerId !== userId) {
  //   res.status(404)
  //   res.json({
  //     "message": "Spot couldn't be found",
  //     "statusCode": 404
  //   })
  // }

  if (!spotById) {
    res.status(404)
    res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  } else {
    const newImage = await SpotImage.create({
      url: url,
      preview: preview
    })
    res.status(200)
    res.json({
      id: newImage.id,
      url: newImage.url,
      preview: newImage.preview
    })
  }
})

//[AUTHENTICATION NEEDED] - Spot must NOT belong to the current user
//CREATE A BOOKING FROM A SPOT BASED ON THE SPOT'S ID
//POST /api/spots/:spotId/bookings
router.post('/:spotId/bookings', requireAuth, async (req, res) => {
  const { startDate, endDate } = req.body
  const bookingById = await Booking.findByPk(req.params.spotId)

  if (!bookingById) {
    res.status(404)
    res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }

  const allBookings = await Booking.findAll({
    where: {
      spotId: bookingById.id
    }
  })

  if (!startDate || !endDate || endDate <= startDate) {
    res.status(400)
    res.json({
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "endDate": "endDate cannot be on or before startDate"
      }
    })
  }


  for (let booking of allBookings) {
    if (booking.startDate >= startDate
      && booking.endDate <= endDate
      || booking.startDate <= startDate
      && booking.endDate >= endDate
      || booking.startDate >= startDate
      && booking.endDate >= endDate
      || booking.startDate <= startDate
      && booking.endDate <= endDate) {
      res.status(403)
      res.json({
        "message": "Sorry, this spot is already booked for the specified dates",
        "statusCode": 403,
        "errors": {
          "startDate": "Start date conflicts with an existing booking",
          "endDate": "End date conflicts with an existing booking"
        }
      })
    } else {
      const newBooking = await Booking.create({
        spotId: bookingById.id,
        userId: req.user.id,
        startDate: startDate,
        endDate: endDate
      })
      res.status(200)
      res.json(newBooking)
    }
  }
})

// [AUTHENTICATION REQUIRED, YES VALIDATION]
// CREATE A SPOT 
// POST /api/spots
router.post('/', requireAuth, async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } = req.body
  //finding id of the user who's logged in 
  const user = await User.findOne({
    where: {
      id: req.user.id
    }
  })
  const newSpot = await Spot.create({
    //added ownerId
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
  res.json(newSpot)
})

module.exports = router;