const express = require('express');
const passport = require('passport');

const router = express.Router();

router.post('/loginB', function(req, res) {
  res.json({ email: req.body.email });
});

router.post('/login',
  passport.authenticate('local', {session: false}),
  async (req, res, next) => {
    try {
      res.status(200).send(true);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;