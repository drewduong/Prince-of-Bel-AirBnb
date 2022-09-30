const express = require('express');
const router = express.Router();
const sequelize = require('sequelize') //double check if we need this

//require authme and validate create spot
const { requireAuth } = require('../../utils/auth')

//import model needed
const { User, Spot, SpotImage, Review } = require('../../db/models')

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

// [NO AUTHENTICATION, YES VALIDATION]
// CREATE A SPOT 
// POST /api/spots
router.post('/', [requireAuth], async (req, res) => {
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

// [AUTHENTICATION NEEDED] - Spot must belong to the current user
// CREATE AN IMAGE FOR A SPOT BASED ON SPOT'S ID 
// POST /api/spots/:spotId/images
router.post('/:spotId/images', requireAuth, async (req, res) => {
  const { url, preview } = req.body
  //finding id of the user who's logged in
  const spotById = await User.findByPk(req.params.spotId)

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

// //[AUTHENTICATION NEEDED]
//GET ALL SPOTS OWNED BY CURRENT USER //GET /api/spots/current
// router.get('/current', requireAuth, async (req, res) => {
//   const allSpots = await Spot.findAll({
//     include: [
//       { model: Review, attributes: [] },
//       { model: SpotImage, attributes: [] }
//     ],
//     attributes: {
//       include: [
//         [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating'],
//         [sequelize.col('SpotImages.url'), 'previewImage']
//       ]
//     },
//     raw: true,
//     group: ['Spot.id']
//   })
//   res.status(200)
//   res.json({ Spots: allSpots })
// })

//[NO AUTHENTICATION]
//GET DETAILS OF A SPOT FROM AN ID //GET api/spots/:spotId
// router.get('/:spotId', async (req, res) => {
//   const spotById = await Spot.findByPk(req.params.spotId)

//   if (!spotById) {
//     res.status(404)
//     res.json({
//       "message": "Spot couldn't be found",
//       "statusCode": 404
//     })
//   } else {
//     res.status(200)
//     res.json(spotById)
//   }
// })


module.exports = router;