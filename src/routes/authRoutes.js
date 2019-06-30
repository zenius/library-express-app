const express = require('express');
const debug = require('debug')('app: authRoutes');

const authRouter = express.Router();

function router() {
  authRouter.post('/signup', (req, res) => {
    debug(req.body);

    // todo: create user

    // login user and redirect to "/auth/profile"
    req.login(req.body, () => {
      res.redirect('/auth/profile');
    });
  });

  authRouter.get('/profile', (req, res) => {
    // gets the user information from passportConfig function in passport.js
    res.json(req.user);
  });

  return authRouter;
}

module.exports = router;
