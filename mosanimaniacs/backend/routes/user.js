const mongoose = require('mongoose'); // eslint-disable-line import/no-commonjs
const express = require('express'); // eslint-disable-line import/no-commonjs
const User = require('../models/User');
// eslint-disable-line import/no-commonjs
const router = express.Router();

/*
   const user = require('../controller').user;

   router.get('/users',user.getUser);
   router.post('/users', user.addUser);
   router.get('/users/:userId',user.findUser)
 */

router.get('/',
  (req, res) => {
    User.find()
      .exec()
      .then((docs) => {
        res.status(200).json(docs);
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  });

// eslint-disable-next-line no-unused-vars
router.post('/', (req, res) => {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    Email: req.body.email,
    Password: req.body.password,
    Name: req.body.name,
  });

  user
    .save()
    .then((result) => {
      res.status(201).json({
        message: 'Handling POST requests to /user',
        createdUser: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});
router.get('/:userId', (req, res) => {
  const id = req.params.userId;
  User.findById(id)
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: 'No valid entry found for provided ID' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});


module.exports = router;
