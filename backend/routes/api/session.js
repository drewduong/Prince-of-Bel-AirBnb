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


// Restore session user
router.get(
  '/',
  restoreUser,
  (req, res) => {
    const { user } = req;
    if (user) {
      return res.json({
        user: user.toSafeObject()
      });
    } else return res.json({});
  }
);

//Next, add the POST /api/session route to the router using an asynchronous route handler. 
//LOG IN A USER //POST /api/session
router.post(
  '/',
  //added requireAuth
  requireAuth, validateLogin,
  async (req, res, next) => {
    const { credential, password, token } = req.body;

    const user = await User.login({ credential, password });
    const userTest = await User.find

    if (!user) {
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = ['The provided credentials were invalid.'];
      return next(err);
    }

    await setTokenCookie(res, user);

    return res.json({
      user: user
    });
  }
);
//The DELETE /api/session logout route will remove the token cookie from the response and return a JSON success message.
// Log out
router.delete(
  '/',
  (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
);



module.exports = router;