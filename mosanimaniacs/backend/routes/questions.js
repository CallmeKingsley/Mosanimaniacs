const mongoose = require('mongoose'); // eslint-disable-line import/no-commonjs
const express = require('express'); // eslint-disable-line import/no-commonjs
const Question = require('../models/Questions');
// eslint-disable-line import/no-commonjs
const router = express.Router();


router.get('/',
  (req, res) => {
    Question.find()
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
  const user = new Question({
    questionId: new mongoose.Types.ObjectId(),
    Question: req.body.question,
    Options: req.body.option,
    Answers: req.body.answer,
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

router.get('/:  questionId', (req, res) => {
  const id = req.params.questionId;
  Question.findById(id)
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