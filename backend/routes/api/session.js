// backend/routes/api/session.js
const express = require('express')
//In the backend/routes/api/session.js file, import the following code at the top of the file and create an Express router:
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();

//Next, add the POST /api/session route to the router using an asynchronous route handler. 
// Log in
router.post(
  '/',
  async (req, res, next) => {
    const { credential, password } = req.body;

    const user = await User.login({ credential, password });

    if (!user) {
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = ['The provided credentials were invalid.'];
      return next(err);
    }

    await setTokenCookie(res, user);

    return res.json({
      user
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