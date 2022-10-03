const express = require('express');
const router = express.Router();
const sequelize = require('sequelize') //double check if we need this

//require authme and validate create spot
const { requireAuth } = require('../../utils/auth')

//import model needed
const { User, Spot, SpotImage, Review, Booking, ReviewImage } = require('../../db/models')

// Delete a spot image
router.delete('/:imageId', requireAuth, async (req, res) => {
  const spotImage = await SpotImage.findByPk(req.params.imageId)

  if (!spotImage) {
    res.status(404)
    return res.json({
      "message": "Spot Image couldn't be found",
      "statusCode": 404
    })
  }

  await spotImage.destroy()

  res.status(200)
  return res.json({
    "message": "Successfully deleted",
    "statusCode": 200
  })
})

module.exports = router;