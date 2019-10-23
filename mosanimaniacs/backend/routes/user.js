const express = require('express');
const UserModel = require('../models/User');
const mongoose = require("mongoose");
const router = express.Router();

/*
   const user = require('../controller').user;

   router.get('/users',user.getUser);
   router.post('/users', user.addUser);
   router.get('/users/:userId',user.findUser)
 */

router.get('/',
           (req,res) => {
             console.log('getUser()');
             
             UserModel.find()
                      .exec()
                      .then(docs => {
                        console.log(docs);
                        res.status(200).json(docs);
                      })
                      .catch(err => {
                        console.log(err);
                        res.status(500).json({
                          error: err
                        });
                      });

           },
)

router.post('/',(req, res) => {});
router.get('/:userId', (req, res) => {})


module.exports = router;
