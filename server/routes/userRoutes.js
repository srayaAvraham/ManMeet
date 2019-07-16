const mongoose = require('mongoose');
const passport = require('passport');
const config = require('../config/database');
require('../config/passport')(passport);
const express = require('express');
//const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require("../models/user");
const Book = require("../models/appointment");
const user_controller = require('../controllers/userController');

router.post('/signup', user_controller.create_a_user);

router.post('/signin', user_controller.signIn);

router.all('*',passport.authenticate('jwt', { session: false}));

router.route('/users')
      .get(user_controller.list_all_users)
      .post(user_controller.create_a_user)

router.route('/users/:userId')
      .get(user_controller.read_a_user)
      .put(user_controller.update_a_user)
      .delete(user_controller.delete_a_user)


    router.post('/book',function(req, res) {
      var token = getToken(req.headers);
      if (token) {
        console.log(req.body);
        var newBook = new Book({
          isbn: req.body.isbn,
          title: req.body.title,
          author: req.body.author,
          publisher: req.body.publisher
        });
    
        newBook.save(function(err) {
          if (err) {
            return res.json({success: false, msg: 'Save book failed.'});
          }
          res.json({success: true, msg: 'Successful created new book.'});
        });
      } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
      }
    });
    
    
    router.get('/book', function(req, res) {
      var token = getToken(req.headers);
      if (token) {
        Book.find(function (err, books) {
          if (err) return next(err);
          res.json(books);
        });
      } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
      }
    });
    
    getToken = function (headers) {
      if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
          return parted[1];
        } else {
          return null;
        }
      } else {
        return null;
      }
    };

    module.exports = router;

// 'use strict';

// const express = require('express')
// const router = express.Router()
// const user_controller = require('../controllers/userController');

// router.route('/users')
//       .get(user_controller.list_all_users)
//       .post(user_controller.create_a_user)

// router.route('/users/:userId')
//       .get(user_controller.read_a_user)
//       .put(user_controller.update_a_user)
//       .delete(user_controller.delete_a_user)

// module.exports = router;