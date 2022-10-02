const express = require('express');
const router = express.Router();
const sequelize = require('sequelize') //double check if we need this

//require authme and validate create spot
const { requireAuth } = require('../../utils/auth')

//import model needed
const { User, Spot, SpotImage, Review } = require('../../db/models')


//[AUTHENTICATION NEEDED]
//GET ALL OF THE CURRENT USER'S BOOKINGS
//GET /api/bookings/current
// router.get('/current', requireAuth, async(req, res) => {
//   const allBookings = await Booking.findAll({
//     where: {
//       userId: req.user.id
//     }
//   })
// })


//AUTHENTICATION NEEDED
//GET ALL BOOKINGS FOR SPOT BASED ON THE SPOT'S ID
//GET /api/spots/:spotId/bookings












module.exports = router;