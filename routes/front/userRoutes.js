const express = require('express');
const router = express.Router();
const fileController = require('../../controllers/Front/FileManageController');

router.get('/', fileController.index);
router.get('/index', fileController.index);
router.post('/upload', fileController.upload);

module.exports = router;