
'use strict';

const express = require('express')
const router = express.Router()
const user_controller = require('../controllers/userController');

router.get('/users',user_controller.list_all_users)

module.exports = router;

// module.exports = function(app) {
//   var user = require('../controllers/userController');

//   // todoList Routes
//   app.route('/users')
//     .get(user.list_all_users)
//     .post(user.create_a_user);


//   app.route('/users/:userId')
//     .get(user.read_a_user)
//     .put(user.update_a_user)
//     .delete(user.delete_a_user);
// };