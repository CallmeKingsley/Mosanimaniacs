const express = require('express'); // eslint-disable-line import/no-commonjs
const bodyParser = require('body-parser');
const Quiz = require('../models/Quizzes');
// const mongo = require('mongodb').MongoClient;
// const objectId = require('mongodb').ObjectID;
// const assert = require('assert');

// const url = 'mongodb://<dbuser>:<dbpassword>@ds229068.mlab.com:29068/heroku_b30fmcz3';
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

// router.post('/:quizId', (req, res) => {
//   const db = req.db;
//   const quizToUpdate = req.params.id;
//   const quiz = {
//     quizTitle: req.body.quizTitle,
//     questions: req.body.questions,
//   };
//   const id = req.body.id;
//   console.log(`the quiz is ${quiz} and the id is ${id}`);
//   mongo.connect(url, (err, db) => {
//     assert.equal(null, err);
//     db.collection('quizzes').updateOne({"_id": objectId(id)}, {$set: quiz}, (err, result) => {
//       assert.equal(null, err);
//       console.log('Item updated');
//       db.close();
//     });
//   });
// });

router.post('/:quizId', jsonParser, (req, res) => {
  // const quiz = new Quiz({
  //     quizTitle: req.body.quizTitle,
  //     questions: req.body.questions,
  // });
  const id = req.params.quizId;
  console.log(req.params.quizId);
  console.log(id, JSON.stringify(req.body.quizTitle, null));
  
  Quiz.findById(id, function(err, doc) {
    if (err) {
      console.error('error, no entry found');
    }
    doc.quizTitle = req.body.quizTitle;
    doc.questions = req.body.questions;
    doc.save();
  })
  res.redirect('/');
});

router.post('/:quizId', (req, res) => {
  const id = req.params.quizId;
  Quiz.findOne({_id: id}, (err, foundObject) => {
    if(err) {
      console.log(err);
      res.status(500).send();
    } else {
      if (!foundObject) {
        res.status(404).send();
      } else {
        if (req.body.quizTitle) {
          foundObject.quizTitle = req.body.quizTitle;
        }
        if (req.body.questions) {
          foundObject.questions = req.body.questions;
        }

        foundObject.save((err, updatedObject) => {
          if (err) {
            console.log(err);
            res.status(500).send();
          } else {
            res.send(updatedObject);
          }
        });
      }
    }
  });
});

router.delete('/:quizId', (req, res) => {
  const id = req.params.quizId;

  Quiz.findOneAndRemove({_id: id}, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send();
    }
    return res.status(200).send();
  });
});

module.exports = router;
