const express = require('express');
const router = express.Router();
const sequelize = require('sequelize') //double check if we need this

//require authme and validate create spot
const { requireAuth } = require('../../utils/auth')

//import model needed
const { User, Spot, SpotImage, Review } = require('../../db/models')



//[AUTHENTICATION NEEDED]
//GET ALL REVIEWS OF THE CURRENT USER //GET /api/reviews/current
// router.get('/current', requireAuth, async (req, res) => {
//   const allReviews = await Review.findAll({
//     where: {
//       userId: req.user.id
//     },
//     include: [
//       { model: ReviewImage, attributes: ['id', 'url'] },
//       { model: Spot },
//       { model: SpotImage }
//     ],
//     attributes: {
//       include: [

//       ]
//     }
//   })
//   res.status(200)
//   res.json({ Reviews: allReviews })
// })

module.exports = router;