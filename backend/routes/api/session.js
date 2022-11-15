// backend/routes/api/session.js
const express = require('express')
//In the backend/routes/api/session.js file, import the following code at the top of the file and create an Express router:
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

//middleware that will check the keys and validate
const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];

//require authentication
const { requireAuth } = require('../../utils/auth')


// Get current user
router.get('/', restoreUser, (req, res) => {
  const { user } = req;
  if (user) {
    res.status(200)
    res.json(user);
  } else return res.json(null);
}
);

// Login a user
router.post('/', validateLogin, async (req, res, next) => {
  const { credential, password } = req.body;

  const user = await User.login({ credential, password });

  if (!user) {
    res.status(401)
    res.json({
      "errors": ["Invalid credentials"],
      "message": "Invalid credentials",
      "statusCode": 401
    })
  }

  const token = await setTokenCookie(res, user);
  const userTranslated = user.toJSON()
  userTranslated.token = token

  return res.json(userTranslated);
}
);

// Log out
router.delete(
  '/',
  (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
);



module.exports = router;