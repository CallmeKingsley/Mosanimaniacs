const express = require('express'); // eslint-disable-line import/no-commonjs
const Quiz = require('../models/Quiz');
// eslint-disable-line import/no-commonjs
const router = express.Router();


router.get('/',
  (req, res) => {
    Quiz.find()
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
  const newQuiz = new Quiz({
    quizName: req.body.quizName,
    quizQuestions: req.body.questions,
  });
  newQuiz
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

router.get('/:quizId', (req, res) => {
  const id = req.params.quizId;
  Quiz.findById(id)
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
