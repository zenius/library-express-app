const express = require('express');
const debug = require('debug')('app: authRoutes');

const authRouter = express.Router();

function router() {
  authRouter.post('/signup', (req, res) => {
    debug(req.body);
    res.json(req.body);
  });

  return authRouter;
}

module.exports = router;
