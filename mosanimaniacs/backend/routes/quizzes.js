const express = require('express'); // eslint-disable-line import/no-commonjs
const bodyParser = require('body-parser');
const Quiz = require('../models/Quizzes');
// eslint-disable-line import/no-commonjs
const router = express.Router();
const jsonParser = bodyParser.json();

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
router.post('/', jsonParser, (req, res) => {
    console.log(JSON.stringify(req.body, null));
    const quiz = new Quiz({
        quizTitle: req.body.quizTitle,
        questions: req.body.questions,
    });

  quiz
    .save()
    .then((result) => {
      res.status(201).json({
        message: 'Handling POST requests to /quizzes',
        createdQuiz: result,
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
