
'use strict';

const express = require('express')
const router = express.Router()
const user_controller = require('../controllers/userController');

router.route('/users')
      .get(user_controller.list_all_users)
      .post(user_controller.create_a_user)

router.route('/users/:userId')
      .get(user_controller.read_a_user)
      .put(user_controller.update_a_user)
      .delete(user_controller.delete_a_user)

module.exports = router;