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


const createQuestions = (data) => {
  return data.map((question) => {
    const newQuestion = new Question({
      Question: question.Question,
      Options: question.Options,
      Answer: question.Answer,
    });
    
    return newQuestion.save()
  });
}

router.post('/', (req, res) => {
  Promise
    .all(createQuestions(req.body))
    .then(questions => {
      res.status(201).json(questions);
    })
    .catch(error => {
      res.status(500).json(error);
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
