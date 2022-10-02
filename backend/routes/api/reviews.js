const express = require('express');
const router = express.Router();
const sequelize = require('sequelize') //double check if we need this

//require authme and validate create spot
const { requireAuth } = require('../../utils/auth')

//import model needed
const { User, Spot, SpotImage, Review, ReviewImage } = require('../../db/models')

// Add an image to a review based on the review's id
router.post('/:reviewId/images', requireAuth, async (req, res) => {
  const { url } = req.body
  const review = await Review.findByPk(req.params.reviewId)

  if (!review) {
    res.status(404)
    return res.json({
      "message": "Review couldn't be found",
      "statusCode": 404
    })
  }

  const images = await ReviewImage.count({
    where: {
      reviewId: review.id
    }
  })

  if (images === 10) {
    res.status(403)
    return res.json({
      "message": "Maximum number of images for this resource was reached",
      "statusCode": 403
    })
  }

  const newImage = await ReviewImage.create({
    url: url
  })
  res.status(200)
  return res.json({
    id: newImage.id,
    url: newImage.url
  })
})




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