const express = require('express');
const router = express.Router();
const sequelize = require('sequelize') //double check if we need this

//require authme and validate create spot
const { requireAuth } = require('../../utils/auth')

//import model needed
const { User, Spot, SpotImage, Review, ReviewImage } = require('../../db/models')

// Delete a review
router.delete('/:reviewId', requireAuth, async (req, res) => {
  const review = Review.findByPk(req.params.reviewId, {
    where: {
      userId: req.user.id
    }
  })

  if (!review) {
    res.status(404)
    return res.json({
      "message": "Review couldn't be found",
      "statusCode": 404
    })
  }

  await review.destroy()

  res.status(200)
  return res.json({
    "message": "Successfully deleted",
    "statusCode": 200
  })
})

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

// Edit a review
router.put('/:reviewId', requireAuth, async (req, res) => {
  const { review, stars } = req.body
  const existingReview = await Review.findByPk(req.params.reviewId, {
    where: {
      userId: req.user.id
    }
  })

  if (!existingReview) {
    res.status(404)
    return res.json({
      "message": "Review couldn't be found",
      "statusCode": 404
    })
  }

  existingReview.update({
    userId: req.user.id,
    spotId: existingReview.spotId,
    review: review,
    stars: stars
  })
  res.status(200)
  return res.json(existingReview)
})

// Get all reviews of the current user
router.get('/current', requireAuth, async (req, res) => {
  let results = []
  const reviews = await Review.findAll({
    where: {
      userId: req.user.id
    },
    include: [
      { model: User, attributes: ['id', 'firstName', 'lastName'] },
      { model: Spot, attributes: { exclude: ['createdAt', 'updatedAt', 'description'] } },
      { model: ReviewImage, attributes: ['id', 'url'] }
    ],
  })

  for (let review of reviews) {
    const previewImage = await SpotImage.findByPk(review.id, {
      where: {
        preview: true
      },
      attributes: ['url']
    })

    let reviewObj = review.toJSON()
    reviewObj.Spot.previewImage = previewImage.url
    results.push(reviewObj)
  }

  res.status(200)
  return res.json({ Reviews: results })
})

module.exports = router;