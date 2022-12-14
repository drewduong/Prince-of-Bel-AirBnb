// backend/routes/api/users.js
const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

//Next, add the POST /api/users route to the router using an asynchronous route handler.
// Sign up
router.post('/', validateSignup, async (req, res) => {
  const { firstName, lastName, email, password, username } = req.body;

  const existingEmail = await User.findOne({
    where: {
      email
    }
  })

  const existingUsername = await User.findOne({
    where: {
      username
    }
  })

  if (existingEmail) {
    res.status(403)
    res.json({
      "message": "User already exists",
      "statusCode": 403,
      "errors":
        ["User with that email already exists"]

    })
  }

  if (existingUsername) {
    res.status(403)
    res.json({
      "message": "User already exists",
      "statusCode": 403,
      "errors": ["User with that username already exists"]
    })
  }

  const user = await User.signup({ firstName, lastName, email, username, password });
  const userTranslated = user.toJSON()
  const token = await setTokenCookie(res, user);

  userTranslated.token = token

  res.json(userTranslated);
}
);

module.exports = router;