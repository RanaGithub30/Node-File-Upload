const express = require('express');
const router = express.Router();
const userController = require('../../controllers/Front/UserManageController');

router.get('/', userController.index);
router.get('/index', userController.index);
router.post('/upload', userController.upload);

module.exports = router;